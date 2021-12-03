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

type Size = 'default' | 'small'
const AVATAR_SIZE_DEFAULT = 96
const AVATAR_SIZE_SMALL = 28

const StyledAvatar = styled('div')<{ size: Size }>(({ size }) => ({
  display: 'flex',
  width: size === 'default' ? AVATAR_SIZE_DEFAULT : AVATAR_SIZE_SMALL,
  height: size === 'default' ? AVATAR_SIZE_DEFAULT : AVATAR_SIZE_SMALL,
  borderRadius: size === 'default' ? '50%' : 6,
  textTransform: 'uppercase',
  fontSize: size === 'default' ? 40 : 12,
  fontWeight: 900,
  fontFamily: 'Google Sans',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  userSelect: 'none',
}))
const StyledImageAvatar = styled(MUIAvatar)<{ size: Size }>(({ size }) => ({
  display: 'flex',
  width: size === 'default' ? AVATAR_SIZE_DEFAULT : AVATAR_SIZE_SMALL,
  height: size === 'default' ? AVATAR_SIZE_DEFAULT : AVATAR_SIZE_SMALL,
  borderRadius: size === 'default' ? '50%' : 6,
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
