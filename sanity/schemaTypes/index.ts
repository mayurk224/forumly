import { type SchemaTypeDefinition } from "sanity";
import { userType } from "./userType";
import { postType } from "./postType";
import { subredditType } from "./subredditType";
import { commentType } from "./commentType";
import { voteType } from "./voteType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType, postType, subredditType, commentType, voteType],
};
