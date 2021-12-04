import * as api from 'src/api'
import { axiosInstance } from 'src/api'
import { Store, AnyAction } from 'redux'
import { RootState } from 'src/store'
import getBrowserFingerprint from 'get-browser-fingerprint'
import {
  logout,
  refreshToken as refreshTokenAction,
} from 'src/store/actions/auth'
import { AxiosError, AxiosRequestConfig } from 'axios'

interface CustomAxiosError extends AxiosError {
  config: AxiosRequestConfig & { _retry: boolean }
}

const setup = (store: Store<RootState>) => {
  const { dispatch, getState } = store

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.accessToken
      if (token) config.headers['Authorization'] = 'Bearer ' + token
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  axiosInstance.interceptors.response.use(
    (res) => {
      return res
    },
    async (err: CustomAxiosError) => {
      const originalConfig = err.config
      const urlsWithoutAuth = ['user/login', 'user/register']

      if (
        !urlsWithoutAuth.some((e) => e === originalConfig.url) &&
        err.response
      ) {
        // Invalid token
        if (err.response.data.some((e) => e.errorCode === 1)) {
          dispatch(logout() as unknown as AnyAction)
          return Promise.reject(null)
        }
        // Access token was expired
        else if (
          err.response.data.some((e) => e.errorCode === 3) &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true

          try {
            const localRefreshToken = getState().auth.refreshToken
            const fingerprint = getBrowserFingerprint()
            const res = await api.auth.refreshToken({
              refreshToken: localRefreshToken,
              fingerPrint: fingerprint,
            })
            const { accessToken, refreshToken, expires } = res

            dispatch(
              refreshTokenAction({
                accessToken,
                refreshToken,
                expires,
              }) as unknown as AnyAction
            )

            return axiosInstance(originalConfig)
          } catch (_error) {
            dispatch(logout() as unknown as AnyAction)
            return Promise.reject(_error)
          }
        }
      }

      return Promise.reject(err)
    }
  )
}

export default setup
