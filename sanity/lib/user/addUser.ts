import { adminClient } from "../adminClient";

export async function addUser({
  _id,
  username,
  imageUrl,
  email,
}: {
  _id: string;
  username: string;
  imageUrl: string;
  email: string;
}) {
  const user = await adminClient.createIfNotExists({
    _id: _id,
    _type: "user",
    username,
    imageUrl,
    email,
    joinedAt: new Date().toISOString(),
  });

  return user;
}
