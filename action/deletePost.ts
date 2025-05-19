"use server";

import { adminClient } from "@/sanity/lib/adminClient";
import { getPostById } from "@/sanity/lib/post/getPostById";
import { currentUser } from "@clerk/nextjs/server";

export async function deletePost(postId: string) {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const post = await getPostById(postId);

  if (!post) {
    return { error: "Post not found" };
  }

  if (post.author?._id !== user.id) {
    return { error: "Unauthorized" };
  }

  const timestamp = Date.now().toString();
  const patch = adminClient
    .patch(postId)
    .set({ isDeleted: true })
    .set({
      body: [
        {
          _type: "block",
          _key: timestamp,
          children: [
            {
              _type: "span",
              _key: timestamp + "-1",
              text: "[DELETED CONTENTS]",
              marks: [],
            },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
    })
    .set({ title: "[DELETED POST]" });

  if (post.image?.asset?._ref) {
    patch.set({ image: null });
  }

  const result = await patch.commit();

  // Delete the actual image asset
  if (result && post.image?.asset?._ref) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await adminClient.delete(post.image.asset._ref);
  }

  return {
    success: "Post deleted successfully",
    deletedPostId: postId,
  };
}
