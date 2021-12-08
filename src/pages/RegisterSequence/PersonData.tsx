import {
  alpha,
  Button,
  styled,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import React, { useEffect } from 'react'
import { BUTTON_MAX_WIDTH } from 'src/config/constants'
import { Icon24ArrowRightOutline } from '@vkontakte/icons'
import { StepProps } from '.'
import { useNavigate } from 'react-router'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'
import UploadAvatar from 'src/components/blocks/UploadAvatar'
import { Dayjs } from 'dayjs'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDayjs from '@mui/lab/AdapterDayjs'
import TextField from 'src/components/blocks/TextField'

interface FormInput {
  name: string
  lastname: string
  gender: 'male' | 'female'
  birthDate: Dayjs
  location: string
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
const RowContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  alignItems: 'center',
  width: '100%',
}))
const HintLabel = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  width: '100%',
  fontSize: 14,
  color: alpha(theme.palette.text.primary, 0.5),
}))
const FormGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
}))

const PersonData: React.FC<StepProps> = ({ values, setValues }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState,
    clearErrors,
    control,
    setValue,
  } = useForm<FormInput>({
    shouldFocusError: true,
  })
  const birthDate = useWatch({
    control,
    name: 'birthDate',
    defaultValue: null,
  })
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    clearErrors()
    setValues((prev) => ({
      ...prev,
      // We assume that the date given in `data` is valid Datejs
      // because we trust @mui to validate and parse user input```
      birthDate: (data.birthDate as Dayjs).format(),
      name: data.name,
      lastname: data.lastname,
      location: data.location,
      gender: data.gender === 'female',
    }))
    navigate('/register?step=skills')
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
    if (!values.login) return navigate('/register')
  }, [values.login, navigate])

  return (
    <Root>
      <ColumnContainer onSubmit={handleSubmit(onSubmit)} autoComplete="on">
        <Box
          sx={{
            justifyContent: 'center',
            display: 'flex',
            width: '100%',
            mb: 4,
          }}
        >
          <UploadAvatar />
        </Box>
        <TextField
          {...register('name', { required: true })}
          autoFocus
          placeholder="Имя"
          type="text"
          required
          autoComplete="given-name"
        />
        <TextField
          {...register('lastname', { required: true })}
          placeholder="Фамилия"
          type="text"
          required
          autoComplete="family-name"
        />
        <FormControl component="fieldset">
          <FormLabel sx={{ fontSize: 14, ml: 1 }} component="legend">
            Пол
          </FormLabel>
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
            <FormControlLabel
              sx={{ flexGrow: 1 }}
              value="male"
              control={<Radio {...register('gender', { required: true })} />}
              label="Мужской"
            />
            <FormControlLabel
              value="female"
              sx={{ flexGrow: 1 }}
              control={<Radio {...register('gender', { required: true })} />}
              label="Женский"
            />
          </RadioGroup>
        </FormControl>
        <FormGroup>
          <FormLabel sx={{ fontSize: 14, ml: 1 }} component="legend">
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
                <TextField autoComplete="bday" required {...props} />
              )}
            />
          </LocalizationProvider>
        </FormGroup>
        <TextField
          {...register('location', { required: true })}
          placeholder="Место проживания"
          type="text"
          required
          autoComplete="country-name"
        />
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<Icon24ArrowRightOutline width={20} height={20} />}
        >
          Продолжить
        </Button>
      </ColumnContainer>
    </Root>
  )
}

export default React.memo(PersonData)
