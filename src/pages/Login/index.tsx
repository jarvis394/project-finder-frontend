import React, { useState } from 'react'
import Login from './Login'
import Password from './Password'

type Step = 'login' | 'password'
interface LoginValuesObject {
  login: string
  password: string
}
export interface StepProps {
  values: LoginValuesObject
  setValues: React.Dispatch<React.SetStateAction<LoginValuesObject>>
}

const StepLoginForm: React.FC<{ step: Step }> = ({ step }) => {
  const [values, setValues] = useState<LoginValuesObject>({
    login: '',
    password: '',
  })

  return (
    <>
      {step === 'login' && <Login values={values} setValues={setValues} />}
      {step === 'password' && (
        <Password values={values} setValues={setValues} />
      )}
    </>
  )
}

export default React.memo(StepLoginForm)
