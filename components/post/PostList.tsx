import { getPosts } from '@/sanity/lib/post/getPosts';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'
import Post from './Post';

async function PostList() {
    const posts = await getPosts()
    const user = await currentUser();
  return (
    <div className="space-y-4">
        {
            posts.map((post) => (
                <Post key={post._id} post={post} userId={user?.id || null} />
            ))
        }
    </div>
  )
}

export default PostList