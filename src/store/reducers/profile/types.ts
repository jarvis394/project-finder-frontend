import { User } from 'project-finder-backend-types'
import APIError from 'src/interfaces/APIError'
import FetchingState from 'src/interfaces/FetchingState'

export const PROFILE_PREFIX = 'PROFILE_'
export const PROFILE_FETCH = PROFILE_PREFIX + 'FETCH'
export const PROFILE_FETCH_FULFILLED = PROFILE_PREFIX + 'FETCH_FULFILLED'
export const PROFILE_FETCH_REJECTED = PROFILE_PREFIX + 'FETCH_REJECTED'
export interface State {
  data: User
  state: FetchingState
  fetchError: APIError
}
