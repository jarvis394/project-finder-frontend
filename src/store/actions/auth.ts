import * as api from 'src/api'
import {
  AUTH_LOGIN_FETCH,
  AUTH_LOGIN_FETCH_FULFILLED,
  AUTH_LOGIN_FETCH_REJECTED,
  AUTH_LOGIN_FLUSH_ERRORED_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
} from 'src/store/reducers/auth/types'
import getBrowserFingerprint from 'get-browser-fingerprint'
import { Dispatch } from 'redux'

interface AuthLoginParams {
  login: string
  password: string
}

export const login =
  (params: AuthLoginParams) => async (dispatch: Dispatch) => {
    const { login, password } = params
    const fingerprint = getBrowserFingerprint()
    dispatch({ type: AUTH_LOGIN_FETCH })

    try {
      const data = await api.user.login(login, password, fingerprint)

      dispatch({
        type: AUTH_LOGIN_FETCH_FULFILLED,
        payload: { ...data },
      })
    } catch (error) {
      dispatch({
        type: AUTH_LOGIN_FETCH_REJECTED,
        payload: { error },
      })
    }
  }

export const refreshToken = ({
  accessToken,
  refreshToken: refreshTokenValue,
  expires,
}: {
  accessToken: string
  refreshToken: string
  expires: number
}) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: AUTH_REFRESH_TOKEN,
      payload: { accessToken, refreshToken: refreshTokenValue, expires },
    })
  }
}

export const flushErroredLogin = () => async (dispatch: Dispatch) => {
  dispatch({ type: AUTH_LOGIN_FLUSH_ERRORED_LOGIN })
}

export const logout = () => async (dispatch: Dispatch) => {
  dispatch({ type: AUTH_LOGOUT })
}
