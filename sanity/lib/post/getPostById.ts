import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getPostById(postId: string) {
  const getPostByIdQuery = defineQuery(`
    *[_type == "post" && _id == $postId][0] {
      _id,
      title,
      "slug": slug.current,
      body,
      publishedAt,
      "author": author->,
      "subreddit": subreddit->,
      image,
      isDeleted
    }
  `);

  const post = await sanityFetch({
    query: getPostByIdQuery,
    params: { postId },
  });

  return post.data;
}
