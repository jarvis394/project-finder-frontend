import React, { useRef } from 'react'
import { motion, MotionProps } from 'framer-motion'
import {
  alpha,
  styled,
  Dialog,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  DialogActions,
  Grid,
  ButtonBase,
  Slide,
} from '@mui/material'
import {
  BOTTOM_BAR_HEIGHT,
  TOP_CARD_MARGIN,
  MAX_CARD_WIDTH,
} from 'src/config/constants'
import CloseIcon from '@mui/icons-material/CloseRounded'
import { Icon24Cancel } from '@vkontakte/icons'
import { Icon24LikeOutline } from '@vkontakte/icons'
import { TransitionProps } from '@mui/material/transitions'

const StyledCard = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  background: theme.palette.background.paper,
  width: `calc(100vw - ${theme.spacing(2)} - ${theme.spacing(2)})`,
  margin: 'auto',
  maxHeight: `calc(100vh - ${BOTTOM_BAR_HEIGHT}px - ${TOP_CARD_MARGIN * 2}px)`,
  aspectRatio: '1/1.75',
  display: 'flex',
  boxShadow: '0 0 24px 0 ' + alpha(theme.palette.text.primary, 0.15),
  borderRadius: 24,
  maxWidth: MAX_CARD_WIDTH,
}))
const Content = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  flexDirection: 'column',
  display: 'flex',
  maxWidth: MAX_CARD_WIDTH,
  borderRadius: 12,
  height: '100%',
}))
const DialogAppBar = styled(AppBar)(({ theme }) => ({
  minHeight: '56px !important',
  height: '56px !important',
  color: theme.palette.text.primary,
  background: theme.palette.background.paper,
  boxShadow: 'none',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
}))
const DialogToolbar = styled(Toolbar)({
  minHeight: '56px !important',
  height: '56px !important',
})
const CardDialogPaper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.background.paper,
  width: '100%',
  height: '100%',
  borderRadius: '12px !important',
}))
const CardDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.background.paper,
  width: '100%',
  position: 'fixed',
  bottom: 0,
  maxWidth: MAX_CARD_WIDTH,
}))
const CardDialogActionButtonLabel = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1.5),
  fontFamily: 'Google Sans',
  fontWeight: 500,
  fontSize: 16,
  color: theme.palette.text.primary,
}))
const Title = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'Google Sans',
  fontSize: 20,
  fontWeight: 500,
  flexGrow: 1,
  height: '100%',
})
const Offset = styled('div')({ height: 56, display: 'flex', flexShrink: 0 })
const CenteredButtonBase = styled(ButtonBase)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: BOTTOM_BAR_HEIGHT,
  borderRadius: 12,
})

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface CardProps {
  open: boolean
  title?: string
  children: ({ isExpanded: boolean }) => React.ReactElement
  setClosed: () => unknown
  voteLike: () => unknown
  voteReject: () => unknown
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
  const dialogRef = useRef()
  const handleLikeClick = () => {
    setClosed()
    voteLike()
  }
  const handleRejectClick = () => {
    setClosed()
    voteReject()
  }

  return (
    <>
      <Dialog
        PaperComponent={CardDialogPaper}
        open={open}
        fullScreen
        PaperProps={{ ref: dialogRef }}
        TransitionComponent={Transition}
      >
        <DialogAppBar position="fixed">
          <DialogToolbar>
            <Title>{title}</Title>
            <IconButton color="inherit" onClick={setClosed} aria-label="close">
              <CloseIcon />
            </IconButton>
          </DialogToolbar>
        </DialogAppBar>
        <Offset />
        <Content>{children({ isExpanded: true })}</Content>
        <CardDialogActions>
          <Grid container>
            <Grid
              component={CenteredButtonBase}
              sx={{ color: (theme) => theme.palette.secondary.main }}
              item
              xs={6}
              onClick={handleRejectClick}
            >
              <Icon24Cancel />
              <CardDialogActionButtonLabel>
                Отклонить
              </CardDialogActionButtonLabel>
            </Grid>
            <Grid
              component={CenteredButtonBase}
              sx={{ color: (theme) => theme.palette.primary.main }}
              item
              xs={6}
              onClick={handleLikeClick}
            >
              <Icon24LikeOutline />
              <CardDialogActionButtonLabel>
                Нравится
              </CardDialogActionButtonLabel>
            </Grid>
          </Grid>
        </CardDialogActions>
      </Dialog>
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
