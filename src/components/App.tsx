import { CssBaseline } from '@mui/material'
import { ThemeProvider, styled } from '@mui/material/styles'
import isMobile from 'is-mobile'
import { DocumentAppProps } from 'pages/_app'
import React from 'react'
import {
  CHROME_ADDRESS_BAR_HEIGHT,
  BOTTOM_BAR_HEIGHT,
  APP_MAX_WIDTH,
} from 'src/config/constants'
import theme from 'src/styles/theme'
import BottomNavigation from 'src/components/blocks/BottomNavigation'

const Root = styled('div')({
  display: 'flex',
  minHeight: `calc(100vh - ${
    isMobile() ? CHROME_ADDRESS_BAR_HEIGHT : 0
  }px - ${BOTTOM_BAR_HEIGHT}px + env(safe-area-inset-bottom, 0px))`,
  borderRadius: 0,
  alignItems: 'flex-start',
  flexDirection: 'row',
  width: '100%',
  maxWidth: APP_MAX_WIDTH,
  margin: '0 auto env(safe-area-inset-bottom, 0px) auto',
  boxSizing: 'border-box',
})

const App: React.FC<DocumentAppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root>
        <Component {...pageProps} />
      </Root>
      <BottomNavigation />
    </ThemeProvider>
  )
}

export default React.memo(App)
