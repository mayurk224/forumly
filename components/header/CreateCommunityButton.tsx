"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { CircleX, ImageIcon, Plus } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Button } from "../ui/button";
import { createCommunity } from "@/action/createCommunity";
import { useRouter } from "next/navigation";

const CreateCommunityButton = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(value));
    }
  };

  const [slug, setSlug] = useState("");

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-").slice(0, 21);
  };

  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [isPending, startTransition] = useTransition();

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreateCommunity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!user) {
      setErrorMessage("You must be signed in to create a community.");
      return;
    }

    if (!name || !slug || !description) {
      setErrorMessage("All fields except the image are required.");
      return;
    }

    startTransition(async () => {
      try {
        let imageBase64: string | null = null;
        let fileName: string | null = null;
        let fileType: string | null = null;

        if (imageFile) {
          imageBase64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject("Image encoding failed");
            reader.readAsDataURL(imageFile);
          });

          fileName = imageFile.name;
          fileType = imageFile.type;
        }

        const result = await createCommunity(
          name.trim(),
          imageBase64,
          fileName,
          fileType,
          slug.trim(),
          description.trim()
        );

        console.log("Community Created: ", result);

        if ("error" in result && result.error) {
          setErrorMessage(result.error);
        } else if ("subreddit" in result && result.subreddit) {
          resetForm();
          setOpen(false);
          router.push(`/community/${result.subreddit.slug?.current}`);
        } else {
          setErrorMessage("Failed to create community. Please try again.");
        }
      } catch (error: any) {
        console.error("Create Community Error:", error);
        setErrorMessage(error?.message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        disabled={!user}
        className="w-full p-2 pl-5 flex items-center gap-2 rounded-md cursor-pointer bg-black text-white hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={user ? "Create Community" : "Sign In to Create Community"}
      >
        <Plus className="w-4 h-4" />
        {user ? "Create Community" : "Sign In first"}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Community</DialogTitle>
          <DialogDescription>
            Create a community/subreddit to share ideas and get feedback.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={handleCreateCommunity}>
          {errorMessage && (
            <div className="text-red-500 dark:text-red-400 text-sm">
              {errorMessage}
            </div>
          )}

          {/* Community Name */}
          <div className="space-y-1">
            <label
              htmlFor="communityName"
              className="block text-sm font-medium dark:text-gray-200"
            >
              Community Name
            </label>
            <Input
              id="communityName"
              name="name"
              type="text"
              placeholder="Community Name"
              className="w-full dark:bg-gray-900 dark:text-white dark:border-gray-700"
              value={name}
              onChange={handleNameChange}
              required
              minLength={3}
              maxLength={21}
            />
          </div>

          {/* Slug */}
          <div className="space-y-1">
            <label
              htmlFor="slug"
              className="block text-sm font-medium dark:text-gray-200"
            >
              Community Slug (URL)
            </label>
            <Input
              id="slug"
              name="slug"
              type="text"
              placeholder="my-community"
              className="w-full dark:bg-gray-900 dark:text-white dark:border-gray-700"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              minLength={3}
              maxLength={21}
              pattern="^[a-z0-9]+(-[a-z0-9]+)*$"
              title="Lowercase letters, numbers, and hyphens only"
            />
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              This will be used in the URL:{" "}
              <strong>
                forumly.com/community/{slug?.trim() || "community-slug"}
              </strong>
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium dark:text-gray-200"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Description"
              className="w-full resize-none dark:bg-gray-900 dark:text-white dark:border-gray-700"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-1">
            <label
              htmlFor="community-image"
              className="block text-sm font-medium dark:text-gray-200"
            >
              Community Image (optional)
            </label>

            {imagePreview ? (
              <div className="relative w-32 h-32 mx-auto">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-full border dark:border-gray-700"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 -right-3 cursor-pointer rounded-full text-red-500 dark:text-red-400"
                  aria-label="Remove uploaded image"
                >
                  <CircleX />
                </button>
              </div>
            ) : (
              <label
                htmlFor="community-image"
                className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ImageIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 mb-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Click to upload an image
                </p>
                <Input
                  id="community-image"
                  name="community-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-white transition-all duration-200 bg-black hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700"
            disabled={!user || isPending}
            variant={user ? "default" : "secondary"}
          >
            {isPending
              ? "Creating..."
              : user
              ? "Create Community"
              : "Sign In to Create Community"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityButton;
