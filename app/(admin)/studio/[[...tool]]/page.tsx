/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// This route needs to be dynamic to properly handle the studio routes
export const dynamic = "force-dynamic";

export { metadata, viewport } from "next-sanity/studio";

interface StudioPageProps {
  params: {
    tool: string[];
  };
}

export default function StudioPage(_props: StudioPageProps) {
  // The NextStudio component handles the routing internally based on the config
  return <NextStudio config={config} />;
}
