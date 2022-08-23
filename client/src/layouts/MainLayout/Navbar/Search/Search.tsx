import React, { useRef, useState } from "react"
import { Box, Popover, ClickAwayListener, popoverClasses, SxProps, Theme, useTheme } from "@mui/material"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { useDebounce } from "react-use"
import { animeClient } from "graphql/graphql-request"
import { MediaQuery, MediaQueryVariables, useMediaQuery } from "api/hooks/Media"
import { MediaType } from "types"
import { getSearchBoxWidth, TextField } from "./HelperComponents"
import ResultSection from "./ResultSection"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { VisualNovel } from "types/VisualNovels"
import { VNQueryResponse } from "types/VNDB"

export type FilterType = Record<MediaType, boolean>

interface SearchProps {
    sx: SxProps<Theme>
}

// The search input need to apply debounce mechanism
const Search = ({ sx }: SearchProps) => {
    const theme = useTheme()
    const [expand, setExpand] = useState(false)
    const [input, setInput] = useState("")
    const [typeFilter, setTypeFilter] = useState<FilterType>({ ANIME: true, MANGA: true, "VISUAL NOVEL": true })
    const anchorEl = useRef(document.createElement("div"))
    // get a ref of result list to check if user click outside or inside later
    const resultEle = useRef<HTMLDivElement | null>(null)
    const queryVariable: MediaQueryVariables = { search: input, perPage: 1000 }

    if (typeFilter.MANGA && !typeFilter.ANIME) queryVariable.type = MediaType.Manga
    else if (typeFilter.ANIME && !typeFilter.MANGA) queryVariable.type = MediaType.Anime

    const {
        data: animeMangaData,
        isLoading: isLoadingAnimeManga,
        refetch: refetchAnimeManga,
    } = useMediaQuery(animeClient, queryVariable, {
        enabled: false,
        initialData: () => {
            return undefined
        },
        // filter data after fetching
        select: (data) => {
            if (!data || !data.Page || !data.Page.media) return data as MediaQuery

            const filteredData = structuredClone(data)

            if (filteredData && filteredData.Page && filteredData.Page.media) {
                filteredData.Page.media = filteredData.Page.media.filter((media) => {
                    if (!media || !media.title) return false

                    const { romaji, userPreferred } = media.title

                    return [romaji, userPreferred].some((title) =>
                        title?.toLowerCase().includes(input.toLowerCase())
                    )
                })
            }

            return filteredData
        },
    })

    const {
        isLoading: isLoadingVN,
        data: vnData,
        refetch: refetchVN,
    } = useQuery(
        ["visual-novel", input, typeFilter["VISUAL NOVEL"]],
        async () => {
            const response = await axios.get<VNQueryResponse<VisualNovel>>(
                `${import.meta.env.VITE_SERVER_BASE_URL}/api/visual-novel/search`,
                {
                    params: {
                        title: input,
                    },
                }
            )

            return response.data
        },
        { enabled: false }
    )

    // debouce the fetching
    useDebounce(
        () => {
            refetchAnimeManga()

            refetchVN()
        },
        800,
        [input, typeFilter]
    )

    const handleCheck = (type: MediaType, checked: boolean) => {
        setTypeFilter({ ...typeFilter, [`${type}`]: checked })
    }

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value)
    }

    const closeMenu = () => {
        setInput("")
        setExpand(false)
        setTypeFilter({ "VISUAL NOVEL": true, MANGA: true, ANIME: true })
    }

    const scrollbarpadding = 0

    return (
        <Box
            sx={{
                width: { md: 200, lg: 400 },
                mr: 2,
                [theme.breakpoints.down("md")]: {
                    height: 60,
                    bgcolor: "primary.main",
                    px: 10,
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                flexGrow: 1,
                overflowY: "hidden",
                ...sx,
            }}
        >
            <ClickAwayListener
                onClickAway={(event: MouseEvent | TouchEvent) => {
                    // check where user was clicking, if it's outside the search box and result => shrink the search box
                    // we can't just use onBlur event on the Search box
                    if (
                        resultEle.current === null ||
                        (resultEle.current !== null &&
                            !anchorEl.current.contains(event.target as Node) &&
                            !resultEle.current.contains(event.target as Node))
                    ) {
                        closeMenu()
                    }
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
                    <TextField
                        ref={anchorEl}
                        expand={expand}
                        value={input}
                        placeholder="Search..."
                        autoComplete="off"
                        InputProps={{
                            startAdornment: <SearchOutlinedIcon sx={{ mr: 0.5 }} />,
                        }}
                        inputProps={{
                            style: {
                                zIndex: 1301,
                            },
                        }}
                        onClick={() => setExpand(true)}
                        onChange={handleChangeInput}
                    />

                    <Popover
                        sx={{ maxHeight: "70vh" }}
                        disableAutoFocus
                        anchorEl={anchorEl.current}
                        keepMounted
                        disablePortal
                        hideBackdrop
                        disableEnforceFocus
                        anchorOrigin={{
                            horizontal: "center",
                            vertical: "bottom",
                        }}
                        transformOrigin={{
                            horizontal: "center",
                            vertical: "top",
                        }}
                        PaperProps={{
                            sx: {
                                overflowY: "hidden",
                                minWidth: anchorEl.current.clientWidth,
                            },
                        }}
                        open={expand && input !== ""}
                        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                            const ele = event.target as HTMLDivElement

                            if (ele.classList.contains(popoverClasses.root)) {
                                closeMenu()
                            }
                        }}
                    >
                        <Box
                            ref={resultEle}
                            sx={{
                                width: getSearchBoxWidth(expand) - scrollbarpadding * 2,
                                overflowY: "hidden",
                            }}
                        >
                            <ResultSection
                                isLoading={isLoadingAnimeManga && isLoadingVN}
                                animeMangaData={typeFilter.ANIME || typeFilter.MANGA ? animeMangaData : undefined}
                                vnData={typeFilter["VISUAL NOVEL"] ? vnData?.items : undefined}
                                filters={typeFilter}
                                onChecked={handleCheck}
                                closeMenu={closeMenu}
                            />
                        </Box>
                    </Popover>
                </Box>
            </ClickAwayListener>
        </Box>
    )
}

export default Search
