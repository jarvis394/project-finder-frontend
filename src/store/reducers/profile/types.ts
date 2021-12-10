import { Project, User } from 'project-finder-backend-types'
import APIError from 'src/interfaces/APIError'
import FetchingState from 'src/interfaces/FetchingState'

export const PROFILE_PREFIX = 'PROFILE_'
export const PROFILE_FETCH = PROFILE_PREFIX + 'FETCH'
export const PROFILE_FETCH_FULFILLED = PROFILE_PREFIX + 'FETCH_FULFILLED'
export const PROFILE_FETCH_REJECTED = PROFILE_PREFIX + 'FETCH_REJECTED'
export const PROFILE_SET_USER = PROFILE_PREFIX + 'SET_USER'

interface UserState extends User {
  projects: Omit<Project, 'user'>[]
}
export interface State {
  data: UserState
  state: FetchingState
  fetchError: APIError
}
