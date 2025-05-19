"use server";

import { adminClient } from "@/sanity/lib/adminClient";
import { getUser } from "@/sanity/lib/user/getUser";

export async function reportContent(contentId: string) {
  const user = await getUser();

  if (!user || "error" in user) {
    return { error: user?.error || "Unauthorized" };
  }

  const existing = await adminClient.getDocument(contentId);
  if (!existing) {
    return { error: "Content not found" };
  }

  const result = await adminClient
    .patch(contentId)
    .set({ isReported: true })
    .commit();

  return { result };
}
