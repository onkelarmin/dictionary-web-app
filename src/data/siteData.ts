export type PageKey = "home";

export interface PageData {
  key: PageKey;
  name: string;
  url: string;
  title: string;
  description: string;
  ogImage: string;
}

export const sitePages: Record<PageKey, PageData> = {
  home: {
    key: "home",
    name: "Home",
    url: "/",
    title: "Dictionary Web App – Definitions, Phonetics & Audio Pronunciation",
    description:
      "A modern dictionary app to search word definitions, phonetics, and pronunciations with theme and font customization.",
    ogImage: "og/home.webp",
  },
};
