import React from 'react'
import { Button, Fab, styled, alpha } from '@mui/material'
import Wifi from 'src/components/svg/Wifi'
import { MAX_CARD_WIDTH } from 'src/config/constants'

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  flex: 1,
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center'
  }
}))

const BottomLayout = styled('div')(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  display: 'flex',
  gap: '4px',
  flexDirection: 'column',
  alignItems: 'left',
  padding: '16px',
  margin: '0 auto',
  maxWidth: MAX_CARD_WIDTH,
  [theme.breakpoints.up('sm')]: {
    bottom: 'auto'
  }
}))

const FabIcon = styled(Fab)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 1px 8px ' + alpha(theme.palette.text.primary, 0.05),
  marginBottom: theme.spacing(0.5),
}))

const NoConnection = styled('div')(({ theme }) => ({
  fontWeight: 900,
  fontSize: 24,
  display: 'flex',
  fontFamily: 'Google Sans',
}))

const TryLater = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 16,
  display: 'flex',
}))

const TryAgainButton = styled(Button)(({ theme }) => ({
  width: '100%',
  fontSize: '16px',
  color: theme.palette.text.primary,
  background: theme.palette.background.paper,
  boxShadow: '0px 2px 24px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  marginTop: theme.spacing(4),
  borderRadius: 12,
  minHeight: 48,
}))

const Offline = () => {
  return (
    <Container>
      <BottomLayout>
        <FabIcon size="small">
          <Wifi />
        </FabIcon>
        <NoConnection>Нет интернет-соединения</NoConnection>
        <TryLater>Попробуйте повторить позднее</TryLater>
        <TryAgainButton
          variant="contained"
          color="inherit"
          onClick={() => {
            location.reload()
          }}
        >
          Повторить попытку
        </TryAgainButton>
      </BottomLayout>
    </Container>
  )
}

export default React.memo(Offline)
