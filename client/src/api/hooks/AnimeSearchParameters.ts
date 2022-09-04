import * as Types from '../../types';

import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
export type AnimeSearchParametersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AnimeSearchParametersQuery = { __typename?: 'Query', genres?: Array<string | null> | null, tags?: Array<{ __typename?: 'MediaTag', name: string, description?: string | null, category?: string | null, isAdult?: boolean | null } | null> | null, Media?: { __typename?: 'Media', startDate?: { __typename?: 'FuzzyDate', year?: number | null } | null } | null };


export const AnimeSearchParametersDocument = `
    query AnimeSearchParameters {
  genres: GenreCollection
  tags: MediaTagCollection {
    name
    description
    category
    isAdult
  }
  Media(startDate_greater: 18000000, sort: START_DATE) {
    startDate {
      year
    }
  }
}
    `;
export const useAnimeSearchParametersQuery = <
      TData = AnimeSearchParametersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AnimeSearchParametersQueryVariables,
      options?: UseQueryOptions<AnimeSearchParametersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AnimeSearchParametersQuery, TError, TData>(
      variables === undefined ? ['AnimeSearchParameters'] : ['AnimeSearchParameters', variables],
      fetcher<AnimeSearchParametersQuery, AnimeSearchParametersQueryVariables>(client, AnimeSearchParametersDocument, variables, headers),
      options
    );