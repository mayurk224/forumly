"use server";

import { adminClient } from "@/sanity/lib/adminClient";
import { getCommentById } from "@/sanity/lib/comment/getCommentById";
import { currentUser } from "@clerk/nextjs/server";

export async function deleteComment(commentId: string) {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const comment = await getCommentById(commentId);

  if (!comment) {
    return { error: "Comment not found" };
  }

  if (comment.author?._id !== user.id) {
    return { error: "Unauthorized" };
  }

  const patch = adminClient
    .patch(commentId)
    .set({ isDeleted: true })
    .set({ content: "[DELETED CONTENTS]" });

  const result = await patch.commit();

  return {
    success: "Comment deleted successfully",
    deletedCommentId: commentId,
  };
}
