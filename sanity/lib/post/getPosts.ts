import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getPosts() {
  const AllPostsQuery = defineQuery(`
        *[_type == "post" && isDeleted == false] {
            _id,
            title,
            "slug":slug.current,
            body,
            publishedAt,
            "author": author->,
             "subreddit": subreddit->,
             image,
             isDeleted
        } | order(publishedAt desc)
        `);
  const posts = await sanityFetch({ query: AllPostsQuery });
  return posts.data;
}
