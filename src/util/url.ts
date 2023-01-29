export function socketioUrl(serverUrl: string): string {
  return `${serverUrl}/clipboard`;
}

export function graphqlUrl(serverUrl: string): string {
  return `${serverUrl}/graphql`;
}

export function subscriptionUrl(serverUrl: string): string {
  const wsProtocol = serverUrl.slice(0, 5) === 'https' ? 'wss' : 'ws';  // use wss when https enabled for encryption
  return `${wsProtocol}://${serverUrl.split('//')[1]}/graphql`;
}
