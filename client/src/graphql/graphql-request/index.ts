import { GraphQLClient } from "graphql-request"

const animeClient = new GraphQLClient(import.meta.env.VITE_ANIME_API_ENDPOINT)
const mangaClient = new GraphQLClient(import.meta.env.VITE_MANGA_API_ENDPOINT)
const mediaClient = new GraphQLClient(import.meta.env.VITE_MANGA_API_ENDPOINT)

export { animeClient, mangaClient, mediaClient }
