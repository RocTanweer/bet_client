import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_PROJECT_DATESET,
  apiVersion: import.meta.env.VITE_SANITY_PROJECT_API_VERSION,
  token: import.meta.env.VITE_SANITY_PROJECT_TOKEN,
});
