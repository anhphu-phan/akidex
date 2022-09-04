import { MediaFormat, MediaSeason } from "types"

export function capitalize(s: string) {
    return s[0].toUpperCase() + s.slice(1).toLocaleLowerCase()
}

export function getAnimeFormats() {
    return [
        MediaFormat.Movie,
        MediaFormat.Music,
        MediaFormat.Tv,
        MediaFormat.TvShort,
        MediaFormat.Ova,
        MediaFormat.Ona,
        MediaFormat.Special,
    ]
}

export function getCurrentSeasonName(): MediaSeason {
    // current season !== current anime season
    // current anime season = current season - 1 season
    const date = new Date()
    const currentMonth = date.getUTCMonth()

    if (currentMonth <= 2) return MediaSeason.Spring
    if (currentMonth <= 5) return MediaSeason.Summer
    if (currentMonth <= 8) return MediaSeason.Fall

    return MediaSeason.Winter
}

export function getCurrentAnimeSeason(): { season: MediaSeason; year: number } {
    const currentSeason = getCurrentSeasonName()
    let currentAnimeSeason: MediaSeason
    let year: number = new Date().getUTCFullYear()

    if (currentSeason === MediaSeason.Spring) {
        currentAnimeSeason = MediaSeason.Winter
        year = new Date().getUTCFullYear() - 1
    } else if (currentSeason === MediaSeason.Summer) {
        currentAnimeSeason = MediaSeason.Spring
    } else if (currentSeason === MediaSeason.Fall) {
        currentAnimeSeason = MediaSeason.Summer
    } else {
        currentAnimeSeason = MediaSeason.Fall
    }

    return { season: currentAnimeSeason, year }
}
