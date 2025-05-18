import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function searchSubreddits(searchTerm: string) {
  if (!searchTerm || searchTerm.trim() === "") {
    return [];
  }
  const searchSubredditsQuery = defineQuery(`
        *[_type == "subreddit" && title match $searchTerm + "*"] {
            _id,title,"slug":slug.current,description, "moderator": moderator->,createdAt,image
        } | order(createdAt desc)
        `);
  const subreddits = await sanityFetch({
    query: searchSubredditsQuery,
    params: { searchTerm: searchTerm.toLocaleLowerCase() },
  });
  return subreddits.data;
}
