import React from "react"
import { RouteObject } from "react-router-dom"
import { MainLayout } from "layouts"
import { HomePage } from "views/common"
import { AnimeHomePage, TopAnime, AnimeSearch } from "views/anime"
import { MangaHomePage, TopManga, MangaSearch, MangaDetail } from "views/manga"
import { VisualNovelHomePage, TopVisualNovel, VisualNovelSearch, VisualNovelSearchResult } from "views/visualNovel"
import SeasonalAnime from "views/anime/SeasonalAnime"
import AnimeDetail from "views/anime/AnimeDetail"
import { MediaOverview, MediaCharacters, MediaStaff, MediaRelations } from "layouts/MediaDetail"

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
                    path: ":id",
                    element: <MangaDetail />,
                    children: [
                        {
                            index: true,
                            path: "",
                            element: <MediaOverview />,
                        },
                        {
                            path: "characters",
                            element: <MediaCharacters />,
                        },
                        {
                            path: "staff",
                            element: <MediaStaff />,
                        },
                        {
                            path: "relations",
                            element: <MediaRelations />,
                        },
                    ],
                },
                {
                    path: "ranking",
                    element: <TopManga />,
                },
                {
                    path: "search",
                    element: <MangaSearch />,
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
                    path: ":id",
                    element: <AnimeDetail />,
                    children: [
                        {
                            index: true,
                            path: "",
                            element: <MediaOverview />,
                        },
                        {
                            path: "characters",
                            element: <MediaCharacters />,
                        },
                        {
                            path: "staff",
                            element: <MediaStaff />,
                        },
                        {
                            path: "relations",
                            element: <MediaRelations />,
                        },
                    ],
                },
                {
                    path: "ranking",
                    element: <TopAnime />,
                },
                {
                    path: "search",
                    element: <AnimeSearch />,
                },
                {
                    path: "season",
                    element: <SeasonalAnime />,
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
