"use server";

import { addComment } from "@/sanity/lib/comment/addComment";
import { getUser } from "@/sanity/lib/user/getUser";

export async function createComment(
  postId: string,
  content: string,
  parentCommentId?: string | null
) {
  const user = await getUser();

  if ("error" in user) {
    return { error: user.error };
  }

  try {
    const comment = await addComment({
      postId,
      content,
      userId: user._id,
      parentCommentId,
    });

    return { comment };
  } catch (error) {
    console.log("error in creating comment", error);
    return { error: "Failed to create comment" };
  }
}
