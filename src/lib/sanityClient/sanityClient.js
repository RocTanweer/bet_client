import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_PROJECT_DATESET,
  apiVersion: import.meta.env.VITE_SANITY_PROJECT_API_VERSION,
  token: import.meta.env.VITE_SANITY_PROJECT_TOKEN,
  ignoreBrowserTokenWarning: true,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
