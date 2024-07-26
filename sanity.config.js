//this file communicates only with the sanity studio admin you will need another one for connecting to sanity through the api with groq
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import schemas from './sanity/schemas';

const config = defineConfig({
  projectId: "64h5otbo",
  dataset: "production",
  title: "jewrly",
  apiVersion: "2024-07-25",
  basePath: "/admin",
  plugins: [deskTool()],
  schema: { types: schemas },
})

export default config