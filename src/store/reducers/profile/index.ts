import {
  PROFILE_FETCH,
  PROFILE_FETCH_FULFILLED,
  PROFILE_FETCH_REJECTED,
  State,
} from './types'
import produce from 'immer'
import FetchingState from 'src/interfaces/FetchingState'
import { UserGetSelfInfoRes } from 'project-finder-backend-types'
import { AxiosError } from 'axios'
import APIError from 'src/interfaces/APIError'

const initialState: State = {
  data: null,
  state: FetchingState.Idle,
  fetchError: null,
}

interface AuthErrorResponse {
  error: AxiosError<APIError>
}

export default produce((draft, { type, payload }) => {
  switch (type) {
    case PROFILE_FETCH:
      draft.state = FetchingState.Fetching
      break
    case PROFILE_FETCH_FULFILLED: {
      draft.state = FetchingState.Fetched
      draft.data = payload as UserGetSelfInfoRes
      break
    }
    case PROFILE_FETCH_REJECTED: {
      const { error } = payload as AuthErrorResponse
      draft.state = FetchingState.Error
      draft.fetchError = error.response.data
      break
    }
    default:
      break
  }
}, initialState)
