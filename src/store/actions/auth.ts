import * as api from 'src/api'
import {
  AUTH_LOGIN_FETCH,
  AUTH_LOGIN_FETCH_FULFILLED,
  AUTH_LOGIN_FETCH_REJECTED,
} from 'src/store/reducers/auth/types'
// import browserSignature from 'browser-signature'

interface AuthLoginParams {
  login: string
  password: string
}

export const login = (params: AuthLoginParams) => async (dispatch) => {
  const { login, password } = params
  const fingerprint = 'jvhgvjhj'
  dispatch({ type: AUTH_LOGIN_FETCH })

  try {
    const data = await api.login(login, password, fingerprint)

    dispatch({
      type: AUTH_LOGIN_FETCH_FULFILLED,
      payload: { ...data },
    })
  } catch (error) {
    dispatch({
      type: AUTH_LOGIN_FETCH_REJECTED,
      payload: { data: error },
    })
  }
}
