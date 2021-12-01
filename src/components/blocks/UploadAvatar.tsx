import { styled, alpha, Box } from '@mui/material'
import React from 'react'
import { Icon24CameraOutline } from '@vkontakte/icons'
import { SxProps } from '@mui/system'

const StyledAvatar = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: 96,
  height: 96,
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  boxShadow: '0 0 0 1px inset ' + alpha(theme.palette.text.primary, 0.12),
  userSelect: 'none',
}))
const StyledCameraIcon = styled(Icon24CameraOutline)(({ theme }) => ({
  color: alpha(theme.palette.text.primary, 0.5),
}))

const UploadAvatar = ({ ...props }) => {
  return (
    <StyledAvatar {...props}>
      <StyledCameraIcon width={32} height={32} />
    </StyledAvatar>
  )
}

export default UploadAvatar
