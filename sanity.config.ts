"use client";

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { defaultStudioLanguages, studioLanguages } from "./src/sanity/localeConfig";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    internationalizedArray({
      languages: studioLanguages,
      defaultLanguages: defaultStudioLanguages,
      fieldTypes: ["string", "text", "blockContent"],
      languageFilter: {
        documentTypes: [
          "aboutUs",
          "agenda",
          "bookUs",
          "joinTheBand",
          "galleryImage",
          "general",
        ],
      },
    }),
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
