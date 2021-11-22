import { styled, Avatar as MUIAvatar, useTheme, hexToRgb } from '@mui/material'
import React, { useState } from 'react'
import randomGradient from 'random-gradient'
import { UserBase } from 'project-finder-backend-types'
import mixColors from 'src/utils/mixColors'

const StyledAvatar = styled('div')({
  display: 'flex',
  width: 96,
  height: 96,
  borderRadius: '50%',
  textTransform: 'uppercase',
  fontSize: 40,
  fontWeight: 900,
  fontFamily: 'Google Sans',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  userSelect: 'none'
})
const StyledImageAvatar = styled(MUIAvatar)({
  display: 'flex',
  width: 96,
  height: 96,
  margin: 0,
  flexShrink: 0,
})

interface AvatarProps {
  src?: string
  uid?: string
  letter?: string
}

const Avatar: React.FC<AvatarProps> = ({ src, uid, letter }) => {
  const [isLoaded, setLoaded] = useState<boolean>(!!src)
  const theme = useTheme()
  const background = randomGradient(uid)
  const colorsFromBackrgound = background.match(/(#[\d|\w]+), (#[\d|\w]+)/)
  const colorA = colorsFromBackrgound[0].slice(1)
  const colorB = colorsFromBackrgound[1].slice(1)
  const middleColor = mixColors(colorA, colorB, 0.5)
  const color = theme.palette.getContrastText(middleColor)
  const handleError = () => setLoaded(false)

  return isLoaded ? (
    <StyledImageAvatar src={src} onError={handleError} />
  ) : (
    <StyledAvatar sx={{ background, color }}>{letter}</StyledAvatar>
  )
}

export default Avatar
