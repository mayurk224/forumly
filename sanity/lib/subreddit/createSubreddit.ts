import { ImageData } from "@/action/createCommunity";
import { defineQuery } from "groq";
import { sanityFetch } from "../live";
import { Subreddit } from "@/sanity.types";
import { adminClient } from "../adminClient";


export async function createSubreddit(
    name: string,
    moderatorId: string,
    imageData: ImageData | null,
    customSlug?: string,
    customDescription?: string
){
    console.log(`creating subreddit ${name} with moderator: ${moderatorId}`)
    try {
        const chekingExistingQuery = defineQuery(`
            *[_type == "subreddit" && title == $name][0]{
            _id
            }
        `);
        const existingSubreddit = await sanityFetch({
            query: chekingExistingQuery,
            params: { name },
        })
        if(existingSubreddit.data){
            console.log(`Subreddit ${name} already exists`)
            return { error: "Subreddit already exists" };
        }
        if(customSlug){
            const checkSlugQuery = defineQuery(`
                *[_type == "subreddit" && slug.current == $slug][0]{
                _id
                }
            `);
            const existingSlug = await sanityFetch({
                query: checkSlugQuery,
                params: { slug: customSlug },
            })
            if(existingSlug.data){
                console.log(`Subreddit with slug ${customSlug} already exists`)
                return { error: "Subreddit with this slug already exists" };
            }
        }
        const slug = customSlug || name.toLowerCase().replace(/\s+/g, "-");
        let imageAsset;
        if(imageData){
            try{
                const base64Data = imageData.base64.split(",")[1];
                const buffer = Buffer.from(base64Data, "base64");
                imageAsset = await adminClient.assets.upload("image", buffer, {
                    filename: imageData.fileName,
                    contentType: imageData.fileType,
                });
                console.log("Image asset: ", imageAsset);
            }
            catch(error){
                console.error("Error uploading image: ", error);
                return { error: "Failed to upload image" };
            }
        }
        const subredditDoc: Partial<Subreddit>= {
            _type: "subreddit",
            title: name,
            description: customDescription || `Welcome to r/${name}!`,
            slug: { _type: "slug", current: slug },
            moderator: { _type: "reference", _ref: moderatorId },
            createdAt: new Date().toISOString(),
        }
        if(imageAsset){
            subredditDoc.image = {
                _type: "image",
                asset: { _type: "reference", _ref: imageAsset._id },
            };
        }
        const subreddit = await adminClient.create(subredditDoc as Subreddit);
        console.log(`Subreddit ${name} created with ID: ${subreddit._id}`);
        return { subreddit };
    } catch (error) {
        console.error("Error creating subreddit: ", error);
        return { error: "Failed to create subreddit" };
    }
}