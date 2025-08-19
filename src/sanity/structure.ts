import { NAME } from "@/contants";
import { DriveFileRenameOutline } from "@mui/icons-material";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title(NAME)
    .items([
      S.listItem()
        .title("Join The Band")
        .id("joinTheBand")
        .icon(DriveFileRenameOutline)
        .child(
          S.document().schemaType("joinTheBand").documentId("joinTheBand")
        ),
      S.listItem()
        .title("Book Us")
        .id("bookUs")
        .icon(DriveFileRenameOutline)
        .child(S.document().schemaType("bookUs").documentId("bookUs")),
      S.listItem()
        .title("Agenda")
        .id("agenda")
        .icon(DriveFileRenameOutline)
        .child(S.document().schemaType("agenda").documentId("agenda")),
      S.documentTypeListItem("galleryImage").title("Images"),
      S.documentTypeListItem("video").title("Videos"),
    ]);
