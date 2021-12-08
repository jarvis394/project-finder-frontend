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

type Size = 'default' | 'medium' | 'small'

type AvatarOptions = {
  [key in Size]: {
    size: number
    borderRadius: number | string
    fontSize: number
  }
}

const avatarOptions: AvatarOptions = {
  default: {
    size: 96,
    borderRadius: '50%',
    fontSize: 40,
  },
  medium: {
    size: 40,
    borderRadius: '50%',
    fontSize: 20,
  },
  small: {
    size: 28,
    borderRadius: 6,
    fontSize: 12,
  },
}

const StyledAvatar = styled('div')<{ size: Size }>(({ size }) => ({
  display: 'flex',
  width: avatarOptions[size].size,
  height: avatarOptions[size].size,
  borderRadius: avatarOptions[size].borderRadius,
  textTransform: 'uppercase',
  fontSize: avatarOptions[size].fontSize,
  fontWeight: 900,
  fontFamily: 'Google Sans',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  userSelect: 'none',
}))
const StyledImageAvatar = styled(MUIAvatar)<{ size: Size }>(({ size }) => ({
  display: 'flex',
  width: avatarOptions[size].size,
  height: avatarOptions[size].size,
  borderRadius: avatarOptions[size].borderRadius,
  margin: 0,
  flexShrink: 0,
}))

interface AvatarProps {
  src?: string
  uid?: string
  letter?: string
  sx?: SxProps<Theme>
  size?: Size
}

const Avatar: React.FC<AvatarProps & StyledComponentProps> = ({
  src,
  uid = 'qwerty',
  letter,
  sx,
  size = 'default',
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
    <StyledAvatar size={size} sx={{ background, color, ...sx }} {...props}>
      {letter}
    </StyledAvatar>
  ) : (
    <StyledImageAvatar
      size={size}
      sx={sx}
      src={src}
      onError={handleError}
      {...props}
    />
  )
}

export default Avatar
