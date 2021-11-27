import { AUTH_LOGIN_FETCH, AUTH_LOGIN_FETCH_FULFILLED, AUTH_LOGIN_FETCH_REJECTED, State } from './types'
import produce from 'immer'
import FetchingState from 'src/interfaces/FetchingState'
import { AuthLoginRes } from 'project-finder-backend-types'

const initialState: State = {
  accessToken: null,
  refreshToken: null,
  state: FetchingState.Idle,
  fetchError: null
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
      const { data } = payload as { data: string }
      draft.state = FetchingState.Error
      draft.fetchError = data
      break
    }
    default:
      break
  }
}, initialState)
