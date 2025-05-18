import {
  GetCommentRepliesQueryResult,
  GetPostCommentsQueryResult,
} from "@/sanity.types";
import { getCommentReplies } from "@/sanity/lib/comment/getCommentReplies";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import TimeAgo from "../TimeAgo";
import { CommentList } from "./CommentList";
import { CommentReply } from "./CommentReply";
import PostVoteButtons from "../post/PostVoteButtons";

async function Comment({
  comment,
  postId,
  userId,
}: {
  comment:
    | GetPostCommentsQueryResult[number]
    | GetCommentRepliesQueryResult[number];
  postId: string;
  userId: string | null;
}) {
  const replies = await getCommentReplies(comment._id, userId);

  const userVoteStatus = comment.votes.voteStatus;

  return (
    <article className="py-5 border-b border-gray-100 last:border-0">
      <div className="flex gap-4">
        {/* post vote */}

        <PostVoteButtons
          contentId={comment._id}
          votes={comment.votes}
          vote={{ voteType: userVoteStatus }}
          contentType="comment"
        />

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {comment.author?.imageUrl ? (
              <div className="flex-shrink-0">
                <Image
                  src={comment.author.imageUrl}
                  alt={comment.author.username || "User Image"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="flex-shrink-0">
                <UserCircle className="w-10 h-10 rounded-full text-gray-200" />
              </div>
            )}
            <h3 className="font-medium text-gray-900">
              {comment.author?.username || "Annonymous"}
            </h3>
            <span className="text-sm text-gray-500">
              <TimeAgo date={new Date(comment.createdAt! || "")} />
            </span>
          </div>
          <p className="text-sm text-gray-700">{comment.content}</p>
          <CommentReply postId={postId} comment={comment} />
          {replies.length > 0 && (
            <div className="mt-3 ps-2 border-s-2 border-gray-100">
              <CommentList postId={postId} comments={replies} userId={userId} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default Comment;
