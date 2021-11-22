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
  Divider,
} from '@mui/material'
import {
  BOTTOM_BAR_HEIGHT,
  TOP_CARD_MARGIN,
  MAX_CARD_WIDTH,
} from 'src/config/constants'
import CloseIcon from '@mui/icons-material/CloseRounded'
import { Icon24Cancel } from '@vkontakte/icons'
import { Icon24LikeOutline } from '@vkontakte/icons'

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
  borderRadius: 12
})

interface CardProps {
  open: boolean
  setClosed: () => unknown
  children: React.ReactElement[]
  title?: string
}

const Card: React.FC<CardProps & MotionProps> = ({
  open,
  children,
  setClosed,
  title = '',
  ...props
}) => {
  const dialogRef = useRef()

  return (
    <>
      <Dialog
        PaperComponent={CardDialogPaper}
        open={open}
        fullScreen
        PaperProps={{ ref: dialogRef }}
        transitionDuration={{ enter: 0, exit: 0 }}
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
        <Content>{children}</Content>
        <CardDialogActions>
          <Grid container>
            <Grid
              component={CenteredButtonBase}
              sx={{ color: (theme) => theme.palette.secondary.main }}
              item
              xs={6}
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
            >
              <Icon24LikeOutline />
              <CardDialogActionButtonLabel>
                Нравится
              </CardDialogActionButtonLabel>
            </Grid>
          </Grid>
        </CardDialogActions>
      </Dialog>
      {!open && (
        <StyledCard
          dragConstraints={{ left: 0, right: 0 }}
          drag="x"
          dragElastic={0.9}
          {...props}
        >
          <Content>{children}</Content>
        </StyledCard>
      )}
    </>
  )
}

export default React.memo(Card)
