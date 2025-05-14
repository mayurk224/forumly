import { currentUser } from "@clerk/nextjs/server";
import { defineQuery } from "groq";
import { sanityFetch } from "../live";
import { addUser } from "./addUser";

interface UserResult {
  _id: string;
  username: string;
  imageUrl: string;
  email: string;
}

const parseUsername = (username: string) => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return (
    username
      .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
      .replace(/\s+/g, "") + randomNum
  );
};

export async function getUser(): Promise<UserResult | { error: string }> {
  try {
    console.log("Getting current user from Clerk");
    const loggedInUser = await currentUser();
    if (!loggedInUser) {
      console.log("Not logged in");
      return { error: "Not logged in" };
    }
    console.log(`found clerk user: ${loggedInUser.id}`);
    const getExistingUserQuery = defineQuery(
      `*[_type == "user" && _id == $id][0]`
    );
    console.log("checking if user exists in Sanity database");
    const existingUser = await sanityFetch({
      query: getExistingUserQuery,
      params: { id: loggedInUser.id },
    });
    if (existingUser.data?._id) {
      console.log(`user found in database with ID: ${existingUser.data._id}`);
      const user: UserResult = {
        _id: existingUser.data._id,
        username: existingUser.data.username || "",
        imageUrl: existingUser.data.imageUrl || "",
        email: existingUser.data.email || "",
      };
      return user;
    }
    console.log("user not found in database, creating new user");
    const newUser = await addUser({
      _id: loggedInUser.id,
      username: parseUsername(loggedInUser.username || ""),
      imageUrl: loggedInUser.imageUrl || "",
      email:
        loggedInUser.primaryEmailAddress?.emailAddress ||
        loggedInUser.emailAddresses[0].emailAddress,
    });

    return newUser;
  } catch (error) {
    console.log("Error getting user: ", error);
    return { error: "Failed to get user" };
  }
}
