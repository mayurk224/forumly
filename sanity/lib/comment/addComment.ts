import { adminClient } from "../adminClient";

interface AddCommentParams {
  postId: string;
  content: string;
  userId: string;
  parentCommentId?: string | null;
}

export async function addComment({
  postId,
  content,
  userId,
  parentCommentId,
}: AddCommentParams) {
  try {
    const commentData = {
      _type: "comment",
      content,
      author: { _type: "reference", _ref: userId },
      post: { _type: "reference", _ref: postId },
      parentComment: parentCommentId
        ? { _type: "reference", _ref: parentCommentId }
        : undefined,
      createdAt: new Date().toISOString(),
    };

    const comment = await adminClient.create(commentData);
    return { comment };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { error: "Failed to add comment" };
  }
}
