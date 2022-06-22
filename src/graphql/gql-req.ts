import {GraphQLClient} from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Upload: any
}

export type AddRecordResponse = {
  __typename?: 'AddRecordResponse'
  id: Scalars['Int']
  message: Scalars['String']
  record: Rec
  success: Scalars['Boolean']
}

export type DeleteRecordResponse = {
  __typename?: 'DeleteRecordResponse'
  message: Scalars['String']
  success: Scalars['Boolean']
}

export type File = {
  __typename?: 'File'
  encoding: Scalars['String']
  filename: Scalars['String']
  mimetype: Scalars['String']
}

export type LoginResponse = {
  __typename?: 'LoginResponse'
  accessToken: Scalars['String']
  message: Scalars['String']
  success: Scalars['Boolean']
  user: User
}

export type Mutation = {
  __typename?: 'Mutation'
  addFileRecord?: Maybe<AddRecordResponse>
  addProfile?: Maybe<UpdateProfileResponse>
  addRecord?: Maybe<AddRecordResponse>
  deleteProfile?: Maybe<UpdateProfileResponse>
  deleteRecord?: Maybe<DeleteRecordResponse>
  login?: Maybe<LoginResponse>
  register?: Maybe<RegisterResponse>
  renameProfile?: Maybe<RenameProfileResponse>
  sendEmailOwnershipVerificationCode?: Maybe<StandardResponse>
  singleUpload: File
  updateRecord?: Maybe<UpdateRecordResponse>
  verifyEmailOwnership?: Maybe<VerifyEmailOwnershipResponse>
}

export type MutationAddFileRecordArgs = {
  device: Scalars['String']
  file: Scalars['Upload']
  profile: Scalars['String']
  type: RecordType
  value: Scalars['String']
}

export type MutationAddProfileArgs = {
  profile: Scalars['String']
}

export type MutationAddRecordArgs = {
  device: Scalars['String']
  profile: Scalars['String']
  type: RecordType
  value: Scalars['String']
}

export type MutationDeleteProfileArgs = {
  profile: Scalars['String']
}

export type MutationDeleteRecordArgs = {
  inUserId: Scalars['Int']
}

