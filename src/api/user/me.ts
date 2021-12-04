import { UserGetSelfInfoRes } from 'project-finder-backend-types'
import makeRequest from '../makeRequest'

export default async () =>
  await makeRequest<UserGetSelfInfoRes>({
    path: 'user/me',
    requestOptions: {
      method: 'GET',
    },
  })
