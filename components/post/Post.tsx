import React from "react";
import { AllPostsQueryResult } from "@/sanity.types";
import { getPostVotes } from "@/sanity/lib/vote/getPostVotes";
import { getUserPostVoteStatus } from "@/sanity/lib/vote/getUserPostVoteStatus";
import { getPostComments } from "@/sanity/lib/vote/getPostComments";
import Image from "next/image";
import TimeAgo from "../TimeAgo";
import { urlFor } from "@/sanity/lib/image";
import { MessagesSquare } from "lucide-react";
import CommentInput from "../comment/CommentInput";
import { CommentList } from "../comment/CommentList";

interface PostProps {
  post: AllPostsQueryResult[number];
  userId: string | null;
}

async function Post({ post, userId }: PostProps) {
  const votes = await getPostVotes(post._id);
  const vote = await getUserPostVoteStatus(post._id, userId);
  const comments = await getPostComments(post._id, userId);

  return (
    <article
      key={post._id}
      className="relative bg-white rounded-md shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
    >
      <div className="flex">
        {/* Vote Button */}
        {/* <PostVoteButton contentId={post_id} votes={votes} vote={vote} contentType="post"/> */}

        {/* Post Content */}
        <div className="flex-1 p-3">
          {/* subreddit icon */}
          <div className="flex items-center gap-2">
            {post.subreddit && (
              <>
                <a
                  href={`/community/${post.subreddit.slug}`}
                  className="font-medium hover:underline"
                >
                  c/{post.subreddit.title}
                </a>
                <span>•</span>
                <span>Posted By</span>
                {post.author && (
                  <a
                    href={`/u/${post.author.username}`}
                    className="font-medium hover:underline"
                  >
                    u/{post.author.username}
                  </a>
                )}
                <span>•</span>
                {post.publishedAt && (
                  <TimeAgo date={new Date(post.publishedAt)} />
                )}
              </>
            )}
          </div>
          {post.subreddit && (
            <div className="">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                {post.title}
              </h2>
            </div>
          )}
          {post.body && post.body[0]?.children?.[0]?.text && (
            <div className="prose prose-sm max-w-none text-gray-700 mb-3">
              {post.body[0].children[0].text}
            </div>
          )}
          {post.image && post.image.asset && (
            <div className="relative w-full h-96">
              <Image
                src={urlFor(post.image).url()}
                alt={post.image.alt || "Post Image"}
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
          <button className="flex items-center px-1 py-2 gap-1 text-sm text-gray-500">
            <MessagesSquare className="size-4" />
            <span>{comments.length} Comments</span>
          </button>

          <CommentInput postId={post._id} />
          <CommentList postId={post._id} comments={comments} userId={userId} />
        </div>
      </div>
      {/* Buttons */}
      {/* report Button */}
      {/* Delete button */}
    </article>
  );
}

export default Post;
