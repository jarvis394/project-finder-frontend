import * as api from 'src/api'
import {
  PROFILE_FETCH,
  PROFILE_FETCH_REJECTED,
  PROFILE_FETCH_FULFILLED,
  PROFILE_SET_USER,
} from 'src/store/reducers/profile/types'
import { Dispatch } from 'redux'
import { User } from 'project-finder-backend-types'

export const getMe = () => async (dispatch: Dispatch) => {
  dispatch({ type: PROFILE_FETCH })

  try {
    const data = await api.user.me()

    dispatch({
      type: PROFILE_FETCH_FULFILLED,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROFILE_FETCH_REJECTED,
      payload: { error },
    })
  }
}

export const setUser = (user: User) => async (dispatch: Dispatch) => {
  dispatch({ type: PROFILE_SET_USER, payload: user })
}
