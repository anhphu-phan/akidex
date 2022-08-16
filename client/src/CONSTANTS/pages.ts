export interface Page {
    name: string
    title: string
    url: string
    children?: Page[]
}

export const pages: Page[] = [
    {
        name: "Anime",
        title: "Anime",
        url: "/anime",
        children: [
            {
                name: "Top Anime",
                title: "Top Anime",
                url: "/anime/ranking",
            },
            {
                name: "Search Anime",
                title: "Search Anime",
                url: "/anime/search",
            },
            {
                name: "Seasonal Anime",
                title: "Seasonal Anime",
                url: "/anime/season",
            },
        ],
    },
    {
        name: "Manga",
        title: "Manga",
        url: "/manga",
        children: [
            {
                name: "Top Manga",
                title: "Top Manga",
                url: "/manga/ranking",
            },
            {
                name: "Search Manga",
                title: "Search Manga",
                url: "/manga/search",
            },
        ],
    },
    {
        name: "Visual Novel",
        title: "Visual Novel",
        url: "/visual-novel",
        children: [
            {
                name: "Top Visual Novel",
                title: "Top Visual Novel",
                url: "/visual-novel/ranking",
            },
            {
                name: "Search Visual Novel",
                title: "Search Visual Novel",
                url: "/visual-novel/search",
            },
        ],
    },
]
