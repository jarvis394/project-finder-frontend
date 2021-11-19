import { styled } from '@mui/material'
import { motion, AnimationControls, MotionValue } from 'framer-motion'
import isMobile from 'is-mobile'
import React from 'react'
import {
  BOTTOM_BAR_HEIGHT,
  CHROME_ADDRESS_BAR_HEIGHT,
  CIRCLE_ANIMATION_SCALE,
  CIRCLE_WIDTH,
} from 'src/config/constants'

import { Icon36LikeOutline } from '@vkontakte/icons'
import { Icon36CancelOutline } from '@vkontakte/icons'
import Like from '../svg/Like'

const Wrapper = styled(motion.div)<{ circleVariant: 'like' | 'reject' }>(
  ({ circleVariant }) => ({
    position: 'absolute',
    [circleVariant === 'like' ? 'left' : 'right']: -CIRCLE_WIDTH,
    height: `calc(100vh - ${BOTTOM_BAR_HEIGHT}px - ${
      isMobile() ? CHROME_ADDRESS_BAR_HEIGHT : 0
    }px)`,
    display: 'flex',
    alignItems: 'center',
  })
)
const StyledCircle = styled('div')<{ circleVariant: 'like' | 'reject' }>(
  ({ theme, circleVariant }) => ({
    width: CIRCLE_WIDTH,
    height: CIRCLE_WIDTH,
    backgroundColor:
      theme.palette[circleVariant === 'like' ? 'primary' : 'secondary'].main,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
)
const StyledLikeIcon = styled(Like)(({ theme }) => ({
  color: '#FFFFFF',
  stroke: '#FFFFFF',
  strokeWidth: 1
}))
const StyledRejectIcon = styled(Icon36CancelOutline)(({ theme }) => ({
  color: '#FFFFFF',
  stroke: '#FFFFFF',
  strokeWidth: 2
}))


interface CircleProps {
  circleControls: AnimationControls
  x: MotionValue<number>
  variant: 'like' | 'reject'
}

const Circle: React.FC<CircleProps> = ({ circleControls, x, variant }) => {
  return (
    <Wrapper
      circleVariant={variant}
      animate={circleControls}
      key={variant}
      style={{ [variant === 'like' ? 'left' : 'right']: x }}
      initial={{
        opacity: 1,
        scale: 1
      }}
      exit={{
        opacity: 0,
        scale: CIRCLE_ANIMATION_SCALE * 2
      }}
    >
      <StyledCircle circleVariant={variant}>
        {variant === 'like' ? (
          <StyledLikeIcon width={48} height={48} />
        ) : (
          <StyledRejectIcon width={48} height={48} />
        )}
      </StyledCircle>
    </Wrapper>
  )
}

export default Circle
