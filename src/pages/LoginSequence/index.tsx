import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'src/hooks'
import useQuery from 'src/hooks/useQuery'
import Login from './Login'
import Password from './Password'

interface LoginValuesObject {
  login: string
  password: string
}
export interface StepProps {
  values: LoginValuesObject
  setValues: React.Dispatch<React.SetStateAction<LoginValuesObject>>
}

const StepLoginForm: React.FC = () => {
  const query = useQuery()
  const step = query.get('step')
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn)
  const navigate = useNavigate()
  const [values, setValues] = useState<LoginValuesObject>({
    login: '',
    password: '',
  })

  useEffect(() => {
    if (isLoggedIn) navigate('/projects')
  }, [isLoggedIn])

  return (
    <>
      {!step && <Login values={values} setValues={setValues} />}
      {step === 'password' && (
        <Password values={values} setValues={setValues} />
      )}
    </>
  )
}

export default React.memo(StepLoginForm)
