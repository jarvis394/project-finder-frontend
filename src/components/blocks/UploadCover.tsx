import React from 'react'
import { styled, alpha, ButtonBase } from '@mui/material'
import { Icon24CameraOutline } from '@vkontakte/icons'
import { COVER_MAX_HEIGHT, CARD_MAX_WIDTH } from 'src/config/constants'

const StyledCover = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  height: 'auto',
  width: '100%',
  aspectRatio: `${CARD_MAX_WIDTH - 32}/${COVER_MAX_HEIGHT}`,
  borderRadius: '12px !important',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  boxShadow: '0 0 0 1px inset ' + alpha(theme.palette.text.primary, 0.12),
  userSelect: 'none',
}))
const StyledCameraIcon = styled(Icon24CameraOutline)(({ theme }) => ({
  color: alpha(theme.palette.text.primary, 0.5),
}))

const UploadCover = ({ ...props }) => {
  return (
    <StyledCover {...props}>
      <StyledCameraIcon width={32} height={32} />
    </StyledCover>
  )
}

export default UploadCover
