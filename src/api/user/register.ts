import { UserRegisterReq, UserRegisterRes } from 'project-finder-backend-types'
import makeRequest from '../makeRequest'

export default async (user: UserRegisterReq) =>
  await makeRequest<UserRegisterRes>({
    path: 'user/register',
    requestOptions: {
      method: 'POST',
      data: user
    },
  })
