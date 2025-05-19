import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

function CreatePost() {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const handleCreatePost = () => {
    const communityName = pathname.includes("/community/")
      ? pathname.split("/")[1]
      : null;
    if (communityName) {
      router.push(`/create-post?subreddit=${communityName}`);
    } else {
      router.push(`/create-post`);
    }
  };

  return (
    <Button
      onClick={handleCreatePost}
      variant="outline"
      disabled={!user}
      className="flex items-center gap-2 cursor-pointer bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
      title={!user ? "Sign in required to create a post" : "Create a new post"}
    >
      <Plus className="w-4 h-4" />
      {user ? "Create Post" : "Sign In to Create Post"}
    </Button>
  );
}

export default CreatePost;
