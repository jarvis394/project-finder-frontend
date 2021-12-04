import { useSelector } from '.'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { getMe } from 'src/store/actions/profile'

const useFetchMe = () => {
  const accessToken = useSelector((store) => store.auth.accessToken)
  const me = useSelector((store) => store.profile.data)
  const shouldFetchMe = useMemo(() => !me && accessToken, [me, accessToken])
  const dispatch = useDispatch()

  useEffect(() => {
    if (shouldFetchMe) dispatch(getMe())
  }, [shouldFetchMe])
}

export default useFetchMe
