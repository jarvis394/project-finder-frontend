import React, { useState } from 'react'
import styled from '@emotion/styled'
import {
  Avatar,
  Divider,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText as Description,
  Collapse,
  ListItemText,
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
const Notifications = () => {
  const Nots = styled(ListSubheader)(({ theme }) => ({
    width: '100%',
    height: '80%',
    color: 'black',
    bgcolor: 'background.paper',
    fontWeight: 500,
    fontSize: '28px',
    marginTop: '4px',
    display: 'flex',
    flexDirection: 'row',
  }))
  const [number, setNumber] = useState(16)
  const Counter = styled('div')(({ theme }) => ({
    marginLeft: '8px',
    fontSize: '32px',
    color: 'red',
  }))
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  const NotsList = styled(List)(({ theme }) => ({
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
  }))
  const Ava = styled(Avatar)(({ theme }) => ({
    background: '#7B61FF',
    color: '#7B61FF',
  }))
  const Description = styled(ListItemText)(({ theme }) => ({
    marginLeft: '10px',
  }))
  const ProFind = styled('div')(({ theme }) => ({
    marginBottom: '-2.5%',
    fontSize: '20px',
    fontWeight: 600,
  }))
  const Liked = styled('div')(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 500,
    color: 'gray',
  }))
  const Expand = styled(ExpandLess)(({ theme }) => ({}))
  return (
    <NotsList
      aria-labelledby="nested-list-subheader"
      subheader={
        <Nots>
          Уведомления <Counter>{number}</Counter>
        </Nots>
      }
    >
      <ListItemButton>
        <Ava />
        <Description>
          <ProFind>Project Finder</ProFind>
          <Liked>Вас лайкнул этот проект</Liked>
        </Description>
        {open ? <ExpandLess /> : <ExpandMore sx={{ color: 'gray' }} />}
      </ListItemButton>
      <Divider />
      <ListItemButton>
        <Ava />
        <Description>
          <ProFind>Project Finder</ProFind>
          <Liked>Вы подходите для проекта</Liked>
        </Description>
        {open ? <ExpandLess /> : <ExpandMore sx={{ color: 'gray' }} />}
      </ListItemButton>
      <Divider />
      <ListItemButton>
        <Ava />
        <Description>
          <ProFind>Project Finder</ProFind>
          <Liked>Вы подходите для проекта</Liked>
        </Description>
        {open ? <ExpandLess /> : <ExpandMore sx={{ color: 'gray' }} />}
      </ListItemButton>
      {/* <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </NotsList>
  )
}

export default React.memo(Notifications)
