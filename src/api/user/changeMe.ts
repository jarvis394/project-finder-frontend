import {
  UserSetSelfInfoRes,
  UserSetSelfInfoReq,
} from 'project-finder-backend-types'
import makeRequest from '../makeRequest'

export default async (user: UserSetSelfInfoReq) =>
  await makeRequest<UserSetSelfInfoRes>({
    path: 'user/me',
    requestOptions: {
      method: 'POST',
      data: user,
    },
  })
