import React from "react";
import { AllPostsQueryResult, GetPostsForSubredditQueryResult } from "@/sanity.types";
import { getPostVotes } from "@/sanity/lib/vote/getPostVotes";
import { getUserPostVoteStatus } from "@/sanity/lib/vote/getUserPostVoteStatus";
import { getPostComments } from "@/sanity/lib/vote/getPostComments";
import Image from "next/image";
import TimeAgo from "../TimeAgo";
import { urlFor } from "@/sanity/lib/image";
import { MessagesSquare } from "lucide-react";
import CommentInput from "../comment/CommentInput";
import { CommentList } from "../comment/CommentList";
import PostVoteButtons from "./PostVoteButtons";

interface PostProps {
  post: AllPostsQueryResult[number] | GetPostsForSubredditQueryResult[number];
  userId: string | null;
}

async function Post({ post, userId }: PostProps) {
  const votes = await getPostVotes(post._id);
  const vote = await getUserPostVoteStatus(post._id, userId);
  const comments = await getPostComments(post._id, userId);

  return (
    <article
      key={post._id}
      className="relative bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex">
        {/* Vote Buttons */}
        <PostVoteButtons
          contentId={post._id}
          votes={votes}
          vote={vote}
          contentType="post"
        />

        {/* Post Content */}
        <div className="flex-1 p-4 sm:p-6">
          {/* Subreddit + Author Info */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
            {post.subreddit && (
              <>
                <a
                  href={`/community/${post.subreddit.slug}`}
                  className="font-semibold text-gray-800 hover:underline"
                >
                  c/{post.subreddit.title}
                </a>
                <span>•</span>
                <span>Posted by</span>
                {post.author && (
                  <a
                    href={`/u/${post.author.username}`}
                    className="font-medium hover:underline text-gray-700"
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

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
            {post.title}
          </h2>

          {/* Post Text */}
          {post.body?.[0]?.children?.[0]?.text && (
            <p className="text-gray-700 text-base mb-4 line-clamp-4">
              {post.body[0].children[0].text}
            </p>
          )}

          {/* Post Image */}
          {post.image?.asset && (
            <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden mb-4">
              <Image
                src={urlFor(post.image).url()}
                alt={post.image.alt || "Post Image"}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Comments Summary Button */}
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-4">
            <MessagesSquare className="w-4 h-4" />
            <span>{comments.length} Comments</span>
          </button>

          {/* Comment Input + List */}
          <div className="mt-2 space-y-3">
            <CommentInput postId={post._id} />
            <CommentList
              postId={post._id}
              comments={comments}
              userId={userId}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default Post;
