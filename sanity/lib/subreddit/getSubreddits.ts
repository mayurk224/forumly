import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getSubreddits() {
  const getSubredditsQuery = defineQuery(`*[_type == "subreddit"] {
        ...,"slug":slug.current,description, "moderator": moderator->,
    } | order(_createdAt desc)`);

  const subreddits = await sanityFetch({query: getSubredditsQuery});
  return subreddits.data;
}
