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
  Typography,
  alpha,
  Box,
  ListItem,
  ListItemAvatar,
} from '@mui/material'
import { Icon24ChevronRight } from '@vkontakte/icons'
const Notifications = () => {
  const SubheaderText = styled(Typography)(({ theme }) => ({
    width: '100%',
    height: '100%',
    fontSize: '24px',
    fontFamily: 'Google sans',
    fontWeight: 'bold',
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  }))
  const CustomListItemText1 = styled(ListItemText)({
    marginBottom: '-6px',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'bold',
  })
  const CustomListItemText2 = styled(ListItemText)({
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'medium',
    color: alpha('#000000', 0.5),
  })

  const CustomDivider = styled(Divider)({
    borderColor: alpha('#000000', 0.05),
  })

  const CustomChevronRight = styled(Icon24ChevronRight)({
    color: alpha('#000000', 0.17),
  })

  const [number, setNumber] = useState(16)
  return (
    <List sx={{ width: '100%', height: '100%' }}>
      {
        <SubheaderText
          sx={{
            alignItems: 'flex-end',
            px: (theme) => theme.spacing(2),
          }}
        >
          Уведомления
          <div
            style={{
              marginLeft: '8px',
              color: '#FF1744',
            }}
          >
            {number}
          </div>
        </SubheaderText>
      }
      <Box>
        <ListItem
          sx={{
            width: '100%',
            height: '100%',
            py: (theme) => theme.spacing(2),
          }}
          button
          secondaryAction={<CustomChevronRight />}
        >
          <ListItemAvatar>
            <Avatar style={{ color: '#7B61FF', background: '#7B61FF' }} />
          </ListItemAvatar>
          <div>
            <CustomListItemText1
              primaryTypographyProps={{
                marginBottom: '-6px',
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Project Finder
            </CustomListItemText1>
            <CustomListItemText2
              primaryTypographyProps={{
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: 'medium',
                color: alpha('#000000', 0.5),
              }}
            >
              Вас лайкнул этот проект
            </CustomListItemText2>
          </div>
        </ListItem>
        <CustomDivider />
        <ListItem
          sx={{
            width: '100%',
            height: '100%',
            py: (theme) => theme.spacing(2),
          }}
          button
          secondaryAction={<CustomChevronRight />}
        >
          <ListItemAvatar>
            <Avatar style={{ color: '#7B61FF', background: '#7B61FF' }} />
          </ListItemAvatar>
          <div>
            <CustomListItemText1
              primaryTypographyProps={{
                marginBottom: '-6px',
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Project Finder
            </CustomListItemText1>
            <CustomListItemText2
              primaryTypographyProps={{
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: 'medium',
                color: alpha('#000000', 0.5),
              }}
            >
              Вы подходите для проекта
            </CustomListItemText2>
          </div>
        </ListItem>
        <CustomDivider />
        <ListItem
          sx={{
            width: '100%',
            height: '100%',
            py: (theme) => theme.spacing(2),
          }}
          button
          secondaryAction={<CustomChevronRight />}
        >
          <ListItemAvatar>
            <Avatar style={{ color: '#7B61FF', background: '#7B61FF' }} />
          </ListItemAvatar>
          <div>
            <CustomListItemText1
              primaryTypographyProps={{
                marginBottom: '-6px',
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Project Finder
            </CustomListItemText1>
            <CustomListItemText2
              primaryTypographyProps={{
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: 'medium',
                color: alpha('#000000', 0.5),
              }}
            >
              Вы подходите для проекта
            </CustomListItemText2>
          </div>
        </ListItem>
        <CustomDivider />
      </Box>
    </List>
  )
}

export default React.memo(Notifications)
