import { styled, Box, Button, Typography, alpha, darken } from '@mui/material'
import { Icon28ArrowRightOutline } from '@vkontakte/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { BUTTON_MAX_WIDTH } from 'src/config/constants'
import MockupCard from './MockupCard'

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  background: theme.palette.background.paper,
  height: '100vh',
  width: '100%',
  flexDirection: 'column',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}))

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
  WebkitTapHighlightColor: 'transparent',
})

const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  display: 'flex',
  height: '100%',
  maxHeight: '50%',
  maxWidth: '100%',
  flexGrow: 1,
  flexDirection: 'column',
  position: 'relative',
  zIndex: 75,
  padding: theme.spacing(2, 4, 4, 4),
  opacity: active ? '1' : '0',
  transitionDuration: `${theme.transitions.duration.complex}ms`,
  transitionTimingFunction: 'cubic-bezier(1, 0, 0, 1)',
  [theme.breakpoints.up('md')]: {
    maxWidth: '50%',
    maxHeight: '100%',
  },
}))

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontSize: 40,
  color: theme.palette.getContrastText(theme.palette.primary.main),
  fontWeight: '900',
  lineHeight: 1.4,
  marginTop: theme.spacing(1.5),
  userSelect: 'none',
  transitionDuration: `${theme.transitions.duration.complex}ms`,
  transitionTimingFunction: 'cubic-bezier(1, 0, 0, 1)',
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    fontSize: 56,
    marginTop: 0,
  },
}))

const HeroSubtext = styled(Typography)(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontSize: 16,
  color: theme.palette.getContrastText(theme.palette.primary.main),
  userSelect: 'none',
  transitionDuration: `${theme.transitions.duration.complex}ms`,
  transitionTimingFunction: 'cubic-bezier(1, 0, 0, 1)',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    fontSize: 18,
  },
}))

const ColoredBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'moved',
})<{ moved: boolean }>(({ theme, moved }) => ({
  background: theme.palette.primary.main,
  position: 'absolute',
  width: '100%',
  height: '50%',
  zIndex: 25,
  transitionDuration: `${theme.transitions.duration.complex}ms`,
  transitionTimingFunction: 'cubic-bezier(1, 0, 0, 1)',
  transform: `translateY(${moved ? '100%' : '0%'})`,
  [theme.breakpoints.up('md')]: {
    width: '50%',
    height: '100%',
    transform: `translateX(${moved ? '100%' : '0%'})`,
  },
}))

const TextButtonsWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  zIndex: 100,
  [theme.breakpoints.up('md')]: {
    height: 'auto',
  },
}))

const TextButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: `calc(100% - ${theme.spacing(2)})`,
  alignItems: 'center',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(4 * 2),
    flexDirection: 'row',
    height: 'auto',
    marginTop: theme.spacing(2),
    alignItems: 'flex-start',
  },
}))

const TextButton = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  transitionDuration: `${theme.transitions.duration.complex}ms`,
  transitionTimingFunction: 'cubic-bezier(1, 0, 0, 1)',
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: 15,
  position: 'relative',
  color: active
    ? theme.palette.getContrastText(theme.palette.primary.main)
    : theme.palette.text.primary,
  [theme.breakpoints.up('md')]: {
    fontSize: 17,
  },
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  '&:hover': {
    color: active
      ? theme.palette.getContrastText(theme.palette.primary.main)
      : alpha(theme.palette.text.primary, 0.65),
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: `calc(100% + ${theme.spacing(4)})`,
    height: `calc(100% + ${theme.spacing(4)})`,
    top: theme.spacing(-3),
    left: theme.spacing(-2),
    [theme.breakpoints.up('md')]: {
      top: theme.spacing(-2),
    },
  },
  '&:after': {
    position: 'absolute',
    content: '""',
    height: 2,
    bottom: 0,
    margin: '0 auto',
    left: 0,
    right: 0,
    width: active ? '100%' : '0%',
    transitionDuration: `${theme.transitions.duration.complex}ms`,
    transitionTimingFunction: 'cubic-bezier(1, 0, 0, 1)',
    background: theme.palette.getContrastText(theme.palette.primary.main),
  },
}))

const HeroButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
  background: theme.palette.getContrastText(theme.palette.primary.main),
  transitionDuration: `${theme.transitions.duration.complex}ms`,
  transitionTimingFunction: 'cubic-bezier(1, 0, 0, 1)',
  maxWidth: BUTTON_MAX_WIDTH,
  width: '100%',
  '&:hover': {
    background: theme.palette.getContrastText(theme.palette.primary.main),
  },
}))

const Home = () => {
  const [isMoved, setMoved] = React.useState(false)
  return (
    <Root>
      <ColoredBox moved={isMoved} />
      <TextButtonsWrapper>
        <TextButtonsContainer>
          <TextButton active={!isMoved} onClick={() => setMoved(false)}>
            Я специалист
          </TextButton>
          <TextButton active={isMoved} onClick={() => setMoved(true)}>
            Я работодатель
          </TextButton>
        </TextButtonsContainer>
      </TextButtonsWrapper>
      <Container active={!isMoved}>
        <HeroTitle>
          найди
          <br />
          свой проект
          <br />
          мечты
        </HeroTitle>
        <HeroSubtext>Новая система подбора проектов в стиле Tinder</HeroSubtext>
        <StyledLink
          to="/register"
          sx={
            isMoved
              ? { userSelect: 'none', pointerEvents: 'none', cursor: 'default' }
              : {}
          }
        >
          <HeroButton
            variant="contained"
            fullWidth
            endIcon={<Icon28ArrowRightOutline width={24} height={24} />}
          >
            Перейти к поиску
          </HeroButton>
        </StyledLink>
        <StyledLink to="/login" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Уже зарегистрированы?{' '}
          <span style={{ textDecoration: 'underline' }}>Войти</span>
        </StyledLink>
      </Container>
      <Container
        active={isMoved}
        sx={{ textAlign: 'right', alignItems: 'flex-end' }}
      >
        <HeroTitle>
          найди
          <br />
          специалиста
          <br />
          мечты
        </HeroTitle>
        <HeroSubtext>
          Новая система подбора людей для бизнеса в стиле Tinder
        </HeroSubtext>
        <StyledLink
          to="/register"
          sx={
            !isMoved
              ? { userSelect: 'none', pointerEvents: 'none', cursor: 'default' }
              : {}
          }
        >
          <HeroButton
            variant="contained"
            fullWidth
            endIcon={<Icon28ArrowRightOutline width={24} height={24} />}
          >
            Перейти к поиску
          </HeroButton>
        </StyledLink>
        <StyledLink to="/login" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Уже зарегистрированы?{' '}
          <span style={{ textDecoration: 'underline' }}>Войти</span>
        </StyledLink>
      </Container>
      <Root sx={{ position: 'absolute', zIndex: 1 }}>
        <Container
          active
          sx={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <MockupCard variant="specialist" />
        </Container>
        <Container
          active
          sx={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <MockupCard variant="project" />
        </Container>
      </Root>
    </Root>
  )
}

export default Home
