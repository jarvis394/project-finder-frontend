import { AxiosRequestConfig } from 'axios'
import { axiosInstance } from '.'

interface MakeRequestProps {
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
}: MakeRequestProps): Promise<T> => {
  return (
    await axiosInstance({
      method: requestOptions?.method || 'get',
      url: path,
      ...requestOptions,
    })
  ).data as T
}
