import React from 'react'
import {
  Box,
  styled,
  Typography,
  Button,
  Paper as MUIPaper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  alpha,
  Divider,
} from '@mui/material'

import Avatar from 'src/components/blocks/Avatar'
import { CARD_MAX_WIDTH, COVER_MAX_HEIGHT } from 'src/config/constants'

import { Icon24ChevronRight } from '@vkontakte/icons'

const Container = styled(Box)({
  width: '100%',
  maxWidth: CARD_MAX_WIDTH,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: '100%',
  flexFlow: 'column',
})

const Paper = styled(MUIPaper)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: theme.spacing(0, 0, 2, 0),
  boxShadow: 'none',
  borderRadius: 12,
  width: '100%',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up(CARD_MAX_WIDTH)]: {
    boxShadow: '0 0 0 1px ' + alpha(theme.palette.text.primary, 0.01),
  },
}))

const Title = styled(Typography)({
  fontSize: 32,
  fontFamily: 'Google Sans',
  fontWeight: 'bold',
  color: '#000000',
  textAlign: 'center',
})

const SubTitle = styled(Typography)({
  fontFamily: 'Google Sans',
  fontWeight: 'normal',
  textAlign: 'center',
  fontSize: 16,
})

const CoverBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  aspectRatio: `${CARD_MAX_WIDTH}/${COVER_MAX_HEIGHT}`,
})

const CustomDivider = styled(Divider)({
  borderColor: alpha('#000000', 0.05),
})

const CustomChevronRight = styled(Icon24ChevronRight)({
  color: alpha('#000000', 0.17),
})

const CustomListItemText = styled(ListItemText)({
  fontFamily: 'Roboto',
  fontWeight: 500,
})

type SelectProjectProps = {
  selectProject: () => void
}

const SelectProject: React.FC<SelectProjectProps> = ({ selectProject }) => {
  return (
    <Container>
      <CoverBox>
        <Title>Выбери проект</Title>
        <SubTitle>к которому хочешь найти специалистов</SubTitle>
      </CoverBox>
      <Paper>
        <List
          sx={{
            pt: 0,
            pb: (theme) => theme.spacing(2),
          }}
        >
          {Array(3)
            .fill(0)
            .map((project, projectIndex) => (
              <Box key={projectIndex}>
                <ListItem
                  sx={{
                    py: (theme) => theme.spacing(2),
                  }}
                  button
                  secondaryAction={<CustomChevronRight />}
                  onClick={selectProject}
                >
                  <ListItemAvatar>
                    <Avatar size={'medium'} />
                  </ListItemAvatar>
                  <CustomListItemText
                    primaryTypographyProps={{
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    ProjectFinder
                  </CustomListItemText>
                </ListItem>
                <CustomDivider />
              </Box>
            ))}
        </List>
        <Box
          sx={{
            px: (theme) => theme.spacing(2),
          }}
        >
          <Button fullWidth variant="contained" color="secondary">
            Создать проект
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default React.memo(SelectProject)
