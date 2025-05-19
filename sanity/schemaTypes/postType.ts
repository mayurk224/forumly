import { FileTextIcon } from "lucide-react";
import { defineType, defineField } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: FileTextIcon,
  description: "A post created by a user",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().error("Title is required"),
    }),
    defineField({
      name: "originalTitle",
      title: "Original Title",
      type: "string",
      description: "The original title of the post if it was edited",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "user" }],
      validation: (rule) => rule.required().error("Author is required"),
    }),
    defineField({
      name: "subreddit",
      title: "Subreddit",
      type: "reference",
      to: [{ type: "subreddit" }],
      validation: (rule) => rule.required().error("Subreddit is required"),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the image",
        },
      ],
      description: "URL of the post image",
    }),
    defineField({
      name: "isReported",
      title: "Is Reported",
      type: "boolean",
      description: "Whether the post has been reported",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      description: "The date and time when the post was published",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isDeleted",
      title: "Is Deleted",
      type: "boolean",
      description: "Whether the post has been deleted",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author.username",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
