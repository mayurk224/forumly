import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getUserPostVoteStatus(
  postId: string,
  userId: string | null
) {
  const getUserPostVoteStatusQuery = defineQuery(`
        *[_type == "vote" && post._ref == $postId && user._ref == $userId][0]{
            voteType
        }
        `);

  const result = await sanityFetch({
    query: getUserPostVoteStatusQuery,
    params: { postId, userId: userId || "" },
  });

  return result.data;
}
