import Ajax from '@ruiyun/ajax'
import { useEffect, useState, useReducer } from 'preact/compat'
import { DEMO_GRAPHQL_ENDPOINT, DEMO_RESTFUL_ENDPOINT } from '../constants/apis'

export default class RequestClient {
  constructor(formatFn, baseUrl) {
    this.formatFn = formatFn
    this.baseUrl = baseUrl
  }

  get = async (path, params, loading, catchErr) => {
    const url = this.baseUrl + path
    try {
      const ret = await Ajax.get(url, {
        params,
        headers: {
          loading: loading === false ? 'false' : 'true',
          catch: catchErr,
        },
      })
      return this.formatFn(ret)
    } catch (error) {
      return {
        success: false,
        error,
      }
    }
  }

  post = async (path, params, loading, catchErr) => {
    const url = this.baseUrl + path
    try {
      const ret = await Ajax.post(url, params, {
        headers: {
          loading: loading === false ? 'false' : 'true',
          catch: catchErr,
        },
      })
      return this.formatFn(ret)
    } catch (error) {
      return {
        success: false,
        error,
      }
    }
  }

  gql = async (query, params, loading, catchErr) => {
    try {
      const ret = await Ajax.post(
        this.baseUrl,
        {
          query,
          variables: params,
        },
        {
          headers: {
            loading: loading === false ? 'false' : 'true',
            catch: catchErr,
          },
        }
      )
      return this.formatFn(ret)
    } catch (error) {
      return {
        success: false,
        error,
      }
    }
  }
}

export const RestfulClient = new RequestClient((ret) => {
  let response = { success: false }
  if (ret.success) {
    response = {
      success: true,
      data: ret.result,
    }
  } else {
    response.error = ret.message
    response.data = ret.result
  }
  return response
}, DEMO_RESTFUL_ENDPOINT)

export const GraphQLClient = new RequestClient((ret) => {
  let response = { success: false }
  if (ret.errors && ret.errors.length) {
    response.error = ret.errors[0]
  } else {
    const { result } = ret.data
    if (result) {
      response = {
        success: true,
        data: result,
      }
    } else {
      response.error = '未获取到数据'
    }
  }
  return response
}, DEMO_GRAPHQL_ENDPOINT)

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      throw new Error()
  }
}

export const useRestfulClient = (url, method = 'post') => (
  initialParams,
  initialData
) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    error: null,
    data: initialData,
  })
  const [params, updateParams] = useState(initialParams)
  useEffect(() => {
    let didCancel = false
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      const { success, data, error } = await RestfulClient[method](
        url,
        params,
        false
      )
      if (!didCancel) {
        if (success) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data })
        } else {
          dispatch({ type: 'FETCH_FAILURE', payload: error })
        }
      }
    }
    fetchData()
    return () => {
      didCancel = true
    }
  }, [params])
  return [state, updateParams]
}
