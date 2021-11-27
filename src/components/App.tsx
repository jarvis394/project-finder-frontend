import { CssBaseline } from '@mui/material'
import { ThemeProvider, styled } from '@mui/material/styles'
import isMobile from 'is-mobile'
import React from 'react'
import {
  CHROME_ADDRESS_BAR_HEIGHT,
  BOTTOM_BAR_HEIGHT,
  APP_MAX_WIDTH,
} from 'src/config/constants'
import theme from 'src/styles/theme'
import BottomNavigation from 'src/components/blocks/BottomNavigation'
import { useRoutes } from 'react-router-dom'
import { routes } from 'src/config/routes'
import { useRoute } from 'src/hooks'

const Root = styled('div', {
  shouldForwardProp: (prop) => prop !== 'hideInterface',
})<{ hideInterface: boolean }>(({ hideInterface }) => ({
  display: 'flex',
  minHeight: `calc(100vh - ${isMobile() ? CHROME_ADDRESS_BAR_HEIGHT : 0}px - ${
    hideInterface ? 0 : BOTTOM_BAR_HEIGHT
  }px + env(safe-area-inset-bottom, 0px))`,
  borderRadius: 0,
  alignItems: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  // maxWidth: APP_MAX_WIDTH,
  margin: '0 auto env(safe-area-inset-bottom, 0px) auto',
  boxSizing: 'border-box',
}))

const App: React.FC = () => {
  const Component = useRoutes(routes)
  const route = useRoute()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root hideInterface={route?.shouldHideInterface}>{Component}</Root>
      <BottomNavigation />
    </ThemeProvider>
  )
}

export default React.memo(App)
