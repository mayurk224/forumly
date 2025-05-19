"use client";

import * as React from "react";
import { ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/action/createPost";

function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const subreddit = searchParams.get("subreddit");

  if (!subreddit) {
    return (
      <div className="text-center p-4">
        <p>Please select a community first</p>
      </div>
    );
  }

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage("Post title is required");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      let imageBase64: string | null = null;
      let fileName: string | null = null;
      let fileType: string | null = null;

      if (imageFile) {
        const reader = new FileReader();
        imageBase64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(imageFile);
        });
        fileName = imageFile.name;
        fileType = imageFile.type;
      }

      const result = await createPost({
        title: title.trim(),
        subredditSlug: subreddit,
        body: body.trim() || undefined,
        imageBase64: imageBase64,
        imageFilename: fileName,
        imageContentType: fileType,
      });

      resetForm();
      console.log("Finished creating post", result);

      if ("error" in result && result.error) {
        setErrorMessage(result.error);
      } else {
        router.push(`/community/${subreddit}`);
      }
    } catch (err) {
      console.error("Failed to create post", err);
      setErrorMessage("Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setBody("");
    setErrorMessage("");
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4">
      <form onSubmit={handleCreatePost} className="space-y-6 mt-4">
        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 dark:text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Title Field */}
        <div className="space-y-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Title
          </label>
          <Input
            id="title"
            name="title"
            placeholder="Title of your post"
            className="w-full dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={300}
          />
        </div>

        {/* Body Field */}
        <div className="space-y-1">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Body{" "}
            <span className="text-gray-400 dark:text-gray-500">(optional)</span>
          </label>
          <Textarea
            id="body"
            name="body"
            placeholder="Write something..."
            className="w-full resize-y dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Image{" "}
            <span className="text-gray-400 dark:text-gray-500">(optional)</span>
          </label>

          {imagePreview ? (
            <div className="relative w-full h-64 rounded border overflow-hidden dark:border-gray-700">
              <Image
                src={imagePreview}
                alt="Post preview"
                fill
                className="object-contain"
              />
              <button
                type="button"
                onClick={removeImage}
                aria-label="Remove image"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              >
                ×
              </button>
            </div>
          ) : (
            <label
              htmlFor="post-image"
              className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <ImageIcon className="w-6 h-6 mb-2 text-gray-400 dark:text-gray-500" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Click to upload an image
              </p>
              <input
                id="post-image"
                name="post-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 transition dark:bg-red-700 dark:hover:bg-red-800"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Post"}
        </Button>
      </form>
    </div>
  );
}

export default CreatePostForm;
