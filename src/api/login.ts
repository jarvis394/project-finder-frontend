import { AuthLoginRes } from 'project-finder-backend-types'
import makeRequest from './makeRequest'

export default async (login: string, password: string, fingerprint: string) =>
  await makeRequest<AuthLoginRes>({
    path: 'auth/login',
    requestOptions: {
      method: 'POST',
      data: {
        username: login,
        password,
        fingerPrint: fingerprint,
      },
    },
  })
