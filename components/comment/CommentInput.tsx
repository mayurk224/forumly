"use client";

import { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { createComment } from "@/action/createComment";

function CommentInput({
  postId,
  parentCommentId,
}: {
  postId: string;
  parentCommentId?: string | null;
}) {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    if (!content) return;
    if (!postId) return;
    startTransition(async () => {
      try {
        const result = await createComment(postId, content, parentCommentId);

        if (result.error) {
          throw new Error(result.error);
        }
        setContent("");
      } catch (error) {
        console.log("error in creating comment", error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <Input
        aria-label="Comment input"
        disabled={isPending || !user}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        type="text"
        placeholder={user ? "Add a comment..." : "Sign in to comment"}
        autoComplete="off"
        className="bg-white dark:bg-zinc-900 text-black dark:text-white border-zinc-300 dark:border-zinc-700"
      />
      <Button
        variant="outline"
        type="submit"
        disabled={isPending || !user || !content.trim()}
        className="border-zinc-300 dark:border-zinc-700 text-black dark:text-white bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        {isPending ? "Commenting..." : "Comment"}
      </Button>
    </form>
  );
}

export default CommentInput;
