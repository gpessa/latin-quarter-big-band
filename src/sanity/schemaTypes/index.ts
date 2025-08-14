import { type SchemaTypeDefinition } from "sanity";

import { concertType } from "./concertType";
import { galleryImageType } from "./imageType";
import { videoType } from "./videoType";
import { contentType } from "./contentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [concertType, galleryImageType, videoType, contentType],
};
