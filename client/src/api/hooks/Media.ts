import * as Types from '../../types';

import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
export type MediaQueryVariables = Types.Exact<{
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  perPage?: Types.InputMaybe<Types.Scalars['Int']>;
  id?: Types.InputMaybe<Types.Scalars['Int']>;
  type?: Types.InputMaybe<Types.MediaType>;
  isAdult?: Types.InputMaybe<Types.Scalars['Boolean']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  format?: Types.InputMaybe<Array<Types.InputMaybe<Types.MediaFormat>> | Types.InputMaybe<Types.MediaFormat>>;
  status?: Types.InputMaybe<Types.MediaStatus>;
  countryOfOrigin?: Types.InputMaybe<Types.Scalars['CountryCode']>;
  source?: Types.InputMaybe<Types.MediaSource>;
  season?: Types.InputMaybe<Types.MediaSeason>;
  seasonYear?: Types.InputMaybe<Types.Scalars['Int']>;
  year?: Types.InputMaybe<Types.Scalars['String']>;
  onList?: Types.InputMaybe<Types.Scalars['Boolean']>;
  yearLesser?: Types.InputMaybe<Types.Scalars['FuzzyDateInt']>;
  yearGreater?: Types.InputMaybe<Types.Scalars['FuzzyDateInt']>;
  episodeLesser?: Types.InputMaybe<Types.Scalars['Int']>;
  episodeGreater?: Types.InputMaybe<Types.Scalars['Int']>;
  durationLesser?: Types.InputMaybe<Types.Scalars['Int']>;
  durationGreater?: Types.InputMaybe<Types.Scalars['Int']>;
  chapterLesser?: Types.InputMaybe<Types.Scalars['Int']>;
  chapterGreater?: Types.InputMaybe<Types.Scalars['Int']>;
  volumeLesser?: Types.InputMaybe<Types.Scalars['Int']>;
  volumeGreater?: Types.InputMaybe<Types.Scalars['Int']>;
  licensedBy?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['Int']>> | Types.InputMaybe<Types.Scalars['Int']>>;
  isLicensed?: Types.InputMaybe<Types.Scalars['Boolean']>;
  genres?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
  excludedGenres?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
  tags?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
  excludedTags?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
  minimumTagRank?: Types.InputMaybe<Types.Scalars['Int']>;
  sort?: Types.InputMaybe<Array<Types.InputMaybe<Types.MediaSort>> | Types.InputMaybe<Types.MediaSort>>;
}>;


export type MediaQuery = { __typename: 'Query', Page?: { __typename: 'Page', pageInfo?: { __typename: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null } | null, media?: Array<{ __typename: 'Media', id: number, bannerImage?: string | null, season?: Types.MediaSeason | null, seasonYear?: number | null, description?: string | null, type?: Types.MediaType | null, format?: Types.MediaFormat | null, status?: Types.MediaStatus | null, episodes?: number | null, duration?: number | null, chapters?: number | null, volumes?: number | null, genres?: Array<string | null> | null, isAdult?: boolean | null, averageScore?: number | null, meanScore?: number | null, popularity?: number | null, title?: { __typename?: 'MediaTitle', userPreferred?: string | null, romaji?: string | null } | null, coverImage?: { __typename?: 'MediaCoverImage', medium?: string | null, extraLarge?: string | null, large?: string | null, color?: string | null } | null, startDate?: { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null } | null, endDate?: { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null } | null, rankings?: Array<{ __typename?: 'MediaRank', id: number, rank: number, type: Types.MediaRankType, year?: number | null, allTime?: boolean | null, context: string } | null> | null, recommendations?: { __typename?: 'RecommendationConnection', edges?: Array<{ __typename?: 'RecommendationEdge', node?: { __typename?: 'Recommendation', id: number, mediaRecommendation?: { __typename?: 'Media', id: number, type?: Types.MediaType | null, chapters?: number | null, episodes?: number | null, title?: { __typename?: 'MediaTitle', userPreferred?: string | null } | null, coverImage?: { __typename?: 'MediaCoverImage', large?: string | null } | null } | null } | null } | null> | null } | null, tags?: Array<{ __typename?: 'MediaTag', id: number, name: string, description?: string | null } | null> | null, nextAiringEpisode?: { __typename?: 'AiringSchedule', airingAt: number, timeUntilAiring: number, episode: number } | null, mediaListEntry?: { __typename?: 'MediaList', id: number, status?: Types.MediaListStatus | null } | null, studios?: { __typename?: 'StudioConnection', edges?: Array<{ __typename?: 'StudioEdge', isMain: boolean, node?: { __typename?: 'Studio', id: number, name: string } | null } | null> | null } | null } | null> | null } | null };


