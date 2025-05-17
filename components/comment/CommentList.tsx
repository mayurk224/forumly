import { GetCommentRepliesQueryResult, GetPostCommentsQueryResult } from "@/sanity.types";
import Comment from "./Comment";

export async function CommentList({
    postId,
    comments,
    userId,
}:{
    postId: string;
    comments: GetPostCommentsQueryResult | GetCommentRepliesQueryResult;
    userId: string | null;
}){
    const isRootComment = !comments.some((comment)=>{
        comment.parentComment
    })
    return <section>
        <div className="">
            {isRootComment &&(
                <h2 className="text-lg font-semibold text-gray-900">Comments ({comments.length})</h2>
            )}
        </div>
        {comments.map((comment) => (
            <Comment key={comment._id} postId={postId} comment={comment} userId={userId}/>
        ))}
    </section>
}