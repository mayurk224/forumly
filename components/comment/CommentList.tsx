import {
  GetCommentRepliesQueryResult,
  GetPostCommentsQueryResult,
} from "@/sanity.types";
import Comment from "./Comment";

export async function CommentList({
  postId,
  comments,
  userId,
}: {
  postId: string;
  comments: GetPostCommentsQueryResult | GetCommentRepliesQueryResult;
  userId: string | null;
}) {
  const isRootComment = !comments.some((comment) =>
    comment.parentComment !== null && comment.parentComment !== undefined
  );
  return (
    <section aria-label="Comments section">
      {isRootComment && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Comments ({comments.length})
          </h2>
          {comments.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      )}
      {comments.length > 0 && (
        <ul className="mt-4 space-y-4">
          {comments.map((comment) => (
            <li key={comment._id}>
              <Comment postId={postId} comment={comment} userId={userId} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
