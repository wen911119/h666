import { GraphQLClient } from '../libs/request'

import { SEND_CODE } from '../constants/gql'

export const getCAPTCHA = (phone) =>
  GraphQLClient.gql(SEND_CODE, { mobile: phone }, false, 'all')

