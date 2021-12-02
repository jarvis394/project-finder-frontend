interface APIErrorObject {
  errorCode: number
  msg: string
}

type APIError = APIErrorObject[]

export default APIError
