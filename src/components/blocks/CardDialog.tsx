import {
  AppBar,
  Toolbar,
  DialogActions,
  Typography,
  Slide,
  Dialog,
  IconButton,
  Grid,
  styled,
  ButtonBase,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { SxProps, Theme } from '@mui/system'
import { Icon24Cancel, Icon24LikeOutline } from '@vkontakte/icons'
import React from 'react'
import { BOTTOM_BAR_HEIGHT, CARD_MAX_WIDTH } from 'src/config/constants'
import CloseIcon from '@mui/icons-material/CloseRounded'

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
  maxWidth: CARD_MAX_WIDTH,
}))
const CardDialogActionButtonLabel = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1.5),
  fontFamily: 'Google Sans',
  fontWeight: 500,
  fontSize: 16,
  color: theme.palette.text.primary,
}))

const Offset = styled('div')({ height: 56, display: 'flex', flexShrink: 0 })
const CenteredButtonBase = styled(ButtonBase)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: BOTTOM_BAR_HEIGHT,
  borderRadius: 12,
})

const Title = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'Google Sans',
  fontSize: 20,
  fontWeight: 500,
  flexGrow: 1,
  height: '100%',
})

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface CardDialogProps {
  open: boolean
  children: ({ isExpanded: boolean }) => React.ReactElement
  setClosed: () => unknown
  voteLike: () => unknown
  voteReject: () => unknown
  sx?: SxProps<Theme>
  title?: string
}

const CardDialog: React.FC<CardDialogProps> = ({
  sx,
  children,
  voteLike,
  voteReject,
  setClosed,
  title,
  open,
}) => {
  const handleLikeClick = () => {
    setClosed()
    voteLike()
  }
  const handleRejectClick = () => {
    setClosed()
    voteReject()
  }

  return (
    <Dialog
      PaperComponent={CardDialogPaper}
      open={open}
      fullScreen
      TransitionComponent={Transition}
      sx={sx}
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
      <Offset />
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
            <CardDialogActionButtonLabel>Отклонить</CardDialogActionButtonLabel>
          </Grid>
          <Grid
            component={CenteredButtonBase}
            sx={{ color: (theme) => theme.palette.primary.main }}
            item
            xs={6}
            onClick={handleLikeClick}
          >
            <Icon24LikeOutline />
            <CardDialogActionButtonLabel>Нравится</CardDialogActionButtonLabel>
          </Grid>
        </Grid>
      </CardDialogActions>
    </Dialog>
  )
}

export default React.memo(CardDialog)
