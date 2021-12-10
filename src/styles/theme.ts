import { alpha, createTheme, ThemeOptions } from '@mui/material'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    transparent: true
  }
}

const theme: ThemeOptions = {
  shape: { borderRadius: 8 },
  palette: {
    mode: 'light',
    background: {
      paper: '#ffffff',
      default: '#fcfcfc',
    },
    primary: {
      main: '#FF1744',
      light: '#FF4267',
      dark: '#f0133e',
    },
    secondary: {
      main: '#7C4DFF',
      dark: '#6E46DD',
      light: '#8F67FF',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        contained: {
          textTransform: 'none',
          fontFamily: 'Google Sans',
          fontWeight: 500,
          fontSize: 16,
          letterSpacing: 'normal',
        },
        fullWidth: {
          borderRadius: 12,
          minHeight: 48,
        },
      },
      variants: [
        {
          props: { variant: 'transparent', color: 'primary' },
          style: {
            textTransform: 'none',
            fontFamily: 'Google Sans',
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: 'normal',
            color: '#FF1744',
            backgroundColor: alpha('#FF1744', 0.07),
            ':hover': {
              backgroundColor: alpha('#FF1744', 0.17),
            },
          },
        },
      ],
    },
  },
}

export default createTheme(theme)
