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
import Input from 'src/components/blocks/Input'
import { BUTTON_MAX_WIDTH } from 'src/config/constants'
import { Icon24ArrowRightOutline } from '@vkontakte/icons'
import { StepProps } from '.'
import { useNavigate } from 'react-router'
import { useForm, SubmitHandler } from 'react-hook-form'
import UploadAvatar from 'src/components/blocks/UploadAvatar'
import dayjs from 'dayjs'

interface FormInput {
  name: string
  lastname: string
  gender: 'male' | 'female'
  birthDate: {
    day: number
    month: number
    year: number
  }
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
  const { register, handleSubmit, setError, formState, clearErrors } =
    useForm<FormInput>({
      shouldFocusError: true,
    })
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    clearErrors()
    const birthDate = dayjs()
      .date(data.birthDate.day)
      .month(Number(data.birthDate.month) - 1)
      .year(data.birthDate.year)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)

    if (birthDate.isValid()) {
      setValues((prev) => ({
        ...prev,
        birthDate: birthDate.format(),
        name: data.name,
        lastname: data.lastname,
        location: data.location,
        gender: data.gender === 'female',
      }))
      navigate('/register?step=skills')
    } else {
      setError('birthDate.day', {
        message: 'Некорректная дата',
        type: 'value',
      })
    }
  }
  const clearBirthDateErrors = () =>
    formState.errors && clearErrors('birthDate.day')

  useEffect(() => {
    if (!values.login) return navigate('/register')
  }, [])

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
        <Input
          {...register('name', { required: true })}
          placeholder="Имя"
          type="text"
          autoComplete="given-name"
        />
        <Input
          {...register('lastname', { required: true })}
          placeholder="Фамилия"
          type="text"
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
          <HintLabel>День рождения</HintLabel>
          <RowContainer>
            <Input
              {...register('birthDate.day', {
                required: true,
                onChange: clearBirthDateErrors,
              })}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              placeholder="День"
              autoComplete="bday-day"
            />
            <Input
              {...register('birthDate.month', {
                required: true,
                onChange: clearBirthDateErrors,
              })}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              placeholder="Месяц"
              autoComplete="bday-month"
            />
            <Input
              {...register('birthDate.year', {
                required: true,
                onChange: clearBirthDateErrors,
              })}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              placeholder="Год"
              autoComplete="bday-year"
            />
          </RowContainer>
        </FormGroup>
        <Input
          {...register('location', { required: true })}
          placeholder="Место проживания"
          type="text"
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
        {formState.errors?.birthDate?.day?.type === 'value' && (
          <Typography
            sx={{
              color: (theme) => theme.palette.error.main,
              fontSize: 14,
              ml: 1,
            }}
          >
            Введите правильную дату
          </Typography>
        )}
      </ColumnContainer>
    </Root>
  )
}

export default React.memo(PersonData)
