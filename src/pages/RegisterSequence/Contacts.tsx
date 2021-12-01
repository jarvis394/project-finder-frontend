import {
  alpha,
  Autocomplete,
  Button,
  ButtonBase,
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
import {
  Icon24ArrowRightOutline,
  Icon28ChevronDownOutline,
} from '@vkontakte/icons'
import { StepProps } from '.'
import { useNavigate } from 'react-router'
import { useForm, SubmitHandler } from 'react-hook-form'
import UploadAvatar from 'src/components/blocks/UploadAvatar'
import dayjs from 'dayjs'
import Avatar from 'src/components/blocks/Avatar'
import { FlashOffTwoTone } from '@mui/icons-material'

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
  const { register, handleSubmit, setError, formState, clearErrors } =
    useForm<FormInput>({
      shouldFocusError: true,
    })
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    setValues((prev) => ({
      contacts: {
        email: data.email,
        telegram: data.telegram,
        website: data.website,
      },
      ...prev,
    }))
    
    navigate('/')
  }

  useEffect(() => {
    if (!values.login) return navigate('/register')
  }, [])

  if (!values.login) return null

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
          <Avatar uid="a" letter={(values.name || 'a')[0]} />
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
        <Button fullWidth type="submit" color="primary" variant="contained">
          Зарегистрироваться
        </Button>
      </ColumnContainer>
    </Root>
  )
}

export default React.memo(Contacts)
