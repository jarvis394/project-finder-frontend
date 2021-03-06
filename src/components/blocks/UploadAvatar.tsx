import React from 'react'
import { styled, alpha, ButtonBase } from '@mui/material'
import { Icon24CameraOutline } from '@vkontakte/icons'

const StyledAvatar = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  width: 96,
  height: 96,
  borderRadius: '50% !important',
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
