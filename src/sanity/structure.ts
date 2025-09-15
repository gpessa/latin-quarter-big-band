import { NAME } from "@/contants";
import {
  DriveFileRenameOutline,
  EmojiPeople,
  Book,
  CalendarMonth,
  BugReport,
  Image,
} from "@mui/icons-material";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = ({
  list,
  listItem,
  document,
  documentTypeListItem,
}) =>
  list()
    .title(NAME)
    .items([
      documentTypeListItem("intro").title("Intro"),
      listItem()
        .title("General")
        .id("general")
        .icon(BugReport)
        .child(document().schemaType("general").documentId("general")),
      listItem()
        .title("Join The Band")
        .id("joinTheBand")
        .icon(EmojiPeople)
        .child(document().schemaType("joinTheBand").documentId("joinTheBand")),
      listItem()
        .title("About Us")
        .id("aboutUs")
        .icon(DriveFileRenameOutline)
        .child(document().schemaType("aboutUs").documentId("aboutUs")),
      listItem()
        .title("Book Us")
        .id("bookUs")
        .icon(Book)
        .child(document().schemaType("bookUs").documentId("bookUs")),
      listItem()
        .title("Agenda")
        .id("agenda")
        .icon(CalendarMonth)
        .child(document().schemaType("agenda").documentId("agenda")),
      listItem()
        .title("Gallery")
        .id("galleryImage")
        .icon(Image)
        .child(
          document().schemaType("galleryImage").documentId("galleryImage")
        ),
    ]);
