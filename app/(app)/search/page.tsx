import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { urlFor } from "@/sanity/lib/image";
import { searchSubreddits } from "@/sanity/lib/subreddit/searchSubreddits";
import Link from "next/link";
import React from "react";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const subreddits = await searchSubreddits(query);
  return (
    <>
      {/* Header */}
      <section className="bg-white border-b py-6">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Search Results{" "}
            <span className="text-red-500">({subreddits.length})</span>
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Communities matching &quot;
            <span className="font-medium">{query}</span>&quot;
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="my-10">
        <div className="mx-auto max-w-7xl px-4">
          <ul className="flex flex-col gap-5">
            {subreddits.map((subreddit) => (
              <li
                key={subreddit._id}
                className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <Link
                  href={`/community/${subreddit.slug}`}
                  className="flex items-center gap-4 p-5 group"
                >
                  {/* Avatar */}
                  <Avatar className="h-14 w-14 border-2 border-red-200 dark:border-red-800 shadow-sm">
                    {subreddit.image ? (
                      <AvatarImage
                        src={urlFor(subreddit.image).url()}
                        className="object-cover"
                      />
                    ) : (
                      <AvatarFallback className="text-lg font-semibold bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
                        {subreddit.title?.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-red-600 transition-colors">
                      c/{subreddit.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {subreddit.description || "No description available."}
                    </p>
                  </div>
                </Link>
              </li>
            ))}

            {/* No Results */}
            {subreddits.length === 0 && (
              <li className="py-10 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400">
                No communities found matching your search.
              </li>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}

export default SearchPage;
