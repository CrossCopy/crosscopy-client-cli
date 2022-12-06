import {requests as req} from '@crosscopy/graphql-schema';
import {GraphQLClient} from 'graphql-request';

// TODO: consider moving the following functions to @crosscopy/core package as it's used frequently in multiple packages
export const generateGraphQLClient = (url: string, token?: string | null): GraphQLClient => {
  let headers = {};
  if (token)
    headers = {
      Authorization: token,
    };
  const gqlClient = new GraphQLClient(url, {
    headers,
  });
  return gqlClient;
};

export const generateSDK = (
  url: string,
  token?: string | null,
): ReturnType<typeof req.getSdk> => {
  return req.getSdk(generateGraphQLClient(url, token));
};
