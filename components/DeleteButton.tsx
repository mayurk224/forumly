"use client";

import { deleteComment } from "@/action/deleteComment";
import { deletePost } from "@/action/deletePost";
import { useUser } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteButtonProps {
  contentId: string;
  contentOwnerId: string;
  contentType: "post" | "comment";
  onDeleteSuccess?: () => void;
}

function DeleteButton({
  contentId,
  contentOwnerId,
  contentType,
  onDeleteSuccess,
}: DeleteButtonProps) {
  const { isSignedIn, user } = useUser();
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isSignedIn || !user) return null;

  const isOwner = contentOwnerId === user.id;
  if (!isOwner) return null;

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete this ${contentType}?`)) return;

    setIsDeleted(true);
    setError(null);

    try {
      const response =
        contentType === "post"
          ? await deletePost(contentId)
          : await deleteComment(contentId);

      if (response.error) {
        setError(response.error);
      } else {
        onDeleteSuccess?.();
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsDeleted(false);
    }
  };

  return (
    <>
      <button
        aria-label={`Delete ${contentType}`}
        disabled={isDeleted}
        onClick={handleDelete}
        className={`flex items-center gap-1.5 font-medium text-gray-500 hover:text-red-500 transition-colors mt-1 disabled:opacity-50 disabled:cursor-not-allowed ${
          isDeleted ? "text-red-500" : ""
        }`}
      >
        <Trash2 className="size-4" />
        <span>{isDeleted ? "Deleting..." : "Delete"}</span>
      </button>

      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </>
  );
}

export default DeleteButton;
