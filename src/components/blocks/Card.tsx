import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { alpha, styled, Theme } from '@mui/material'
import { SxProps } from '@mui/system'
import {
  BOTTOM_BAR_HEIGHT,
  TOP_CARD_MARGIN,
  CARD_MAX_WIDTH,
  CHROME_ADDRESS_BAR_HEIGHT,
} from 'src/config/constants'
import isMobile from 'is-mobile'
import CardDialog from './CardDialog'

const StyledCard = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  background: theme.palette.background.paper,
  width: `calc(100vw - ${theme.spacing(2)} - ${theme.spacing(2)})`,
  margin: 'auto',
  maxHeight: `calc(100vh - ${BOTTOM_BAR_HEIGHT}px - ${
    TOP_CARD_MARGIN * 2
  }px - ${isMobile() ? CHROME_ADDRESS_BAR_HEIGHT : 0}px)`,
  aspectRatio: '1/1.75',
  display: 'flex',
  boxShadow: '0 0 24px 0 ' + alpha(theme.palette.text.primary, 0.15),
  borderRadius: 24,
  maxWidth: CARD_MAX_WIDTH,
  overflow: 'hidden',
}))
const Content = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  flexDirection: 'column',
  display: 'flex',
  maxWidth: CARD_MAX_WIDTH,
  borderRadius: 12,
  height: '100%',
  position: 'relative',
  width: '100%',
}))

interface CardProps {
  open: boolean
  title?: string
  children: ({ isExpanded: boolean }) => React.ReactElement
  setClosed: () => unknown
  voteLike: () => unknown
  voteReject: () => unknown
  sx?: SxProps<Theme>
}

const Card: React.FC<CardProps & MotionProps> = ({
  open,
  children,
  setClosed,
  title = '',
  voteLike,
  voteReject,
  ...props
}) => {
  return (
    <>
      <CardDialog
        open={open}
        setClosed={setClosed}
        voteLike={voteLike}
        voteReject={voteReject}
        title={title}
      >
        {children}
      </CardDialog>
      <StyledCard
        dragConstraints={{ left: 0, right: 0 }}
        drag="x"
        dragElastic={0.9}
        {...props}
      >
        <Content>{children({ isExpanded: false })}</Content>
      </StyledCard>
    </>
  )
}

export default React.memo(Card)
