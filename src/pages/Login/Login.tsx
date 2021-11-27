import { Button, styled, Typography, darken } from '@mui/material'
import React, { FormEventHandler, useRef } from 'react'
import Input from 'src/components/blocks/Input'
import { BUTTON_MAX_WIDTH } from 'src/config/constants'
import { Icon24ArrowRightOutline } from '@vkontakte/icons'
import Avatar from 'src/components/blocks/Avatar'
import { StepProps } from '.'
import { useNavigate } from 'react-router'

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  flex: 2,
  flexDirection: 'column',
})
const HeaderText = styled(Typography)({
  fontSize: 32,
  fontFamily: 'Google Sans',
  fontWeight: 900,
})
const ColumnContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: '100%',
  alignItems: 'center',
  marginTop: theme.spacing(4),
}))
const SubheaderText = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontFamily: 'Roboto',
  fontWeight: 400,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  maxWidth: 340,
}))

const Login: React.FC<StepProps> = ({ setValues }) => {
  const inputRef = useRef<HTMLInputElement>()
  const navigate = useNavigate()
  const goNext: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const login = inputRef.current.value

    if (login) {
      setValues({
        login,
        password: '',
      })
      navigate('/login/password')
    }
  }
  return (
    <Root>
      <Avatar
        sx={{
          mb: 2.5,
          background: (theme) =>
            `linear-gradient(to bottom right, ${theme.palette.primary.main}, #E1E1E1)`,
        }}
        uid="a"
      />
      <HeaderText>Авторизация</HeaderText>
      <SubheaderText>
        Введите свой логин или зарегестрируйтесь, чтобы найти свой проект мечты
      </SubheaderText>
      <ColumnContainer onSubmit={goNext}>
        <Input required inputRef={inputRef} placeholder="Логин" type="text" />
        <Button
          fullWidth
          type="submit"
          sx={{ maxWidth: BUTTON_MAX_WIDTH }}
          color="primary"
          variant="contained"
          endIcon={<Icon24ArrowRightOutline width={20} height={20} />}
        >
          Продолжить
        </Button>
        <Button
          fullWidth
          sx={{
            mt: -0.5,
            maxWidth: BUTTON_MAX_WIDTH,
            backgroundColor: (theme) =>
              darken(theme.palette.background.paper, 0.05),
          }}
          variant="contained"
          color="inherit"
        >
          Зарегестрироваться
        </Button>
      </ColumnContainer>
    </Root>
  )
}

export default React.memo(Login)
