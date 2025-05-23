import React from "react";
import {
  AllPostsQueryResult,
  GetPostsForSubredditQueryResult,
} from "@/sanity.types";
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
import ReportButton from "../ReportButton";
import DeleteButton from "../DeleteButton";

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
      className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800 hover:shadow-lg transition-shadow duration-300"
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
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-zinc-400 mb-2">
            {post.subreddit && (
              <>
                <a
                  href={`/community/${
                    typeof post.subreddit.slug === "string"
                      ? post.subreddit.slug
                      : post.subreddit.slug?.current ?? ""
                  }`}
                  className="font-semibold text-gray-800 dark:text-zinc-100 hover:underline"
                >
                  c/{post.subreddit.title}
                </a>
                <span>•</span>
                <span>Posted by</span>
                {post.author && (
                  <a
                    href={`/u/${post.author.username}`}
                    className="font-medium hover:underline text-gray-700 dark:text-zinc-200"
                  >
                    u/{post.author.username}
                  </a>
                )}
                <span>•</span>
                {post.publishedAt && (
                  <time dateTime={new Date(post.publishedAt).toISOString()}>
                    <TimeAgo date={new Date(post.publishedAt)} />
                  </time>
                )}
              </>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-2 leading-tight">
            {post.title}
          </h2>

          {/* Post Text */}
          {post.body?.[0]?.children?.[0]?.text && (
            <p className="text-gray-700 dark:text-zinc-200 text-base mb-4 line-clamp-4 sm:line-clamp-none">
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

          {/* Comments Summary */}
          <button
            className="flex items-center gap-1 text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200 transition-colors mb-4"
            aria-label="View comments"
          >
            <MessagesSquare className="w-4 h-4" />
            <span>{comments.length} Comments</span>
          </button>

          {/* Comment Section */}
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

      {/* Control Buttons */}
      <div className="absolute top-0 right-0 flex gap-2 items-center justify-center space-y-1 p-2">
        <ReportButton contentId={post._id} reported={!!post.isReported} />
        {post.author?._id && (
          <DeleteButton
            contentId={post._id}
            contentOwnerId={post.author._id}
            contentType="post"
          />
        )}
      </div>
    </article>
  );
}

export default Post;
