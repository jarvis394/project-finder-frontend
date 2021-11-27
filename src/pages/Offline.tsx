import React from 'react'
import styled from '@emotion/styled'
import { Button, Fab } from '@mui/material'
import Wifi from '../components/svg/Wifi'

const BottomLayout = styled('div')(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  display: 'flex',
  gap: '4px',
  flexDirection: 'column',
  alignItems: 'left',
  padding: '16px',
}))

const FabIcon = styled(Fab)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 1px',
  marginBottom: '4px',
}))

const NoConnection = styled('div')(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '24px',
  display: 'flex',
}))

const TryLater = styled('div')(({ theme }) => ({
  color: 'gray',
  fontSize: '14px',
  display: 'flex',
}))

const TryAgain = styled(Button)(({ theme }) => ({
  width: '100%',
  fontSize: '22px',
  color: 'black',
  background: 'white',
  borderColor: 'black',
  boxShadow: '0px 0px 2px',
  display: 'flex',
  marginTop: '32px',
}))

const Offline = () => {
  return (
    <BottomLayout>
      <FabIcon size="small">
        <Wifi />
      </FabIcon>
      <NoConnection>Нет интернет-соединения</NoConnection>
      <TryLater>Попробуйте повторить позднее</TryLater>
      <TryAgain
        variant="contained"
        onClick={() => {
          location.reload()
        }}
      >
        Повторить попытку
      </TryAgain>
    </BottomLayout>
  )
}

export default React.memo(Offline)
