import {
  Button,
  styled,
  Typography,
  darken,
  alpha,
  IconButton,
} from '@mui/material'
import React, {
  FormEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import Input from 'src/components/blocks/Input'
import {
  BUTTON_MAX_WIDTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_SPECIAL_SYMBOLS,
} from 'src/config/constants'
import { Icon24ArrowRightOutline } from '@vkontakte/icons'
import Avatar from 'src/components/blocks/Avatar'
import { StepProps } from '.'
import { useNavigate } from 'react-router'
import { useSnackbar } from 'notistack'
import { VisibilityRounded, VisibilityOffRounded } from '@mui/icons-material'
import ToggleButton from 'material-ui-toggle-icon'
import { Link } from 'react-router-dom'

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  flex: 2,
  maxHeight: 'calc(100vh - 56px)',
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
  maxWidth: 364,
}))
const PasswordRequirementsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  width: '100%',
  maxWidth: BUTTON_MAX_WIDTH,
}))
const PasswordRequirementsItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(1.5),
}))
const PasswordRequirementsIconCircle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  borderRadius: '50%',
  width: 8,
  height: 8,
  background: active ? '#45FF26' : theme.palette.divider,
}))
const PasswordRequirementsText = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(1.5),
  fontFamily: 'Roboto',
  fontSize: 12,
  color: alpha(theme.palette.text.primary, 0.5),
}))
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
}))

const AuthData: React.FC<StepProps> = ({ setValues }) => {
  const loginInputRef = useRef<HTMLInputElement>()
  const { enqueueSnackbar } = useSnackbar()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const doesPasswordExceedsMinLength = useMemo(
    () => password.length > MIN_PASSWORD_LENGTH,
    [password]
  )
  const doesPasswordContainSpecialSymbols = useMemo(
    () => PASSWORD_SPECIAL_SYMBOLS.some((e) => password.includes(e)),
    [password]
  )
  const navigate = useNavigate()
  const handleShowPasswordClick = () => {
    setShowPassword((prev) => !prev)
  }
  const goNext: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      const login = loginInputRef.current.value

      if (
        login &&
        password &&
        doesPasswordExceedsMinLength &&
        doesPasswordContainSpecialSymbols
      ) {
        setValues((prev) => ({
          ...prev,
          login,
          password,
        }))
        navigate('/register?step=person')
      } else if (
        !doesPasswordExceedsMinLength ||
        !doesPasswordContainSpecialSymbols
      ) {
        enqueueSnackbar('Введите подходящий по критериям пароль', {
          variant: 'error',
        })
      }
    },
    [password]
  )
  const handlePasswordInputChange: React.ChangeEventHandler<HTMLInputElement> =
    (e) => {
      setPassword(e.currentTarget.value)
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
      <HeaderText>Давайте начнем.</HeaderText>
      <SubheaderText>
        Зарегестрируйтесь и введите основную информацию, чтобы найти свой проект
        мечты
      </SubheaderText>
      <ColumnContainer onSubmit={goNext} autoComplete="on">
        <Input
          required
          inputRef={loginInputRef}
          placeholder="Логин"
          type="text"
        />
        <Input
          required
          value={password}
          onChange={handlePasswordInputChange}
          placeholder="Придумайте пароль"
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
        <PasswordRequirementsContainer>
          <PasswordRequirementsItem>
            <PasswordRequirementsIconCircle
              active={doesPasswordExceedsMinLength}
            />
            <PasswordRequirementsText>
              Больше 7 символов
            </PasswordRequirementsText>
          </PasswordRequirementsItem>
          <PasswordRequirementsItem>
            <PasswordRequirementsIconCircle
              active={doesPasswordContainSpecialSymbols}
            />
            <PasswordRequirementsText>
              Хотя бы одна цифра или специальный символ
            </PasswordRequirementsText>
          </PasswordRequirementsItem>
        </PasswordRequirementsContainer>
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
        <StyledLink to="/login">
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
            Авторизация
          </Button>
        </StyledLink>
      </ColumnContainer>
    </Root>
  )
}

export default React.memo(AuthData)
