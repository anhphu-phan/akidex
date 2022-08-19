import React, { useRef, useState } from "react"
import { Box, Popover, ClickAwayListener, popoverClasses, SxProps, Theme, useTheme } from "@mui/material"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { useDebounce } from "react-use"
import { animeClient } from "graphql/graphql-request"
import { MediaQuery, MediaQueryVariables, useMediaQuery } from "api/hooks/Media"
import { MediaType } from "types"
import { getSearchBoxWidth, TextField } from "./HelperComponents"
import ResultSection from "./ResultSection"

export type FilterType = Record<MediaType, boolean>

interface SearchProps {
    sx: SxProps<Theme>
}

// TODO: add visual novel type
// The search input need to apply debounce mechanism
const Search = ({ sx }: SearchProps) => {
    const theme = useTheme()
    const [expand, setExpand] = useState(false)
    const [input, setInput] = useState("")
    const [typeFilter, setTypeFilter] = useState<FilterType>({ ANIME: true, MANGA: true, "VISUAL NOVEL": false })
    const anchorEl = useRef(document.createElement("div"))
    // get a ref of result list to check if user click outside or inside later
    const resultEle = useRef<HTMLDivElement | null>(null)

    const queryVariable: MediaQueryVariables = { search: input, perPage: 1000 }

    if (typeFilter.MANGA && !typeFilter.ANIME) queryVariable.type = MediaType.Manga
    else if (typeFilter.ANIME && !typeFilter.MANGA) queryVariable.type = MediaType.Anime

    const { data, isLoading, refetch } = useMediaQuery(animeClient, queryVariable, {
        enabled: false,
        // filter data after fetching
        select: (data) => {
            if (!data || !data.Page || !data.Page.media) return data as MediaQuery

            const filteredData = structuredClone(data)

            if (filteredData && filteredData.Page && filteredData.Page.media) {
                filteredData.Page.media = filteredData.Page.media.filter((media) => {
                    if (!media || !media.title) return false

                    const { romaji, english, native, userPreferred } = media.title

                    return [romaji, english, native, userPreferred].some((title) =>
                        title?.toLowerCase().includes(input.toLowerCase())
                    )
                })
            }

            return filteredData
        },
    })

    const handleCheck = (type: MediaType, checked: boolean) => {
        setTypeFilter({ ...typeFilter, [`${type}`]: checked })
    }

    // debouce the fetching
    useDebounce(
        () => {
            refetch()
        },
        800,
        [input, typeFilter]
    )

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value)
    }

    const closeMenu = () => {
        setInput("")
        setExpand(false)
        setTypeFilter({ "VISUAL NOVEL": false, MANGA: true, ANIME: true })
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
                                minWidth: anchorEl.current.clientWidth
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
                                isLoading={isLoading}
                                data={data}
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
