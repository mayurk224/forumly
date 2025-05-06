import { UserIcon } from "lucide-react";
import { defineType, defineField } from "sanity";
import Image from "next/image";

export const userType = defineType({
  name: "user",
  title: "User",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "username",
      title: "Username",
      type: "string",
      validation: (rule) => rule.required().error("Username is required"),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required().email().error("Please enter a valid email address"),
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL",
      type: "string",
      description: "The URL of the user's profile image",
    }),
    defineField({
      name: "joinedAt",
      title: "Joined At",
      type: "datetime",
      description: "The date and time when the user joined",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isReported",
      title: "Is Reported",
      type: "boolean",
      description: "Whether the user has been reported",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "username",
      media: "imageUrl",
    },
    prepare({ title, media }) {
      return {
        title,
        media: media ? (
          <Image src={media} alt={title} width={50} height={50} />
        ) : (
          <UserIcon />
        ),
      };
    },
  },
});
