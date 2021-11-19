import React, { useRef, ReactNode } from 'react'
import { motion, MotionValue, MotionProps } from 'framer-motion'
import { styled } from '@mui/material'

const StyledCard = styled(motion.div)`
  position: absolute;
  background: #fff;
  width: calc(100vw - 32px);
  margin: auto;
  max-height: calc(100vh - 56px - 90px);
  aspect-ratio: 1/1.75;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
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
      dragElastic={0.9}
      ref={cardElem}
      {...props}
    >
      {children}
    </StyledCard>
  )
}

export default React.memo(Card)
