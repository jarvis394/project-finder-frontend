import * as api from 'src/api'
import {
  AUTH_LOGIN_FETCH,
  AUTH_LOGIN_FETCH_FULFILLED,
  AUTH_LOGIN_FETCH_REJECTED,
  AUTH_LOGIN_FLUSH_ERRORED_LOGIN,
} from 'src/store/reducers/auth/types'
import getBrowserFingerprint from 'get-browser-fingerprint'

interface AuthLoginParams {
  login: string
  password: string
}

export const login = (params: AuthLoginParams) => async (dispatch) => {
  const { login, password } = params
  const fingerprint = getBrowserFingerprint()
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
      payload: { error },
    })
  }
}

export const flushErroredLogin = () => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_FLUSH_ERRORED_LOGIN })
}
