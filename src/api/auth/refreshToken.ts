import {
  AuthRefreshTokenReq,
  AuthRefreshTokenRes,
} from 'project-finder-backend-types'
import makeRequest from '../makeRequest'

export default async ({ refreshToken, fingerPrint }: AuthRefreshTokenReq) =>
  await makeRequest<AuthRefreshTokenRes>({
    path: 'auth/refresh_token',
    requestOptions: {
      method: 'POST',
      data: {
        refreshToken,
        fingerPrint,
      },
    },
  })
