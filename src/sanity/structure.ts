import { NAME } from "@/contants";
import { DriveFileRenameOutline } from "@mui/icons-material";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title(NAME)
    .items([
      S.listItem()
        .title("Content")
        .id("content")
        .icon(DriveFileRenameOutline)
        .child(
          // Instead of rendering a list of documents, we render a single
          // document, specifying the `documentId` manually to ensure
          // that we're editing the single instance of the document
          S.document().schemaType("content").documentId("content")
        ),
      S.documentTypeListItem("concert").title("Concerts"),
      S.documentTypeListItem("galleryImage").title("Images"),
      S.documentTypeListItem("video").title("Videos"),
    ]);
