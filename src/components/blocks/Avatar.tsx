import {
  styled,
  Avatar as MUIAvatar,
  useTheme,
  StyledComponentProps,
  Theme,
} from '@mui/material'
import React, { useState } from 'react'
import randomGradient from 'random-gradient'
import mixColors from 'src/utils/mixColors'
import { SxProps } from '@mui/system'

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
  userSelect: 'none',
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
  sx?: SxProps<Theme>
}

const Avatar: React.FC<AvatarProps & StyledComponentProps> = ({
  src,
  uid,
  letter,
  sx,
  ...props
}) => {
  const [isLoaded, setLoaded] = useState<boolean>(!!src)
  const theme = useTheme()
  const background = randomGradient(uid)
  const colorsFromBackrgound = background.match(/(#[\d|\w]+), (#[\d|\w]+)/)
  const colorA = colorsFromBackrgound[0].slice(1)
  const colorB = colorsFromBackrgound[1].slice(1)
  const middleColor = mixColors(colorA, colorB, 0.5)
  const color = theme.palette.getContrastText(middleColor)
  const handleError = () => setLoaded(false)

  return !isLoaded || !src ? (
    <StyledAvatar sx={{ background, color, ...sx }} {...props}>
      {letter}
    </StyledAvatar>
  ) : (
    <StyledImageAvatar sx={sx} src={src} onError={handleError} {...props} />
  )
}

export default Avatar
