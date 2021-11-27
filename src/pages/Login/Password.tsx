import {
  Button,
  styled,
  Typography,
  darken,
  IconButton,
  alpha,
} from '@mui/material'
import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import Input from 'src/components/blocks/Input'
import { BUTTON_MAX_WIDTH } from 'src/config/constants'
import Avatar from 'src/components/blocks/Avatar'
import { StepProps } from '.'
import { useNavigate } from 'react-router'
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import ToggleButton from 'material-ui-toggle-icon'
import { useDispatch } from 'react-redux'
import { login as loginAction } from 'src/store/actions/auth'

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

const Password: React.FC<StepProps> = ({ values, setValues }) => {
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const goNext: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const password = inputRef.current.value

    // Step checking fixes some edge cases (ex. tapping too fast on button)
    if (password) {
      setValues({
        login: values.login,
        password,
      })
      dispatch(loginAction({ login: values.login, password }))
    }
  }
  const handleShowPasswordClick = () => setShowPassword((prev) => !prev)

  useEffect(() => {
    if (!values.login) navigate('/login')
  }, [])

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
        <Input
          required
          inputRef={inputRef}
          placeholder="Пароль"
          type={showPassword ? 'text' : 'password'}
          sx={{ padding: (theme) => theme.spacing(0.5, 2) }}
          endAdornment={
            <IconButton
              sx={{ color: (theme) => alpha(theme.palette.text.primary, 0.39) }}
              onClick={handleShowPasswordClick}
            >
              <ToggleButton
                on={showPassword}
                onIcon={<VisibilityRounded />}
                offIcon={<VisibilityOffRounded />}
              />
            </IconButton>
          }
        />
        <Button
          fullWidth
          type="submit"
          sx={{ maxWidth: BUTTON_MAX_WIDTH }}
          color="primary"
          variant="contained"
        >
          Войти
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
          Забыли пароль?
        </Button>
      </ColumnContainer>
    </Root>
  )
}

export default React.memo(Password)
