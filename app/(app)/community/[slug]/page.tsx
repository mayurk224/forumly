import Post from "@/components/post/Post";
import { urlFor } from "@/sanity/lib/image";
import { getPostsForSubreddit } from "@/sanity/lib/subreddit/getPostsForSubreddit";
import { getSubredditBySlug } from "@/sanity/lib/subreddit/getSubredditBySlug";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function CommunityPage({ params }: {
  params: { slug: string };
}) {
  const { slug } = params;
  const community = await getSubredditBySlug(slug);
  if (!community) return null;

  const user = await currentUser();
  const posts = await getPostsForSubreddit(community._id);

  return (
    <>
      {/* Community Banner */}
      <section className="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center gap-4">
            {community?.image?.asset?._ref && (
              <div className="relative h-16 w-16 overflow-hidden rounded-full border dark:border-gray-700">
                <Image
                  src={urlFor(community.image).url()}
                  alt={community.image.alt || `${community.title} community icon`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold dark:text-white">
                {community.title}
              </h1>
              {community.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {community.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post key={post._id} post={post} userId={user?.id ?? null} />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-md p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No posts in this community yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
