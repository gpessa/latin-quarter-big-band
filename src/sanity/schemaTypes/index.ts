import { type SchemaTypeDefinition } from "sanity";

import { agendaType } from "./agendaType";
import { blockContentType } from "./blockContentType";
import { bookUsType } from "./bookUsType";
import { contentType } from "./contentType";
import { generalType } from "./generalType";
import { joinTheBandType } from "./joinTheBandType";
import { aboutUsType } from "./aboutsUsType";
import { galleryImageType } from "./galleryImageType";
import { introType } from "./introType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    agendaType,
    introType,
    contentType,
    joinTheBandType,
    bookUsType,
    aboutUsType,
    galleryImageType,
    generalType,
  ],
};
