import * as api from 'src/api'
import {
  PROFILE_FETCH,
  PROFILE_FETCH_REJECTED,
  PROFILE_FETCH_FULFILLED,
} from 'src/store/reducers/profile/types'
import { Dispatch } from 'redux'

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
