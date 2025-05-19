"use client";

import {
  GetCommentRepliesQueryResult,
  GetPostCommentsQueryResult,
} from "@/sanity.types";
import CommentInput from "./CommentInput";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { MessageCircle } from "lucide-react";
import ReportButton from "../ReportButton";
import DeleteButton from "../DeleteButton";

export function CommentReply({
  postId,
  comment,
}: {
  postId: string;
  comment:
    | GetPostCommentsQueryResult[number]
    | GetCommentRepliesQueryResult[number];
}) {
  const [isReplying, setIsReplying] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <div className="">
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-1.5 font-medium text-gray-500 hover:text-green-500 transition-colors mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setIsReplying(!isReplying)}
          disabled={!isSignedIn}
        >
          <MessageCircle className="size-4" />
          {isReplying ? "Cancel" : isSignedIn ? "Reply" : "Sign in to reply"}
        </button>
        <ReportButton contentId={comment._id} />
        {comment.author?._id && (
          <DeleteButton
            contentId={comment._id}
            contentOwnerId={comment.author?._id}
            contentType="comment"
          />
        )}
      </div>
      {isReplying && (
        <div className="mt-3 ps-2 border-s-2 border-gray-100">
          <CommentInput postId={postId} parentCommentId={comment._id} />
        </div>
      )}
    </div>
  );
}
