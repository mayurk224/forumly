import { HashIcon } from "lucide-react";
import { defineType, defineField } from "sanity";

export const subredditType = defineType({
  name: "subreddit",
  title: "Subreddit",
  type: "document",
  icon: HashIcon,
  description: "A subreddit created by a user",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Name of the subreddit",
      validation: (rule) => rule.required().error("Subreddit name is required"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Description of the subreddit",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The slug of the subreddit",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required().error("Slug is required"),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "The subreddit's image",
      fields:[
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the image",
        },
      ]
    }),
    defineField({
      name: "moderator",
      title: "Moderator",
      type: "reference",
      description: "The moderator of the subreddit",
      to: [{ type: "user" }],
      validation: (rule) => rule.required().error("Moderator is required"),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      description: "The date and time when the subreddit was created",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "imageUrl",
    },
    prepare({ title, media }) {
      return {
        title,
        media: "image",
      };
    },
  },
});
