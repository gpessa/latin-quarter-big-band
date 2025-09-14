import { type SchemaTypeDefinition } from "sanity";

import { agendaType } from "./agendaType";
import { bookUsType } from "./bookUsType";
import { contentType } from "./contentType";
import { galleryImageType } from "./galleryImageType";
import { generalType } from "./generalType";
import { joinTheBandType } from "./joinTheBandType";
import { aboutUsType } from "./aboutsUsType";
import { videoType } from "./videoType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    agendaType,
    galleryImageType,
    videoType,
    contentType,
    joinTheBandType,
    bookUsType,
    aboutUsType,
    generalType,
  ],
};