export type MutationLoginArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationRegisterArgs = {
  code: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type MutationRenameProfileArgs = {
  newProfile: Scalars['String']
  originalProfile: Scalars['String']
}

export type MutationSendEmailOwnershipVerificationCodeArgs = {
  email: Scalars['String']
  username: Scalars['String']
}

export type MutationSingleUploadArgs = {
  file: Scalars['Upload']
}

export type MutationUpdateRecordArgs = {
  inUserId: Scalars['Int']
  newValue: Scalars['String']
}

export type MutationVerifyEmailOwnershipArgs = {
  code: Scalars['String']
  email: Scalars['String']
  username: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  emailExists?: Maybe<Scalars['Boolean']>
  me?: Maybe<User>
  online?: Maybe<Scalars['Boolean']>
  records?: Maybe<Array<Maybe<Rec>>>
  recordsLaterThanId?: Maybe<Array<Maybe<Rec>>>
  userByEmail?: Maybe<User>
  userById?: Maybe<User>
  usernameExists?: Maybe<Scalars['Boolean']>
}

export type QueryEmailExistsArgs = {
  email: Scalars['String']
}

export type QueryRecordsLaterThanIdArgs = {
  id: Scalars['Int']
}

export type QueryUserByEmailArgs = {
  email: Scalars['String']
}

export type QueryUserByIdArgs = {
  id: Scalars['String']
}

export type QueryUsernameExistsArgs = {
  username: Scalars['String']
}

export type Rec = {
  __typename?: 'Rec'
  createdAt?: Maybe<Scalars['String']>
  deleted: Scalars['Boolean']
  device: Scalars['String']
  expired: Scalars['Boolean']
  id: Scalars['ID']
  inUserId: Scalars['Int']
  profile: Scalars['String']
  type: RecordType
  userId: Scalars['String']
  value: Scalars['String']
}

export enum RecordType {
  Image = 'IMAGE',
  Text = 'TEXT',
}

export type RegisterResponse = {
  __typename?: 'RegisterResponse'
  message: Scalars['String']
  success: Scalars['Boolean']
}

export type RenameProfileResponse = {
  __typename?: 'RenameProfileResponse'
  message: Scalars['String']
  success: Scalars['Boolean']
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type StandardResponse = {
  __typename?: 'StandardResponse'
  message: Scalars['String']
  success: Scalars['Boolean']
}

export type UpdateProfileResponse = {
  __typename?: 'UpdateProfileResponse'
  message: Scalars['String']
  success: Scalars['Boolean']
}

export type UpdateRecordResponse = {
  __typename?: 'UpdateRecordResponse'
  message: Scalars['String']
  record: Rec
  success: Scalars['Boolean']
}

export type User = {
  __typename?: 'User'
  activated: Scalars['Boolean']
  createdAt?: Maybe<Scalars['String']>
  email: Scalars['String']
  id: Scalars['ID']
  lastRecordId: Scalars['Int']
  profiles?: Maybe<Array<Maybe<Scalars['String']>>>
  recordCount: Scalars['Int']
  recordQuota: Scalars['Int']
  records?: Maybe<Array<Maybe<Rec>>>
  role: Role
  username: Scalars['String']
}

export type VerifyEmailOwnershipResponse = {
  __typename?: 'VerifyEmailOwnershipResponse'
  chanceLeft: Scalars['Int']
  message: Scalars['String']
  success: Scalars['Boolean']
}

export type EmailExistsQueryVariables = Exact<{
  email: Scalars['String']
}>

export type EmailExistsQuery = {
  __typename?: 'Query'
  emailExists?: boolean | null
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'LoginResponse'
    accessToken: string
    success: boolean
    message: string
    user: {
      __typename?: 'User'
      id: string
      username: string
      email: string
      createdAt?: string | null
      profiles?: Array<string | null> | null
      role: Role
      recordCount: number
      lastRecordId: number
      recordQuota: number
      activated: boolean
      records?: Array<{
        __typename?: 'Rec'
        id: string
        inUserId: number
        userId: string
        value: string
        type: RecordType
        profile: string
        createdAt?: string | null
        device: string
      } | null> | null
    }
  } | null
}

export type OnlineQueryVariables = Exact<{[key: string]: never}>

export type OnlineQuery = {__typename?: 'Query'; online?: boolean | null}

export type SignupMutationVariables = Exact<{
  username: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
  code: Scalars['String']
}>

export type SignupMutation = {
  __typename?: 'Mutation'
  register?: {
    __typename?: 'RegisterResponse'
    success: boolean
    message: string
  } | null
}

export type SendEmailOwnershipVerificationCodeMutationVariables = Exact<{
  username: Scalars['String']
  email: Scalars['String']
}>

export type SendEmailOwnershipVerificationCodeMutation = {
  __typename?: 'Mutation'
  sendEmailOwnershipVerificationCode?: {
    __typename?: 'StandardResponse'
    success: boolean
    message: string
  } | null
}

export type UsernameExistsQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UsernameExistsQuery = {
  __typename?: 'Query'
  usernameExists?: boolean | null
}

export type VerifyEmailOwnershipMutationVariables = Exact<{
  username: Scalars['String']
  email: Scalars['String']
  code: Scalars['String']
}>

export type VerifyEmailOwnershipMutation = {
  __typename?: 'Mutation'
  verifyEmailOwnership?: {
    __typename?: 'VerifyEmailOwnershipResponse'
    success: boolean
    message: string
    chanceLeft: number
  } | null
}

export type AddRecordMutationVariables = Exact<{
  type: RecordType
  value: Scalars['String']
  device: Scalars['String']
  profile: Scalars['String']
}>

export type AddRecordMutation = {
  __typename?: 'Mutation'
  addRecord?: {
    __typename?: 'AddRecordResponse'
    success: boolean
    message: string
    id: number
    record: {
      __typename?: 'Rec'
      id: string
      inUserId: number
      userId: string
      value: string
      type: RecordType
      profile: string
      createdAt?: string | null
      device: string
    }
  } | null
}

export type DeleteRecordMutationVariables = Exact<{
  inUserId: Scalars['Int']
}>

export type DeleteRecordMutation = {
  __typename?: 'Mutation'
  deleteRecord?: {
    __typename?: 'DeleteRecordResponse'
    success: boolean
    message: string
  } | null
}

export type FetchRecordsQueryVariables = Exact<{[key: string]: never}>

export type FetchRecordsQuery = {
  __typename?: 'Query'
  records?: Array<{
    __typename?: 'Rec'
    id: string
    inUserId: number
    userId: string
    value: string
    type: RecordType
    profile: string
    createdAt?: string | null
    device: string
  } | null> | null
}

export type AddProfileMutationVariables = Exact<{
  profile: Scalars['String']
}>

export type AddProfileMutation = {
  __typename?: 'Mutation'
  addProfile?: {
    __typename?: 'UpdateProfileResponse'
    success: boolean
    message: string
  } | null
}

export type DeleteProfileMutationVariables = Exact<{
  profile: Scalars['String']
}>

export type DeleteProfileMutation = {
  __typename?: 'Mutation'
  deleteProfile?: {
    __typename?: 'UpdateProfileResponse'
    success: boolean
    message: string
  } | null
}

export type RenameProfileMutationVariables = Exact<{
  originalProfile: Scalars['String']
  newProfile: Scalars['String']
}>

export type RenameProfileMutation = {
  __typename?: 'Mutation'
  renameProfile?: {
    __typename?: 'RenameProfileResponse'
    success: boolean
    message: string
  } | null
}

export const EmailExistsDocument = gql`
  query emailExists($email: String!) {
    emailExists(email: $email)
  }
`
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      success
      message
      user {
        id
        username
        email
        createdAt
        profiles
        records {
          id
          inUserId
          userId
          value
          type
          profile
          createdAt
          device
        }
        role
        recordCount
        lastRecordId
        recordQuota
        activated
      }
    }
  }
