import {
  PROFILE_FETCH,
  PROFILE_FETCH_FULFILLED,
  PROFILE_FETCH_REJECTED,
  PROFILE_SET_USER,
  State,
} from './types'
import produce from 'immer'
import FetchingState from 'src/interfaces/FetchingState'
import { UserGetSelfInfoRes } from 'project-finder-backend-types'
import { AxiosError } from 'axios'
import APIError from 'src/interfaces/APIError'
import { ERROR_MAP } from 'src/config/errorCodes'

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
      draft.data = { ...payload }
      break
    }
    case PROFILE_FETCH_REJECTED: {
      const { error } = payload as AuthErrorResponse
      draft.state = FetchingState.Error
      draft.fetchError = error?.response?.data || [
        {
          errorCode: 1,
          msg: ERROR_MAP[1],
        },
      ]
      break
    }
    case PROFILE_SET_USER: {
      draft.state = FetchingState.Fetched
      draft.data = payload
      draft.fetchError = null
      break
    }
    default:
      break
  }
}, initialState)
