import type { PortableTextBlock } from "next-sanity";

export type Concert = {
  name: string;
  date: string;
  url?: string;
  address?: {
    name: string;
    formattedAddress?: string;
    street?: string;
    city?: string;
    postalCode?: string;
  };
};

export type FormFields = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  button?: string;
  confirmationMessage?: string;
  errorMessage?: string;
};

export type JoinTheBandFormFields = FormFields & {
  position?: string;
};

export type Instrument = {
  instrumentName: string;
  emoticon?: string;
  notes?: string;
};

export type GalleryImage = {
  image: {
    asset?: { _ref: string; _type: "reference" };
    hotspot?: { x: number; y: number; height: number; width: number };
    crop?: { top: number; bottom: number; left: number; right: number };
    _type: "image";
  };
  title: string;
};

export type QUERYResult = {
  intro: Array<{
    _id: string;
    _type: "intro";
    image: {
      asset?: { _ref: string; _type: "reference" };
      hotspot?: { x: number; y: number; height: number; width: number };
      crop?: { top: number; bottom: number; left: number; right: number };
      _type: "image";
    };
  }>;
  agenda: {
    title: string;
    content: PortableTextBlock[];
    concerts: Concert[];
    tableHeaders?: {
      date?: string;
      time?: string;
      location?: string;
      link?: string;
    };
  } | null;
  bookUs: {
    title: string;
    content: PortableTextBlock[];
    form: FormFields;
  } | null;
  aboutUs: {
    title: string;
    content: PortableTextBlock[];
  } | null;
  joinTheBand: {
    title: string;
    content: PortableTextBlock[];
    instruments: Instrument[];
    form: JoinTheBandFormFields;
  } | null;
  gallery: {
    title: string;
    content?: PortableTextBlock[];
    images: GalleryImage[];
  } | null;
  whatsApp: {
    phoneNumber: string;
    statusMessage?: string;
    chatMessage?: string;
  } | null;
  menu: {
    aboutUs: string | null;
    agenda: string | null;
    bookUs: string | null;
    gallery: string | null;
    joinTheBand: string | null;
  };
};
