import PostList from "@/components/post/PostList";

export default function Home() {
  return (
    <>
      {/* Banner */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Home
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Recent posts from all communities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4">
            <PostList />
          </div>
        </div>
      </section>
    </>
  );
}
