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
    <Button onClick={handleCreatePost} variant={"outline"} disabled={!user}>
      <Plus className="w-4 h-4 mr-2" />
      {user ? "Create Post" : "Sign In to Create Post"}
    </Button>
  );
}

export default CreatePost;
