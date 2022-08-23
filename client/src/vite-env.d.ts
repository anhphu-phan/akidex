/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ANIME_API_ENDPOINT: string
    readonly VITE_MANGA_API_ENDPOINT: string
    readonly VITE_SERVER_BASE_URL: string
    readonly VITE_VNDB_PLATFORM_ICONS_URL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
