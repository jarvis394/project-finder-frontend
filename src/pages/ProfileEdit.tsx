import React, { useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  IconButton,
  Box,
  alpha,
  Paper as MUIPaper,
  Autocomplete,
  FormHelperText,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  useScrollTrigger,
  Backdrop,
  CircularProgress,
} from '@mui/material'
import {
  Icon20Check as SubmitIcon,
  Icon28ArrowLeftOutline as ArrowLeftIcon,
} from '@vkontakte/icons'
import {
  CARD_MAX_WIDTH,
  MAX_INFORMATION_LENGTH,
  SKILL_TAGS,
} from 'src/config/constants'
import UploadAvatar from 'src/components/blocks/UploadAvatar'
import TextField from 'src/components/blocks/TextField'
import { useSelector } from 'src/hooks'
import FetchingState from 'src/interfaces/FetchingState'
import { Link, Navigate } from 'react-router-dom'
import Spinner from 'src/components/blocks/Spinner'
import UploadCover from 'src/components/blocks/UploadCover'
import { SkillTagNames } from 'project-finder-backend-types'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { LocalizationProvider, DatePicker } from '@mui/lab'
import AdapterDayjs from '@mui/lab/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import * as api from 'src/api'
import { useDispatch } from 'react-redux'
import { setUser } from 'src/store/actions/profile'
import { AxiosError } from 'axios'
import APIError from 'src/interfaces/APIError'
import { useSnackbar } from 'notistack'
import { ERROR_MAP } from 'src/config/errorCodes'
import { Icon24MailOutline } from '@vkontakte/icons'
import { Icon24SendOutline } from '@vkontakte/icons'
import { Icon24GlobeOutline } from '@vkontakte/icons'

interface FormInput {
  name: string
  lastname: string
  information: string
  gender: 'male' | 'female'
  birthDate: Dayjs
  location: string
  contact: {
    email: string
    telegram: string
    website: string
  }
}

const EmailIcon = styled(Icon24MailOutline)(({ theme }) => ({
  color: theme.palette.secondary.main,
}))
const TelegramIcon = styled(Icon24SendOutline)(({ theme }) => ({
  color: theme.palette.secondary.main,
}))
const WebsiteIcon = styled(Icon24GlobeOutline)(({ theme }) => ({
  color: theme.palette.secondary.main,
}))
const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'elevated',
})<{ elevated: boolean }>(({ theme, elevated }) => ({
  minHeight: '56px !important',
  height: '56px !important',
  color: theme.palette.text.primary,
  background: theme.palette.background.paper,
  boxShadow: elevated
    ? '0 1px 16px 0 ' + alpha(theme.palette.text.primary, 0.05)
    : 'none',
}))
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '56px !important',
  height: '56px !important',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}))
const Title = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'Google Sans',
  fontSize: 20,
  fontWeight: 500,
  flexGrow: 1,
  lineHeight: 1.45,
  height: '100%',
  marginLeft: theme.spacing(1),
}))
const Offset = styled('div')(({ theme }) => ({
  height: 56,
  display: 'flex',
  flexShrink: 0,
  marginBottom: theme.spacing(2),
}))
const Paper = styled(MUIPaper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: 'none',
  borderRadius: 12,
  width: '100%',
  [theme.breakpoints.up(CARD_MAX_WIDTH)]: {
    boxShadow: '0 0 0 1px ' + alpha(theme.palette.text.primary, 0.01)
  }
}))
const SubheaderText = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontFamily: 'Google Sans',
  fontWeight: 500,
  color: alpha(theme.palette.text.primary, 0.38),
}))
const Root = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})
const Container = styled(Box)({
  margin: 'auto',
  width: '100%',
  maxWidth: CARD_MAX_WIDTH,
  display: 'flex',
  flexDirection: 'column',
})

const ElevationScroll = (props: { children: React.ReactElement }) => {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window,
  })

  return React.cloneElement(children, {
    elevated: trigger,
  })
}

