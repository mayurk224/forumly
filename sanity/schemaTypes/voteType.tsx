import { ArrowDown, ArrowUp, ThumbsUpIcon } from "lucide-react";
import { defineType, defineField } from "sanity";

export const voteType = defineType({
  name: "vote",
  title: "Vote",
  type: "document",
  icon: ThumbsUpIcon,
  description: "A vote cast by a user on a post or comment",
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
      validation: (rule) => rule.required().error("User is required"),
    }),
    defineField({
      name: "voteType",
      title: "Vote Type",
      type: "string",
      description: "The type of vote (upvote or downvote)",
      options: {
        list: [
          { title: "Upvote", value: "upvote" },
          { title: "Downvote", value: "downvote" },
        ],
      },
      validation: (rule) => rule.required().error("Vote type is required"),
    }),
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
      description: "The post that was voted on (if applicable)",
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "reference",
      to: [{ type: "comment" }],
      description: "The comment that was voted on (if applicable)",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      description: "The date and time when the vote was cast",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  validation: (rule) =>
    rule.custom((fields) => {
      // Either post or comment must be defined, but not both
      if (fields?.post && fields?.comment) {
        return "A vote can only be on either a post OR a comment, not both";
      }
      if (!fields?.post && !fields?.comment) {
        return "A vote must be on either a post or a comment";
      }
      return true;
    }),
  preview: {
    select: {
      username: "user.username",
      voteType: "voteType",
      postTitle: "post.title",
      commentTitle: "comment.title",
    },
    prepare(selection) {
      const { username, voteType, postTitle, commentTitle } = selection;
      return {
        title: postTitle || commentTitle,
        subtitle: username,
        media: voteType === "upvote" ? <ArrowUp /> : <ArrowDown />,
      };
    },
  },
});
