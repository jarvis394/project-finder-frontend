import {
  AUTH_LOGIN_FETCH,
  AUTH_LOGIN_FETCH_FULFILLED,
  AUTH_LOGIN_FETCH_REJECTED,
  AUTH_LOGIN_FLUSH_ERRORED_LOGIN,
  AUTH_REFRESH_TOKEN,
  AUTH_LOGOUT,
  State,
} from './types'
import produce from 'immer'
import FetchingState from 'src/interfaces/FetchingState'
import { AuthLoginRes } from 'project-finder-backend-types'
import { AxiosError } from 'axios'
import APIError from 'src/interfaces/APIError'
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_EXPIRE_KEY,
} from 'src/config/constants'

const initialAuthData = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  tokenExpire: Number(localStorage.getItem(TOKEN_EXPIRE_KEY)),
}

const initialState: State = {
  ...initialAuthData,
  state: FetchingState.Idle,
  fetchError: null,
  isLoggedIn: !!initialAuthData.accessToken,
}

interface AuthErrorResponse {
  error: AxiosError<APIError>
}

export default produce((draft, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN_FETCH:
      draft.state = FetchingState.Fetching
      break
    case AUTH_LOGIN_FETCH_FULFILLED: {
      const { accessToken, refreshToken, expires } = payload as AuthLoginRes
      draft.state = FetchingState.Fetched
      draft.accessToken = accessToken
      draft.refreshToken = refreshToken
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
      localStorage.setItem(TOKEN_EXPIRE_KEY, expires.toString())
      break
    }
    case AUTH_LOGIN_FETCH_REJECTED: {
      const { error } = payload as AuthErrorResponse
      draft.state = FetchingState.Error
      draft.fetchError = error.response.data
      break
    }
    case AUTH_LOGIN_FLUSH_ERRORED_LOGIN: {
      draft.state = FetchingState.Idle
      draft.fetchError = null
      break
    }
    case AUTH_REFRESH_TOKEN: {
      const { accessToken, refreshToken, expires } = payload as AuthLoginRes
      draft.accessToken = accessToken
      draft.refreshToken = refreshToken
      draft.tokenExpire = expires
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
      localStorage.setItem(TOKEN_EXPIRE_KEY, expires.toString())
      break
    }
    case AUTH_LOGOUT: {
      draft.accessToken = null
      draft.refreshToken = null
      draft.tokenExpire = null
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(TOKEN_EXPIRE_KEY)
      break
    }
    default:
      break
  }
}, initialState)