const PageAppBar = () => (
  <>
    <ElevationScroll>
      <StyledAppBar elevated={false} position="fixed">
        <StyledToolbar>
          <Link to="/profile" style={{ borderRadius: '50%' }}>
            <IconButton color="default" aria-label="back">
              <ArrowLeftIcon width={28} height={28} />
            </IconButton>
          </Link>
          <Title>Профиль</Title>
          <IconButton type="submit" color="primary" aria-label="save">
            <SubmitIcon width={28} height={28} />
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>
    </ElevationScroll>
    <Offset />
  </>
)
const SpinnerBox = () => (
  <Box
    sx={{
      display: 'flex',
      width: '100%',
      height: 'calc(100vh - 56px - 56px)',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Spinner
      sx={{ color: (theme) => theme.palette.primary.main }}
      width={44}
      height={44}
    />
  </Box>
)
const ProfileEdit = () => {
  const profile = useSelector((store) => store.profile.data)
  const profileState = useSelector((store) => store.profile.state)
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn)
  const {
    register,
    handleSubmit,
    control,
    formState,
    setValue,
    setError,
    clearErrors,
  } = useForm<FormInput>({
    shouldFocusError: true,
    defaultValues: {
      birthDate: dayjs(profile?.birthDate),
    },
  })
  const information = useWatch({
    control,
    name: 'information',
    defaultValue: profile?.information || '',
  })
  const birthDate = useWatch({
    control,
    name: 'birthDate',
    defaultValue: dayjs(profile?.birthDate),
  })
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setLoading] = React.useState<boolean>(false)
  const [skillTags, setSkillTags] = React.useState<SkillTagNames[]>(
    profile ? profile.skillTags.map((e) => e.label) : []
  )
  const [skillTagsInputValue, setSkillTagsInputValue] = React.useState('')
  const handleFormSubmit: SubmitHandler<FormInput> = async (data) => {
    const { birthDate, gender, ...newData } = data
    const newProfileData = {
      ...profile,
      ...newData,
      gender: gender === 'female',
      birthDate: (birthDate as Dayjs).format(),
      skillTags: skillTags.map((e) => ({ label: e })),
    }

    setLoading(true)
    try {
      await api.user.changeMe(newProfileData)

      // If changeMe request errored, local data won't be changed
      // because catch block will fire after errored request
      dispatch(setUser(newProfileData))
    } catch (_e) {
      const e = _e as AxiosError<APIError>
      if (e?.response?.data) {
        e.response.data.forEach((el) =>
          enqueueSnackbar(ERROR_MAP[el.errorCode], {
            variant: 'error',
          })
        )
      } else if (e instanceof Error) {
        enqueueSnackbar(e.message, {
          variant: 'error',
        })
      }
    }
    setLoading(false)
  }
  const handleDateChange = (newValue: Dayjs) => {
    setValue('birthDate', newValue)
  }
  const handleDateError = (error: unknown) => {
    if (error)
      setError('birthDate', {
        type: 'value',
        message: 'Incorrect value',
      })
    else clearBirthDateErrors()
  }
  const clearBirthDateErrors = () =>
    formState.errors && clearErrors('birthDate')

  useEffect(() => {
    if (profile && profileState === FetchingState.Fetched) {
      if (skillTags.length === 0 && profile?.skillTags?.length != 0) {
        setSkillTags(profile?.skillTags?.map((e) => e.label))
      }
      profile.birthDate && setValue('birthDate', dayjs(profile.birthDate))
    }
  }, [profile, profile?.skillTags, profileState, skillTags.length])

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <Root onSubmit={handleSubmit(handleFormSubmit)}>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: 'column',
          gap: (theme) => theme.spacing(2),
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <PageAppBar />
      {profileState === FetchingState.Fetching && <SpinnerBox />}
      {profileState === FetchingState.Fetched && (
        <Container>
          <Paper>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: (theme) => theme.spacing(2),
              }}
            >
              <UploadAvatar />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <TextField
                  {...register('name')}
                  placeholder="Имя"
                  defaultValue={profile.name}
                  InputProps={{
                    sx: {
                      borderBottomLeftRadius: '0 !important',
                      borderBottomRightRadius: '0 !important',
                    },
                  }}
                />
                <TextField
                  {...register('lastname')}
                  placeholder="Фамилия"
                  defaultValue={profile.lastname}
                  sx={{
                    marginTop: '-1px',
                  }}
                  InputProps={{
                    sx: {
                      borderTopLeftRadius: '0 !important',
                      borderTopRightRadius: '0 !important',
                    },
                  }}
                />
              </Box>
            </Box>
            <SubheaderText sx={{ mt: 2, mb: 1.5 }}>Обложка</SubheaderText>
            <UploadCover />
          </Paper>
          <Paper>
            <SubheaderText>Навыки</SubheaderText>
            <Autocomplete
              multiple
              autoHighlight
              value={skillTags}
              onChange={(_, newValue) => {
                setSkillTags(newValue as SkillTagNames[])
              }}
              inputValue={skillTagsInputValue}
              onInputChange={(_, newInputValue) => {
                setSkillTagsInputValue(newInputValue)
              }}
              id="skills"
              options={SKILL_TAGS}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  sx={{ mt: 1.5 }}
                  name="skills"
                />
              )}
            />
          </Paper>
          <Paper>
            <SubheaderText>Контакты</SubheaderText>
            <Stack spacing={2} sx={{ mt: 1.5 }}>
              <Stack spacing={1.5} direction="row" alignItems="center">
                <EmailIcon />
                <TextField
                  {...register('contact.email', { required: true })}
                  placeholder="Электропочта"
                  defaultValue={profile.contact.email}
                />
              </Stack>
              <Stack spacing={1.5} direction="row" alignItems="center">
                <TelegramIcon />
                <TextField
                  {...register('contact.telegram', { required: true })}
                  placeholder="Telegram"
                  defaultValue={profile.contact.telegram}
                />
              </Stack>
              <Stack spacing={1.5} direction="row" alignItems="center">
                <WebsiteIcon />
                <TextField
                  {...register('contact.website')}
                  placeholder="Сайт"
                  defaultValue={profile.contact.website}
                />
              </Stack>
            </Stack>
          </Paper>
          <Paper>
            <SubheaderText>Информация</SubheaderText>
            <Stack spacing={2} sx={{ mt: 1.5 }}>
              <FormControl>
                <TextField
                  {...register('information')}
                  minRows={4}
                  inputProps={{
                    maxLength: MAX_INFORMATION_LENGTH,
                  }}
                  fullWidth
                  multiline
                  placeholder="О себе"
                  defaultValue={profile?.information || ''}
                  aria-describedby="information-helper-text"
                />
                <FormHelperText id="information-helper-text">
                  {information.length}/{MAX_INFORMATION_LENGTH}
                </FormHelperText>
              </FormControl>
              <TextField
                {...register('location', { required: true })}
                placeholder="Место проживания"
                type="text"
                defaultValue={profile.location}
                autoComplete="country-name"
              />
              <FormControl component="fieldset">
                <FormLabel sx={{ fontSize: 14, ml: 1 }} component="legend">
                  Пол
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                  defaultValue={profile.gender ? 'female' : 'male'}
                >
                  <FormControlLabel
                    sx={{ flexGrow: 1 }}
                    value="male"
                    control={
                      <Radio {...register('gender', { required: true })} />
                    }
                    label="Мужской"
                  />
                  <FormControlLabel
                    value="female"
                    sx={{ flexGrow: 1 }}
                    control={
                      <Radio {...register('gender', { required: true })} />
                    }
                    label="Женский"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl variant="standard">
                <FormLabel
                  htmlFor="bday-input"
                  sx={{ fontSize: 14, ml: 1, mb: 1 }}
                >
                  День рождения
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture
                    mask="__.__.____"
                    value={birthDate}
                    onChange={handleDateChange}
                    onError={handleDateError}
                    renderInput={(props) => (
                      <TextField
                        id="bday-input"
                        autoComplete="bday"
                        required
                        {...props}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Stack>
          </Paper>
        </Container>
      )}
    </Root>
  )
}

export default React.memo(ProfileEdit)
