export const parseJWTToken = (jwtToken: string) => {
  const encodedPayload = jwtToken.split('.')[1];
  const decoded = Buffer.from(encodedPayload, 'base64').toString();
  return JSON.parse(decoded);
};

// TODO: think about linking this to server so that updates to type of Role/DB and AccessToken is automatically updated here
// Keep it like this for now
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type AccessToken = {
  id: number;
  activated: boolean;
  email: string;
  recordQuota: number;
  role: Role;
  tokenVersion: string;
  username: string;
  connectionQuota: number;
  // this is used to uniquely identify the logging sessions of a single user, preventing sending message back to the sender
  // will be embeded into access token
  sessionId: string;
};