`
export const OnlineDocument = gql`
  query online {
    online
  }
`
export const SignupDocument = gql`
  mutation signup(
    $username: String!
    $email: String!
    $password: String!
    $code: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      code: $code
    ) {
      success
      message
    }
  }
`
export const SendEmailOwnershipVerificationCodeDocument = gql`
  mutation sendEmailOwnershipVerificationCode(
    $username: String!
    $email: String!
  ) {
    sendEmailOwnershipVerificationCode(username: $username, email: $email) {
      success
      message
    }
  }
`
export const UsernameExistsDocument = gql`
  query usernameExists($username: String!) {
    usernameExists(username: $username)
  }
`
export const VerifyEmailOwnershipDocument = gql`
  mutation verifyEmailOwnership(
    $username: String!
    $email: String!
    $code: String!
  ) {
    verifyEmailOwnership(username: $username, email: $email, code: $code) {
      success
      message
      chanceLeft
    }
  }
`
export const AddRecordDocument = gql`
  mutation AddRecord(
    $type: RecordType!
    $value: String!
    $device: String!
    $profile: String!
  ) {
    addRecord(type: $type, value: $value, device: $device, profile: $profile) {
      record {
        id
        inUserId
        userId
        value
        type
        profile
        createdAt
        device
      }
      success
      message
      id
    }
  }
`
export const DeleteRecordDocument = gql`
  mutation deleteRecord($inUserId: Int!) {
    deleteRecord(inUserId: $inUserId) {
      success
      message
    }
  }
`
export const FetchRecordsDocument = gql`
  query fetchRecords {
    records {
      id
      inUserId
      userId
      value
      type
      profile
      createdAt
      device
    }
  }
`
export const AddProfileDocument = gql`
  mutation addProfile($profile: String!) {
    addProfile(profile: $profile) {
      success
      message
    }
  }
`
export const DeleteProfileDocument = gql`
  mutation deleteProfile($profile: String!) {
    deleteProfile(profile: $profile) {
      success
      message
    }
  }
`
export const RenameProfileDocument = gql`
  mutation renameProfile($originalProfile: String!, $newProfile: String!) {
    renameProfile(originalProfile: $originalProfile, newProfile: $newProfile) {
      success
      message
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    emailExists(
      variables: EmailExistsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<EmailExistsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EmailExistsQuery>(EmailExistsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'emailExists',
        'query',
      )
    },
    login(
      variables: LoginMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<LoginMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LoginMutation>(LoginDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'login',
        'mutation',
      )
    },
    online(
      variables?: OnlineQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<OnlineQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<OnlineQuery>(OnlineDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'online',
        'query',
      )
    },
    signup(
      variables: SignupMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<SignupMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SignupMutation>(SignupDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'signup',
        'mutation',
      )
    },
    sendEmailOwnershipVerificationCode(
      variables: SendEmailOwnershipVerificationCodeMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<SendEmailOwnershipVerificationCodeMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SendEmailOwnershipVerificationCodeMutation>(
            SendEmailOwnershipVerificationCodeDocument,
            variables,
            {...requestHeaders, ...wrappedRequestHeaders},
          ),
        'sendEmailOwnershipVerificationCode',
        'mutation',
      )
    },
    usernameExists(
      variables: UsernameExistsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UsernameExistsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UsernameExistsQuery>(
            UsernameExistsDocument,
            variables,
            {...requestHeaders, ...wrappedRequestHeaders},
          ),
        'usernameExists',
        'query',
      )
    },
    verifyEmailOwnership(
      variables: VerifyEmailOwnershipMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<VerifyEmailOwnershipMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<VerifyEmailOwnershipMutation>(
            VerifyEmailOwnershipDocument,
            variables,
            {...requestHeaders, ...wrappedRequestHeaders},
          ),
        'verifyEmailOwnership',
        'mutation',
      )
    },
    AddRecord(
      variables: AddRecordMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<AddRecordMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddRecordMutation>(AddRecordDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'AddRecord',
        'mutation',
      )
    },
    deleteRecord(
      variables: DeleteRecordMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteRecordMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteRecordMutation>(
            DeleteRecordDocument,
            variables,
            {...requestHeaders, ...wrappedRequestHeaders},
          ),
        'deleteRecord',
        'mutation',
      )
    },
    fetchRecords(
      variables?: FetchRecordsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<FetchRecordsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FetchRecordsQuery>(FetchRecordsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'fetchRecords',
        'query',
      )
    },
    addProfile(
      variables: AddProfileMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<AddProfileMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddProfileMutation>(AddProfileDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'addProfile',
        'mutation',
      )
    },
    deleteProfile(
      variables: DeleteProfileMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteProfileMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteProfileMutation>(
            DeleteProfileDocument,
            variables,
            {...requestHeaders, ...wrappedRequestHeaders},
          ),
        'deleteProfile',
        'mutation',
      )
    },
    renameProfile(
      variables: RenameProfileMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<RenameProfileMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RenameProfileMutation>(
            RenameProfileDocument,
            variables,
            {...requestHeaders, ...wrappedRequestHeaders},
          ),
        'renameProfile',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
