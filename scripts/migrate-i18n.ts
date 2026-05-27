/**
 * Migration script: converts existing plain string/text/block fields
 * into internationalized array format for sanity-plugin-internationalized-array.
 *
 * Existing content is assumed to be in Dutch (nl) as the default locale.
 *
 * Usage:
 *   npx tsx scripts/migrate-i18n.ts
 *
 * Requires env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 * and a SANITY_API_TOKEN with write access.
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN env vars"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const DEFAULT_LOCALE = "nl";

function randomKey() {
  return Math.random().toString(36).slice(2, 12);
}

function wrapValue(value: unknown): Array<{ _key: string; language: string; value: unknown }> | undefined {
  if (value === null || value === undefined) return undefined;
  return [{ _key: randomKey(), language: DEFAULT_LOCALE, value }];
}

interface FieldSpec {
  path: string;
  type: "string" | "text" | "block";
}

interface DocTypeSpec {
  type: string;
  fields: FieldSpec[];
  nestedObjects?: {
    path: string;
    fields: FieldSpec[];
  }[];
  arrays?: {
    path: string;
    fields: FieldSpec[];
  }[];
}

const docTypes: DocTypeSpec[] = [
  {
    type: "aboutUs",
    fields: [
      { path: "title", type: "string" },
      { path: "content", type: "block" },
    ],
  },
  {
    type: "agenda",
    fields: [
      { path: "title", type: "string" },
      { path: "content", type: "block" },
    ],
  },
  {
    type: "bookUs",
    fields: [
      { path: "title", type: "string" },
      { path: "content", type: "block" },
    ],
    nestedObjects: [
      {
        path: "form",
        fields: [
          { path: "name", type: "string" },
          { path: "email", type: "string" },
          { path: "phone", type: "string" },
          { path: "message", type: "string" },
          { path: "button", type: "string" },
          { path: "confirmationMessage", type: "string" },
          { path: "errorMessage", type: "string" },
        ],
      },
    ],
  },
  {
    type: "joinTheBand",
    fields: [
      { path: "title", type: "string" },
      { path: "content", type: "block" },
    ],
    nestedObjects: [
      {
        path: "form",
        fields: [
          { path: "name", type: "string" },
          { path: "email", type: "string" },
          { path: "phone", type: "string" },
          { path: "position", type: "string" },
          { path: "message", type: "string" },
          { path: "button", type: "string" },
          { path: "confirmationMessage", type: "string" },
          { path: "errorMessage", type: "string" },
        ],
      },
    ],
    arrays: [
      {
        path: "instruments",
        fields: [
          { path: "instrumentName", type: "string" },
          { path: "notes", type: "string" },
        ],
      },
    ],
  },
  {
    type: "galleryImage",
    fields: [{ path: "title", type: "string" }],
    arrays: [
      {
        path: "images",
        fields: [{ path: "title", type: "string" }],
      },
    ],
  },
  {
    type: "general",
    fields: [{ path: "description", type: "text" }],
    nestedObjects: [
      {
        path: "whatsApp",
        fields: [
          { path: "statusMessage", type: "string" },
          { path: "chatMessage", type: "text" },
        ],
      },
    ],
  },
];

async function migrate() {
  for (const spec of docTypes) {
    const docs = await client.fetch(`*[_type == "${spec.type}"]`);
    console.log(`\nMigrating ${docs.length} "${spec.type}" document(s)...`);

    for (const doc of docs) {
      let patch = client.patch(doc._id);
      let hasChanges = false;

      for (const field of spec.fields) {
        const currentValue = doc[field.path];
        if (currentValue && !(Array.isArray(currentValue) && currentValue[0]?._key)) {
          const wrapped = wrapValue(currentValue);
          if (wrapped) {
            patch = patch.set({ [field.path]: wrapped });
            hasChanges = true;
          }
        }
      }

      if (spec.nestedObjects) {
        for (const nested of spec.nestedObjects) {
          const obj = doc[nested.path];
          if (!obj) continue;
          for (const field of nested.fields) {
            const currentValue = obj[field.path];
            if (currentValue && !(Array.isArray(currentValue) && currentValue[0]?._key)) {
              const wrapped = wrapValue(currentValue);
              if (wrapped) {
                patch = patch.set({ [`${nested.path}.${field.path}`]: wrapped });
                hasChanges = true;
              }
            }
          }
        }
      }

      if (spec.arrays) {
        for (const arr of spec.arrays) {
          const items = doc[arr.path];
          if (!Array.isArray(items)) continue;
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            for (const field of arr.fields) {
              const currentValue = item[field.path];
              if (currentValue && !(Array.isArray(currentValue) && currentValue[0]?._key)) {
                const wrapped = wrapValue(currentValue);
                if (wrapped) {
                  patch = patch.set({
                    [`${arr.path}[${i}].${field.path}`]: wrapped,
                  });
                  hasChanges = true;
                }
              }
            }
          }
        }
      }

      if (hasChanges) {
        await patch.commit();
        console.log(`  Migrated: ${doc._id}`);
      } else {
        console.log(`  Skipped (already migrated): ${doc._id}`);
      }
    }
  }

  console.log("\nMigration complete!");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
