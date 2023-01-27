export function socketioUrl(serverUrl: string): string {
  return `${serverUrl}/clipboard`;
}

export function graphqlUrl(serverUrl: string): string {
  return `${serverUrl}/graphql`;
}

export function subscriptionUrl(serverUrl: string): string {
  return `ws://${serverUrl.split('//')[1]}/graphql`;
}
