import * as Types from '../../types';

import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
export type AnimeCharacterQueryVariables = Types.Exact<{
  perPage?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type AnimeCharacterQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', pageInfo?: { __typename: 'PageInfo', currentPage?: number | null, hasNextPage?: boolean | null, lastPage?: number | null, perPage?: number | null, total?: number | null } | null } | null };


export const AnimeCharacterDocument = `
    query AnimeCharacter($perPage: Int) {
  Page(perPage: $perPage) {
    pageInfo {
      currentPage
      hasNextPage
      lastPage
      perPage
      total
      __typename
    }
  }
}
    `;
export const useAnimeCharacterQuery = <
      TData = AnimeCharacterQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AnimeCharacterQueryVariables,
      options?: UseQueryOptions<AnimeCharacterQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AnimeCharacterQuery, TError, TData>(
      variables === undefined ? ['AnimeCharacter'] : ['AnimeCharacter', variables],
      fetcher<AnimeCharacterQuery, AnimeCharacterQueryVariables>(client, AnimeCharacterDocument, variables, headers),
      options
    );