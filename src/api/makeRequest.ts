import axios, { AxiosRequestConfig } from 'axios'
import { API_URL } from 'src/config/constants'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

interface Arguments {
  /** API method as an URL path */
  path: string

  /** Query parameters */
  params?: Record<string, string>

  /** Axios request options */
  requestOptions?: AxiosRequestConfig
}

export default async <T = never>({
  path,
  requestOptions,
}: Arguments): Promise<T> => {
  return (
    await axios({
      method: requestOptions?.method || 'get',
      url: API_URL + path,
      cancelToken: source.token,
      ...requestOptions,
    })
  ).data as T
}
