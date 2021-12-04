import {
  alpha,
  styled,
  Box,
  Typography,
  CircularProgress,
  Backdrop,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Input from 'src/components/blocks/Input'
import { BUTTON_MAX_WIDTH } from 'src/config/constants'
import { StepProps } from '.'
import { useNavigate } from 'react-router'
import { useForm, SubmitHandler } from 'react-hook-form'
import Avatar from 'src/components/blocks/Avatar'
import { LoadingButton } from '@mui/lab'
import { register as apiUserRegister } from 'src/api/user'
import { UserRegisterRes } from 'project-finder-backend-types'
import FetchingState from 'src/interfaces/FetchingState'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { useSelector } from 'src/hooks'
import { flushErroredLogin, login as loginAction } from 'src/store/actions/auth'
import { ERROR_MAP } from 'src/config/errorCodes'
import { AxiosError } from 'axios'
import APIError from 'src/interfaces/APIError'

interface FormInput {
  email: string
  telegram: string
  website: string
}

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  flex: 2,
  maxHeight: 'calc(100vh - 56px)',
  flexDirection: 'column',
  margin: 'auto',
})
const ColumnContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: '100%',
  maxWidth: BUTTON_MAX_WIDTH,
}))

const Contacts: React.FC<StepProps> = ({ values, setValues }) => {
  const { register, handleSubmit } = useForm<FormInput>({
    shouldFocusError: true,
  })
  const { enqueueSnackbar } = useSnackbar()
  const [registerFetchingState, setRegisterFetchingState] =
    useState<FetchingState>(FetchingState.Idle)
  const [registerResponseData, setRegisterResponseData] =
    useState<UserRegisterRes>()
  const authFetchingState = useSelector((store) => store.auth.state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<FormInput> = React.useCallback(
    async (data) => {
      setValues((prev) => ({
        ...prev,
        contacts: {
          email: data.email,
          telegram: data.telegram,
          website: data.website,
        },
      }))

      // Make API call for registering the user
      try {
        setRegisterFetchingState(FetchingState.Fetching)
        const registerResponse = await apiUserRegister({
          username: values.login,
          name: values.name,
          lastname: values.lastname,
          skillTags: values.skillTags,
          password: values.password,
          birthDate: values.birthDate,
          gender: values.gender,
          contact: data,
          location: values.location,
        })
        setRegisterResponseData(registerResponse)
        setRegisterFetchingState(FetchingState.Fetched)
        dispatch(
          loginAction({ login: values.login, password: values.password })
        )
      } catch (e) {
        const { response } = e as AxiosError<APIError>
        setRegisterFetchingState(FetchingState.Error)
        response.data.forEach((e) =>
          enqueueSnackbar(ERROR_MAP[e.errorCode], {
            variant: 'error',
          })
        )
      }
    },
    [values]
  )

  useEffect(() => {
    setRegisterFetchingState(FetchingState.Idle)
  }, [])

  useEffect(() => {
    if (authFetchingState === FetchingState.Fetched) {
      navigate('/projects')
    } else if (authFetchingState === FetchingState.Error) {
      // FIXME: we actually need to show the errors because
      // it is unusual if a newly registered user would have problems
      // with password or login
      enqueueSnackbar(ERROR_MAP[7], {
        variant: 'error',
      })
      dispatch(flushErroredLogin())
    }
  }, [authFetchingState])

  useEffect(() => {
    if (!values.login) return navigate('/register')
  }, [])

  if (!values.login) return null

  return (
    <Root>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: 'column',
          gap: (theme) => theme.spacing(2),
        }}
        open={authFetchingState === FetchingState.Fetching}
      >
        <CircularProgress color="inherit" />
        <Typography fontWeight="bold">Авторизируемся на сервере...</Typography>
      </Backdrop>
      <ColumnContainer onSubmit={handleSubmit(onSubmit)} autoComplete="on">
        <Box
          sx={{
            justifyContent: 'center',
            display: 'flex',
            width: '100%',
            mb: 4,
          }}
        >
          <Avatar uid={values.login || 'a'} letter={(values.name || 'a')[0]} />
        </Box>
        <Input
          {...register('email', { required: true })}
          placeholder="Электропочта"
          type="text"
          autoComplete="email"
        />
        <Input
          {...register('telegram', { required: true })}
          placeholder="Телеграм"
          type="text"
        />
        <Input
          {...register('website', { required: false })}
          placeholder="Веб-сайт"
          type="text"
        />
        <LoadingButton
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          loading={registerFetchingState === FetchingState.Fetching}
        >
          Зарегистрироваться
        </LoadingButton>
        <Typography
          sx={{
            mt: 4,
            color: (theme) => alpha(theme.palette.text.primary, 0.5),
            fontSize: 14,
            textAlign: 'center',
          }}
        >
          Регистрируясь, вы предоставляете свои данные несовершеннолетним
          школьникам-хакерам
        </Typography>
      </ColumnContainer>
    </Root>
  )
}

export default React.memo(Contacts)
