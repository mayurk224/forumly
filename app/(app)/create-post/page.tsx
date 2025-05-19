import CreateCommunityButton from "@/components/header/CreateCommunityButton";
import CreatePostForm from "@/components/post/CreatePostForm";
import { SubredditCombobox } from "@/components/subreddit/SubredditCombobox";
import { getSubreddits } from "@/sanity/lib/subreddit/getSubreddits";
import Link from "next/link";

async function CreatePostPage({
  searchParams,
}: {
  searchParams: Promise<{ subreddit: string }>;
}) {
  const { subreddit } = await searchParams;
  const subreddits = await getSubreddits();

  if (subreddit) {
    return (
      <>
        {/* Banner */}
        <section className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Create Post
              </h1>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                Create a post in the{" "}
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {subreddit}
                </span>{" "}
                community
              </p>
            </div>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              &larr; Back to Home
            </Link>
          </div>
        </section>

        {/* Content */}
        <section className="my-8 max-w-7xl mx-auto px-4">
          <CreatePostForm />
        </section>
      </>
    );
  }

  return (
    <>
      {/* Banner */}
      <section className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Create Post
            </h1>
            <p className="text-sm text-gray-600 dark:text-zinc-400">
              Select a community for your post
            </p>
          </div>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4">
            <div className="max-w-3xl">
              <label className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-100">
                Select a community to post in
              </label>
              <SubredditCombobox
                subreddits={subreddits}
                defaultValue={subreddit}
              />

              <hr className="my-4 border-zinc-200 dark:border-zinc-700" />

              <p className="mt-4 text-sm text-gray-600 dark:text-zinc-400">
                If you don&apos;t see your community, you can create it here.
              </p>
              <div className="mt-2">
                <CreateCommunityButton />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreatePostPage;
