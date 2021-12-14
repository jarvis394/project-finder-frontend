import React, { useCallback, useState } from 'react'
import {
  Divider,
  List,
  ListItemText,
  styled,
  Typography,
  alpha,
  Box,
  ListItem,
  ListItemAvatar,
  Grid,
} from '@mui/material'
import { Icon24ChevronRight } from '@vkontakte/icons'
import Avatar from 'src/components/blocks/Avatar'
import { CARD_MAX_WIDTH, COVER_MAX_HEIGHT } from 'src/config/constants'
import CardDialog from 'src/components/blocks/CardDialog'
import SkillTag from 'src/components/blocks/SkillTag'

const Title = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  fontSize: 24,
  fontFamily: 'Google Sans',
  fontWeight: 900,
  color: theme.palette.text.primary,
}))
const Description = styled(Typography, {
  shouldForwardProp: (p) => p !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  marginTop: theme.spacing(0.5),
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: open ? 'none' : 8,
  overflow: open ? 'visible' : 'hidden',
}))
const SkillTagsContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  marginTop: theme.spacing(1),
  flex: isExpanded ? 0 : 2,
  display: 'flex',
}))
const Location = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  color: theme.palette.text.secondary,
  flexDirection: 'row',
  flexWrap: 'wrap',
}))
const Bullet = styled('div')(({ theme }) => ({
  margin: theme.spacing(0, 1),
}))
const ProfileContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}))
const ProfileUsername = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: 16,
  fontFamily: 'Google Sans',
  fontWeight: 500,
}))
const SectionHeader = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontFamily: 'Google Sans',
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(2),
}))
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

const PROJECTS = [
  {
    title: 'Project Finder',
    description: 'Вас лайкнул этот проект',
    cardTitle: 'Проект',
    labels: [{ label: 'Excel' }, { label: 'PowerPoint' }],
    username: 'Василий Пупкин',
    information:
      'Требуются мобильные разработчики, желательно со стажем коммерческой разработки.',
  },
  {
    title: 'ITMO.STUDENTS',
    description: 'Вас лайкнул этот проект',
    cardTitle: 'Проект',
    labels: [{ label: 'React' }, { label: 'TypeScript' }],
    username: 'Василий Пупкин',
    information:
      'Требуются React Native разработчики. В стеке используем Redux Saga.',
  },
  {
    title: 'Tinder in ITMO',
    description: 'Вы подходите для проекта',
    cardTitle: 'Проект',
    labels: [{ label: 'React' }, { label: 'Node.JS' }],
    username: 'Василий Пупкин',
    information:
      'Ищем Fullstack middle-разработчика со знанием JavaScript более 5 лет',
  },
]

const Notifications = () => {
  const [projects, setProjects] = useState(PROJECTS)
  const [number, setNumber] = useState(PROJECTS.length)
  const [isCardOpened, setIsCardOpened] = useState(false)
  const [openedCardIndex, setOpenedCardIndex] = useState(0)
  const [openedCard, setOpenedCard] = useState(PROJECTS[0])
  const openCard = (index: number) => {
    setIsCardOpened(true)
    setOpenedCard(projects[index])
    setOpenedCardIndex(index)
  }
  const closeCard = useCallback(() => {
    const temp = [...projects]
    temp.splice(openedCardIndex, 1)
    setIsCardOpened(false)
    setProjects(temp)
    setNumber(temp.length)
  }, [projects, openedCardIndex])

  return (
    <>
      <CardDialog
        open={isCardOpened}
        setClosed={closeCard}
        voteLike={closeCard}
        voteReject={closeCard}
        title={openedCard.cardTitle}
      >
        {({ isExpanded }) => (
          <>
            <Avatar
              uid={openedCard.title}
              letter={openedCard.title[0]}
              sx={{
                zIndex: 1,
              }}
            />
            <Title>{openedCard.title}</Title>
            <Description open={true} variant="body1">
              {openedCard.information}
            </Description>
            <SectionHeader>Требуемые навыки</SectionHeader>
            <SkillTagsContainer isExpanded={true}>
              <Grid spacing={1} container sx={{ height: 'fit-content' }}>
                {openedCard.labels.map((e, i) => (
                  <Grid item key={i}>
                    <SkillTag label={e.label} />
                  </Grid>
                ))}
              </Grid>
            </SkillTagsContainer>
            <Location>
              Россия, Санкт-Петербург
              <Bullet>•</Bullet>
              Можно удаленно
            </Location>
            <ProfileContainer>
              <Avatar
                size="small"
                letter={openedCard.username[0]}
                uid={openedCard.username}
              />
              <ProfileUsername>Василий Пупкин</ProfileUsername>
            </ProfileContainer>
          </>
        )}
      </CardDialog>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          background: (theme) => theme.palette.background.paper,
          mb: 2,
        }}
      >
        <SubheaderText
          sx={{
            alignItems: 'flex-end',
            px: 2,
            py: 1.25,
            width: '100%',
            maxWidth: CARD_MAX_WIDTH,
          }}
        >
          Уведомления
          <Box
            component="span"
            sx={{
              ml: 1,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            {number}
          </Box>
        </SubheaderText>
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <List
          sx={{
            width: '100%',
            maxWidth: CARD_MAX_WIDTH,
            border: (theme) =>
              '1px solid ' + alpha(theme.palette.text.primary, 0.03),
            py: 1,
            background: (theme) => theme.palette.background.paper,
            borderRadius: '12px',
          }}
        >
          {projects.map((e, i) => (
            <Box key={i}>
              <ListItem
                sx={{
                  width: '100%',
                  height: '100%',
                  py: (theme) => theme.spacing(1.25),
                }}
                button
                onClick={() => openCard(i)}
                secondaryAction={<CustomChevronRight />}
              >
                <ListItemAvatar>
                  <Avatar uid={e.title} letter={e.title[0]} size="medium" />
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
                    {e.title}
                  </CustomListItemText1>
                  <CustomListItemText2
                    primaryTypographyProps={{
                      fontFamily: 'Roboto',
                      fontSize: '14px',
                      fontWeight: '400',
                      color: alpha('#000000', 0.5),
                    }}
                  >
                    {e.description}
                  </CustomListItemText2>
                </div>
              </ListItem>
              {i !== projects.length - 1 && <CustomDivider />}
            </Box>
          ))}
          {projects.length === 0 && (
            <Box
              sx={{
                py: 2,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Нет уведомлений
            </Box>
          )}
        </List>
      </Box>
    </>
  )
}

export default React.memo(Notifications)
