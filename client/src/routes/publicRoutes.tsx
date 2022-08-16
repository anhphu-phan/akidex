import React from "react"
import { RouteObject } from "react-router-dom"
import { MainLayout } from "layouts"
import { HomePage } from "views/common"
import { AnimeHomePage, TopAnime, AnimeSearch, AnimeSearchResult } from "views/anime"
import { MangaHomePage, TopManga, MangaSearch, MangaSearchResult } from "views/manga"
import { VisualNovelHomePage, TopVisualNovel, VisualNovelSearch, VisualNovelSearchResult } from "views/visualNovel"

const publicRoutes: RouteObject = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
            path: "manga",
            children: [
                {
                    index: true,
                    element: <MangaHomePage />,
                },
                {
                    path: "ranking",
                    element: <TopManga />,
                },
                {
                    path: "search",
                    element: <MangaSearch />,
                    children: [
                        {
                            path: "result",
                            element: <MangaSearchResult />,
                        },
                    ],
                },
            ],
        },
        {
            path: "anime",
            children: [
                {
                    index: true,
                    element: <AnimeHomePage />,
                },
                {
                    path: "ranking",
                    element: <TopAnime />,
                },
                {
                    path: "search",
                    element: <AnimeSearch />,
                    children: [
                        {
                            path: "result",
                            element: <AnimeSearchResult />,
                        },
                    ],
                },
            ],
        },
        {
            path: "visual-novel",
            children: [
                {
                    index: true,
                    element: <VisualNovelHomePage />,
                },
                {
                    path: "ranking",
                    element: <TopVisualNovel />,
                },
                {
                    path: "search",
                    element: <VisualNovelSearch />,
                    children: [
                        {
                            path: "result",
                            element: <VisualNovelSearchResult />,
                        },
                    ],
                },
            ],
        },
    ],
}

export default publicRoutes
