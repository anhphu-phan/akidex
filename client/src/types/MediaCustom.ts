import { MediaQuery } from "api/hooks/Media"

type Page = Exclude<MediaQuery["Page"], null | undefined>
export type Media = Exclude<Exclude<Page["media"], null | undefined>[0], null>
export type MediaRank = Exclude<Media['rankings'], null | undefined>[0]