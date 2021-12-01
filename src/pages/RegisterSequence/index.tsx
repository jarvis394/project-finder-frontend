import React, { useState } from 'react'
import useQuery from 'src/hooks/useQuery'
import AuthData from './AuthData'
import Contacts from './Contacts'
import PersonData from './PersonData'

interface RegisterValuesObject {
  login: string
  password: string
  name: string
  lastname: string
  gender: boolean
  birthDate: string
  location: string
  contacts: {
    email: string
    telegram: string
    website: string
  }
}
export interface StepProps {
  values: RegisterValuesObject
  setValues: React.Dispatch<React.SetStateAction<RegisterValuesObject>>
}

const StepRegisterForm: React.FC = () => {
  const query = useQuery()
  const step = query.get('step')
  const [values, setValues] = useState<RegisterValuesObject>({
    login: null,
    password: null,
    name: null,
    lastname: null,
    gender: null,
    birthDate: null,
    location: null,
    contacts: {
      email: null,
      telegram: null,
      website: null,
    },
  })

  return (
    <>
      {!step && <AuthData values={values} setValues={setValues} />}
      {step === 'person' && (
        <PersonData values={values} setValues={setValues} />
      )}
      {step === 'contacts' && (
        <Contacts values={values} setValues={setValues} />
      )}
    </>
  )
}

export default React.memo(StepRegisterForm)
