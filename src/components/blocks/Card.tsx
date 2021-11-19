import React, { useRef, ReactNode } from 'react'
import {
  motion,
  MotionValue,
  MotionProps
} from 'framer-motion'
import { styled } from '@mui/material'

const StyledCard = styled(motion.div)`
  position: absolute;
`

interface CardProps {
  drag?: boolean
  onVote?: (result: boolean) => void
  onTransformChange?: (x: MotionValue<number>) => void
  children: ReactNode
}

const Card: React.FC<CardProps & MotionProps> = ({
  children,
  onVote,
  onTransformChange,
  ...props
}) => {
  const cardElem = useRef<HTMLDivElement>(null)

  return (
    <StyledCard
      dragConstraints={{ left: 0, right: 0 }}
      drag="x"
      dragElastic={0.6}
      ref={cardElem}
      {...props}
    >
      {children}
    </StyledCard>
  )
}

export default React.memo(Card)
