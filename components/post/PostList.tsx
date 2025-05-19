import { getPosts } from "@/sanity/lib/post/getPosts";
import { AllPostsQueryResult } from "@/sanity.types";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Post from "./Post";

async function PostList() {
  const posts = (await getPosts()) as AllPostsQueryResult;
  const user = await currentUser();
  return (
    <div className="space-y-4">
      {posts.map((post: AllPostsQueryResult[number]) => (
        <Post key={post._id} post={post} userId={user?.id || null} />
      ))}
    </div>
  );
}

export default PostList;
