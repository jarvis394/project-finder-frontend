import APIError from 'src/interfaces/APIError'
import FetchingState from 'src/interfaces/FetchingState'

export const AUTH_PREFIX = 'AUTH_'
export const AUTH_LOGIN_FETCH = AUTH_PREFIX + 'LOGIN_FETCH'
export const AUTH_LOGIN_FETCH_FULFILLED = AUTH_PREFIX + 'LOGIN_FETCH_FULFILLED'
export const AUTH_LOGIN_FETCH_REJECTED = AUTH_PREFIX + 'LOGIN_FETCH_REJECTED'
export const AUTH_LOGIN_FLUSH_ERRORED_LOGIN = AUTH_PREFIX + 'LOGIN_FLUSH_ERRORED_LOGIN'
export interface State {
  accessToken: string
  refreshToken: string
  state: FetchingState
  fetchError: APIError
}
