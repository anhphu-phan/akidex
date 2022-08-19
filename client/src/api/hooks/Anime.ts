import * as Types from '../../types';

import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
export type AnimesQueryVariables = Types.Exact<{
  perPage?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type AnimesQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', pageInfo?: { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null } | null, media?: Array<{ __typename?: 'Media', id: number, episodes?: number | null, season?: Types.MediaSeason | null, seasonYear?: number | null, status?: Types.MediaStatus | null, genres?: Array<string | null> | null, type?: Types.MediaType | null, coverImage?: { __typename?: 'MediaCoverImage', extraLarge?: string | null, large?: string | null, medium?: string | null, color?: string | null } | null } | null> | null } | null };


export const AnimesDocument = `
    query Animes($perPage: Int, $search: String) {
  Page(perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(type: ANIME, sort: POPULARITY, search: $search) {
      id
      episodes
      season
      seasonYear
      status
      genres
      type
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
export const useAnimesQuery = <
      TData = AnimesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AnimesQueryVariables,
      options?: UseQueryOptions<AnimesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AnimesQuery, TError, TData>(
      variables === undefined ? ['Animes'] : ['Animes', variables],
      fetcher<AnimesQuery, AnimesQueryVariables>(client, AnimesDocument, variables, headers),
      options
    );