export const MediaDocument = `
    query Media($page: Int = 1, $perPage: Int = 20, $id: Int, $type: MediaType, $isAdult: Boolean = false, $search: String, $format: [MediaFormat], $status: MediaStatus, $countryOfOrigin: CountryCode, $source: MediaSource, $season: MediaSeason, $seasonYear: Int, $year: String, $onList: Boolean, $yearLesser: FuzzyDateInt, $yearGreater: FuzzyDateInt, $episodeLesser: Int, $episodeGreater: Int, $durationLesser: Int, $durationGreater: Int, $chapterLesser: Int, $chapterGreater: Int, $volumeLesser: Int, $volumeGreater: Int, $licensedBy: [Int], $isLicensed: Boolean, $genres: [String], $excludedGenres: [String], $tags: [String], $excludedTags: [String], $minimumTagRank: Int, $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {
  __typename
  Page(page: $page, perPage: $perPage) {
    __typename
    pageInfo {
      __typename
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(
      id: $id
      type: $type
      season: $season
      format_in: $format
      status: $status
      countryOfOrigin: $countryOfOrigin
      source: $source
      search: $search
      onList: $onList
      seasonYear: $seasonYear
      startDate_like: $year
      startDate_lesser: $yearLesser
      startDate_greater: $yearGreater
      episodes_lesser: $episodeLesser
      episodes_greater: $episodeGreater
      duration_lesser: $durationLesser
      duration_greater: $durationGreater
      chapters_lesser: $chapterLesser
      chapters_greater: $chapterGreater
      volumes_lesser: $volumeLesser
      volumes_greater: $volumeGreater
      licensedById_in: $licensedBy
      isLicensed: $isLicensed
      genre_in: $genres
      genre_not_in: $excludedGenres
      tag_in: $tags
      tag_not_in: $excludedTags
      minimumTagRank: $minimumTagRank
      sort: $sort
      isAdult: $isAdult
    ) {
      __typename
      id
      title {
        userPreferred
        romaji
      }
      coverImage {
        medium
        extraLarge
        large
        color
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      bannerImage
      season
      seasonYear
      description
      type
      format
      status(version: 2)
      episodes
      duration
      chapters
      volumes
      genres
      isAdult
      averageScore
      meanScore
      popularity
      rankings {
        id
        rank
        type
        year
        allTime
        context
      }
      recommendations {
        edges {
          node {
            id
            mediaRecommendation {
              id
              title {
                userPreferred
              }
              type
              chapters
              episodes
              coverImage {
                large
              }
            }
          }
        }
      }
      tags {
        id
        name
        description
      }
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      mediaListEntry {
        id
        status
      }
      studios(isMain: true) {
        edges {
          isMain
          node {
            id
            name
          }
        }
      }
    }
  }
}
    `;
export const useMediaQuery = <
      TData = MediaQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MediaQueryVariables,
      options?: UseQueryOptions<MediaQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MediaQuery, TError, TData>(
      variables === undefined ? ['Media'] : ['Media', variables],
      fetcher<MediaQuery, MediaQueryVariables>(client, MediaDocument, variables, headers),
      options
    );