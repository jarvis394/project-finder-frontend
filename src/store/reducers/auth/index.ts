import { AUTH_LOGIN_FETCH, AUTH_LOGIN_FETCH_FULFILLED, AUTH_LOGIN_FETCH_REJECTED, AUTH_LOGIN_FLUSH_ERRORED_LOGIN, State } from './types'
import produce from 'immer'
import FetchingState from 'src/interfaces/FetchingState'
import { AuthLoginRes } from 'project-finder-backend-types'
import { AxiosError } from 'axios'
import AuthLoginError from 'src/interfaces/AuthLoginError'

const initialState: State = {
  accessToken: null,
  refreshToken: null,
  state: FetchingState.Idle,
  fetchError: null
}

interface AuthErrorResponse {
  error: AxiosError<AuthLoginError>
}

export default produce((draft, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN_FETCH:
      draft.state = FetchingState.Fetching
      break
    case AUTH_LOGIN_FETCH_FULFILLED: {
      const { accessToken, refreshToken } = payload as AuthLoginRes
      draft.state = FetchingState.Fetched
      draft.accessToken = accessToken
      draft.refreshToken = refreshToken
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
    default:
      break
  }
}, initialState)
