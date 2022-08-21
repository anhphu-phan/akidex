interface Links {
    /** Name of the related article on the English Wikipedia (deprecated, use wikidata instead). */
    wikipedia?: string
    /** The URL-encoded tag used on {@link http://novelnews.net/ encubed} (deprecated). */
    encubed?: string
    /** The name part of the url on {@link http://renai.us/ renai.us.} */
    renai?: string
    /** Wikidata identifier. */
    wikidata?: string
}

/** (Possibly empty) list of anime related to the VN */
interface VNAnime {
    /** {@link http://anidb.net/ AniDB} ID. */
    id: number
    /** {@link http://animenewsnetwork.com/ AnimeNewsNetwork} ID. */
    ann_id?: string
    /** {@link http://animenfo.com/ AnimeNfo} ID. */
    nfo_id?: string
    title_romaji?: string
    title_kanji?: string
    /** Year in which the anime was aired */
    year?: string
    type?: string
}

/**
 * Represented as an array with three elements:
 * - tag id (integer),
 * - score (number between 0 and 3),
 * - spoiler level (integer, 0=none, 1=minor, 2=major)
 *
 * Only tags with a positive score are included. Note that this list may be relatively large - more than 50 tags for a VN is quite possible.
 *
 * General information for each tag is available in the {@link https://vndb.org/d14#2 tags dump}. Keep in mind that it is possible that a tag has only recently been added and is not available in the dump yet, though this doesn't happen often.
 */
type Tags = [number, number, number]

/** List of related visual novels. */
interface Relations {
    id: number
    /** Relation to the VN. */
    relation: string
    /** (romaji) title. */
    title: string
    /** Original/official title. */
    original: string
    official: boolean
}

/** Image flagging summary of the main VN image.*/
interface ImageFlagging {
    /** Number of flagging votes. */
    votecount: number
    /** Sexual score between 0 (safe) and 2 (explicit). */
    sexual_avg?: number
    /** Violence score between 0 (tame) and 2 (brutal). */
    violence_avg?: number
}

/** List of screenshots. */
interface Screens {
    /** URL of the full-size screenshot. */
    image: string
    /** Release ID */
    rid: number
    /** @deprecate */
    nsfw: boolean
    flagging: ImageFlagging
    /** Height of the full-size screenshot */
    height: number
    /** Width of the full-size screenshot */
    width: number
}

/** List of staff related to the VN */
interface Staff {
    /** Staff ID */
    sid: number
    /** Alias ID */
    aid: number
    name: string
    original?: string
    role: string
    note?: string
}

interface VisualNovel {
    /** Visual novel ID */
    id: number
    /** Main title */
    title: string
    /** Original/official title. */
    original?: string
    /** Date of the first release.
     *
     * A string signifying a date (in particular: release date).
     * The following formats are used: "yyyy" (when day and month are unknown),
     * "yyyy-mm" (when day is unknown) "yyyy-mm-dd", and "tba" (To Be Announced).
     * If the year is not known and the date is not "tba", the special value null is used. */
    released?: string
    /** Can be an empty array when nothing has been released yet. */
    languages: string[]
    /** Original language of the VN. Always contains a single language, */
    orig_lang: string[]
    /** Can be an empty array when unknown or nothing has been released yet. */
    platforms: string[]
    /** Aliases, separated by newlines. */
    aliases?: string
    /** Length of the game, 1-5 */
    length?: number
    /** Description of the VN. Can include formatting codes as described in {@link https://vndb.org/d9#3 d9#3}. */
    description?: string
    links: Links
    /** HTTP link to the VN image. */
    image?: string
    /** (deprecated) Whether the VN image is flagged as NSFW or not. */
    image_nsfw: boolean
    /** Image flagging summary of the main VN image.*/
    image_flagging?: ImageFlagging
    /** (Possibly empty) list of anime related to the VN */
    anime: VNAnime | Record<string, never>
    /** (Possibly empty) list of related visual novels. */
    relations: Relations[] | Record<string, never>
    tags: Tags[] | Record<string, never>
    /** Between 0 (unpopular) and 100 (most popular). */
    popularity: number
    /** Bayesian rating, between 1 and 10. */
    rating: number
    /** Number of votes. */
    votecount: number
    screen: Screens[] | Record<string, never>
    /** List of staff related to the VN */
    staff: Staff[] | Record<string, never>
}

export type { Links, VNAnime, ImageFlagging, Relations, Screens, Staff, Tags, VisualNovel }
