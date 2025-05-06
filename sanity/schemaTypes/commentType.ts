import { MessageSquareIcon } from "lucide-react";
import { defineType, defineField } from "sanity";

export const commentType = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  icon: MessageSquareIcon,
  description: "A comment created by a user on a post",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      validation: (rule) =>
        rule.required().error("Comment content is required"),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "user" }],
      validation: (rule) => rule.required().error("Author is required"),
    }),
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      description: "The post this comment is associated with",
      to: [{ type: "post" }],
      validation: (rule) => rule.required().error("Post is required"),
    }),
    defineField({
      name: "parentComment",
      title: "Parent Comment",
      type: "reference",
      to: [{ type: "comment" }],
      description: "If this is a reply, reference the parent comment",
    }),
    defineField({
      name: "isReported",
      title: "Is Reported",
      type: "boolean",
      description: "Whether the comment has been reported",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      description: "The date and time when the comment was created",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isDeleted",
      title: "Is Deleted",
      type: "boolean",
      description: "Whether the comment has been deleted",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "content",
      subtitle: "author.username",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});
