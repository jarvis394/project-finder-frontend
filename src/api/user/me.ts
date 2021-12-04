import { AuthLoginRes } from 'project-finder-backend-types'
import makeRequest from '../makeRequest'

export default async () =>
  await makeRequest<AuthLoginRes>({
    path: 'user/me',
    requestOptions: {
      method: 'GET',
    },
  })
