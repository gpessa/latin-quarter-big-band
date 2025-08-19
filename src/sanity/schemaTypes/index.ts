import { type SchemaTypeDefinition } from "sanity";

import { agendaType } from "./agendaType";
import { galleryImageType } from "./imageType";
import { videoType } from "./videoType";
import { contentType } from "./contentType";
import { joinTheBand } from "./joinTheBand";
import { bookUs } from "./bookUs";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    agendaType,
    galleryImageType,
    videoType,
    contentType,
    joinTheBand,
    bookUs,
  ],
};
