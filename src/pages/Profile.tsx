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
import {
  CARD_MAX_WIDTH,
  COVER_MAX_HEIGHT,
  CIRCLE_WIDTH,
  BOTTOM_BAR_HEIGHT,
} from 'src/config/constants'
import { useSelector } from 'src/hooks'
import { Navigate, Link } from 'react-router-dom'
import FetchingState from 'src/interfaces/FetchingState'
import Spinner from 'src/components/blocks/Spinner'
import Avatar from 'src/components/blocks/Avatar'
import randomGradient from 'random-gradient'

import { Icon24ChevronRight } from '@vkontakte/icons'

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  overflow: 'auto',
})

const Container = styled(Box)({
  width: '100%',
  maxWidth: CARD_MAX_WIDTH,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: '100%',
  flexFlow: 'column',
})

const CoverContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: CARD_MAX_WIDTH,
  borderRadius: 12,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up(CARD_MAX_WIDTH)]: {
    boxShadow: '0 0 0 1px ' + alpha(theme.palette.text.primary, 0.01),
  },
}))

const Paper = styled(MUIPaper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2, 0),
  boxShadow: 'none',
  borderRadius: 12,
  width: '100%',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up(CARD_MAX_WIDTH)]: {
    boxShadow: '0 0 0 1px ' + alpha(theme.palette.text.primary, 0.01),
  },
}))

const PaperWithCover = styled(MUIPaper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  boxShadow: 'none',
  borderRadius: 12,
  width: '100%',
  paddingTop: 0,
}))

const HeaderText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  fontSize: 24,
  fontFamily: 'Google Sans',
  fontWeight: 900,
  color: theme.palette.text.primary,
}))

const SubheaderText = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontFamily: 'Google Sans',
  fontWeight: 500,
  color: alpha(theme.palette.text.primary, 0.38),
}))

const Description = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 4,
  whiteSpace: 'break-spaces',
  wordBreak: 'break-all',
  overflow: 'hidden',
}))

const CoverBox = styled(Box)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  aspectRatio: `${CARD_MAX_WIDTH}/${COVER_MAX_HEIGHT}`,
  [theme.breakpoints.up(CARD_MAX_WIDTH)]: {
    borderRadius: 12,
    marginTop: theme.spacing(2),
  },
}))

const CoverImage = styled('img')({
  height: 'auto',
  width: '100%',
})

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
})

const CustomListItemText = styled(ListItemText)({
  fontFamily: 'Roboto',
  fontWeight: 500,
})

const CustomDivider = styled(Divider)({
  borderColor: alpha('#000000', 0.05),
})

const CustomChevronRight = styled(Icon24ChevronRight)({
  color: alpha('#000000', 0.17),
})

const SpinnerBox = () => (
  <Box
    sx={{
      display: 'flex',
      width: '100%',
      height: 'calc(100vh - 56px - 56px)',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Spinner
      sx={{ color: (theme) => theme.palette.primary.main }}
      width={44}
      height={44}
    />
  </Box>
)

const Profile = () => {
  const profile = useSelector((store) => store.profile.data)
  const profileState = useSelector((store) => store.profile.state)
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <Root>
      {profileState === FetchingState.Fetching && <SpinnerBox />}
      {profileState === FetchingState.Fetched && (
        <Container>
          <CoverContainer>
            <CoverBox
              sx={{
                background: randomGradient(profile.username),
              }}
            >
              {profile.coverUrl && <CoverImage src={profile.coverUrl} />}
            </CoverBox>
            <PaperWithCover>
              <Avatar
                src={profile.avatarUrl}
                uid={profile.username}
                letter={profile.name[0]}
                sx={{
                  mt: `-${CIRCLE_WIDTH / 2}px`,
                }}
              />
              <HeaderText>
                {profile.name} {profile.lastname}
              </HeaderText>
              <Description>{profile.information}</Description>
              <StyledLink
                sx={{ mt: (theme) => theme.spacing(2) }}
                to="/profile/edit"
              >
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    maxWidth: CARD_MAX_WIDTH,
                  }}
                  color="primary"
                  variant="transparent"
                >
                  Редактировать информацию
                </Button>
              </StyledLink>
            </PaperWithCover>
          </CoverContainer>
          <Paper>
            <SubheaderText
              sx={{
                px: (theme) => theme.spacing(2),
              }}
            >
              Созданные проекты
            </SubheaderText>
            {profile.projects.length !== 0 && (
              <List>
                {profile.projects.map((project) => (
                  <Box key={project.slug}>
                    <ListItem
                      sx={{
                        py: (theme) => theme.spacing(2),
                      }}
                      button
                      secondaryAction={<CustomChevronRight />}
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
                        {project.title}
                      </CustomListItemText>
                    </ListItem>
                    <CustomDivider />
                  </Box>
                ))}
              </List>
            )}
            <Box sx={{ px: 2 }}>
              {profile.projects.length === 0 && (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                  }}
                >
                  <Typography>Нет проектов</Typography>
                </Box>
              )}
              <StyledLink to="/project/create">
                <Button fullWidth variant="contained" color="secondary">
                  Создать проект
                </Button>
              </StyledLink>
            </Box>
          </Paper>
        </Container>
      )}
    </Root>
  )
}

export default React.memo(Profile)
