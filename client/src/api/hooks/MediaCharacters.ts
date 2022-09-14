import * as Types from '../../types';

import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
export type MediaCharactersQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type MediaCharactersQuery = { __typename?: 'Query', Media?: { __typename?: 'Media', id: number, characters?: { __typename?: 'CharacterConnection', pageInfo?: { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null } | null, edges?: Array<{ __typename?: 'CharacterEdge', id?: number | null, role?: Types.CharacterRole | null, name?: string | null, voiceActorRoles?: Array<{ __typename?: 'StaffRoleType', roleNotes?: string | null, dubGroup?: string | null, voiceActor?: { __typename?: 'Staff', id: number, language?: string | null, name?: { __typename?: 'StaffName', userPreferred?: string | null } | null, image?: { __typename?: 'StaffImage', large?: string | null } | null } | null } | null> | null, node?: { __typename?: 'Character', id: number, name?: { __typename?: 'CharacterName', userPreferred?: string | null } | null, image?: { __typename?: 'CharacterImage', large?: string | null } | null } | null } | null> | null } | null } | null };


export const MediaCharactersDocument = `
    query MediaCharacters($id: Int, $page: Int) {
  Media(id: $id) {
    id
    characters(page: $page, sort: [ROLE, RELEVANCE, ID]) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        id
        role
        name
        voiceActorRoles(sort: [RELEVANCE, ID]) {
          roleNotes
          dubGroup
          voiceActor {
            id
            name {
              userPreferred
            }
            language: languageV2
            image {
              large
            }
          }
        }
        node {
          id
          name {
            userPreferred
          }
          image {
            large
          }
        }
      }
    }
  }
}
    `;
export const useMediaCharactersQuery = <
      TData = MediaCharactersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MediaCharactersQueryVariables,
      options?: UseQueryOptions<MediaCharactersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MediaCharactersQuery, TError, TData>(
      variables === undefined ? ['MediaCharacters'] : ['MediaCharacters', variables],
      fetcher<MediaCharactersQuery, MediaCharactersQueryVariables>(client, MediaCharactersDocument, variables, headers),
      options
    );
export const useInfiniteMediaCharactersQuery = <
      TData = MediaCharactersQuery,
      TError = unknown
    >(
      _pageParamKey: keyof MediaCharactersQueryVariables,
      client: GraphQLClient,
      variables?: MediaCharactersQueryVariables,
      options?: UseInfiniteQueryOptions<MediaCharactersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<MediaCharactersQuery, TError, TData>(
      variables === undefined ? ['MediaCharacters.infinite'] : ['MediaCharacters.infinite', variables],
      (metaData) => fetcher<MediaCharactersQuery, MediaCharactersQueryVariables>(client, MediaCharactersDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );
