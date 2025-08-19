import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

async function clearInstruments() {
  // Get all _id for missingMusicians docs
  const ids = await client.fetch(`*[_type == "missingMusicians"]._id`);

  // Patch each doc to unset the instruments field
  for (const id of ids) {
    await client.patch(id).unset(["instruments"]).commit();
    console.log(`Cleared instruments for ${id}`);
  }

  console.log(`Done. Cleared instruments for ${ids.length} documents.`);
}

clearInstruments().catch(console.error);
