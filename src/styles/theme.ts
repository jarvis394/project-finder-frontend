import { createTheme, ThemeOptions } from '@mui/material'

const theme: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      paper: '#ffffff',
      default: '#fcfcfc'
    },
    primary: {
      main: '#FF1744',
      light: '#FF4267',
      dark: '#E81840'
    },
    secondary: {
      main: '#7C4DFF',
      dark: '#6E46DD',
      light: '#8F67FF'
    }
  },
}

export default createTheme(theme)
