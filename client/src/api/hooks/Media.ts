import * as Types from '../../types';

import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
export type MediaQueryVariables = Types.Exact<{
  perPage?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  type?: Types.InputMaybe<Types.MediaType>;
}>;


export type MediaQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', media?: Array<{ __typename?: 'Media', id: number, type?: Types.MediaType | null, episodes?: number | null, chapters?: number | null, season?: Types.MediaSeason | null, seasonYear?: number | null, status?: Types.MediaStatus | null, genres?: Array<string | null> | null, title?: { __typename?: 'MediaTitle', romaji?: string | null, english?: string | null, native?: string | null, userPreferred?: string | null } | null, coverImage?: { __typename?: 'MediaCoverImage', extraLarge?: string | null, large?: string | null, medium?: string | null, color?: string | null } | null } | null> | null } | null };


export const MediaDocument = `
    query Media($perPage: Int, $search: String, $type: MediaType) {
  Page(perPage: $perPage) {
    media(isAdult: false, type: $type, search: $search, sort: SEARCH_MATCH) {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      type
      episodes
      chapters
      season
      seasonYear
      status
      genres
      coverImage {
        extraLarge
        large
        medium
        color
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