import React from 'react'
import { styled, keyframes, Theme } from '@mui/material'
import { Icon24Spinner } from '@vkontakte/icons'
import { Icon24SpinnerProps } from '@vkontakte/icons/dist/24/spinner'
import { SxProps } from '@mui/system'

const spinnerAnimation = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`
const StyledSpinner = styled(Icon24Spinner)(({ theme }) => ({
  animation: `${spinnerAnimation} 1.1s infinite linear`,
  color: theme.palette.text.primary,
}))

const Spinner: React.FC<Icon24SpinnerProps & SxProps<Theme>> = ({
  ...props
}) => {
  return <StyledSpinner {...props} />
}

export default Spinner
