let BASE_RESTFUL,BASE_GRAPHQL
// eslint-disable-next-line
if ($BUILD_TARGET$ === 'production') {
  BASE_RESTFUL = 'https://api.ruiyun2015.com'
  BASE_GRAPHQL = 'https://gql.ruiyun2015.com'
} else {
  BASE_RESTFUL = 'https://api-dev.ruiyun2015.com'
  BASE_GRAPHQL = 'https://gql-dev.ruiyun2015.com'
}

export const DEMO_RESTFUL_ENDPOINT = BASE_RESTFUL + '/demo'
export const DEMO_GRAPHQL_ENDPOINT = BASE_GRAPHQL + '/demo'
