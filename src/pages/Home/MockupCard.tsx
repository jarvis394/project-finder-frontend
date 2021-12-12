import { styled, alpha, Typography, Grid } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import Avatar from 'src/components/blocks/Avatar'
import SkillTag from 'src/components/blocks/SkillTag'
import {
  BOTTOM_BAR_HEIGHT,
  TOP_CARD_MARGIN,
  CARD_MAX_WIDTH,
  COVER_MAX_HEIGHT,
  BUTTON_MAX_WIDTH,
} from 'src/config/constants'

const StyledCard = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  background: theme.palette.background.paper,
  width: `calc(100vw - ${theme.spacing(2)} - ${theme.spacing(2)})`,
  margin: 'auto',
  maxHeight: `calc(50vh - ${BOTTOM_BAR_HEIGHT}px - ${TOP_CARD_MARGIN}px)`,
  aspectRatio: '1/1.25',
  display: 'flex',
  boxShadow: '0 0 24px 0 ' + alpha(theme.palette.text.primary, 0.15),
  borderRadius: 24,
  maxWidth: BUTTON_MAX_WIDTH,
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    maxHeight: `calc(100vh - ${BOTTOM_BAR_HEIGHT}px - ${
      TOP_CARD_MARGIN * 2
    }px)`,
    aspectRatio: '1/1.75',
  },
}))

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

const Title = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  fontSize: 24,
  fontFamily: 'Google Sans',
  fontWeight: 900,
  color: theme.palette.text.primary,
}))
const Description = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  display: 'flex',
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    flexGrow: 0,
  },
}))
const SkillTagsContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  flex: 2,
  display: 'flex',
}))
const CoverImage = styled('div')(({ theme }) => ({
  width: '100%',
  height: COVER_MAX_HEIGHT,
  position: 'absolute',
  left: 0,
  top: 0,
  overflow: 'hidden',
  display: 'none',
  alignItems: 'center',
  borderRadius: 12,
  background:
    'linear-gradient(45deg, rgba(124,77,255,1) 0%, rgba(255,23,68,1) 100%)',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))
const CoverImageOffset = styled('div')(({ theme }) => ({
  display: 'none',
  flexShrink: 0,
  height: 108,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
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
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 72,
  height: 72,
  zIndex: 1,
  fontSize: 32,
  background:
    'linear-gradient(45deg, rgba(100,100,100,1) 0%, rgba(255,23,68,1) 100%)',
  color: 'white',
  [theme.breakpoints.up('md')]: {
    width: 96,
    height: 96,
    fontSize: 44,
  },
}))

const MockupCard: React.FC<{
  variant: 'project' | 'specialist'
}> = ({ variant }) => {
  return (
    <StyledCard>
      <Content>
        <CoverImage />
        <CoverImageOffset />
        <StyledAvatar
          uid={'qwerty'}
          letter={variant === 'project' ? 'P' : 'В'}
        />
        {variant === 'project' && <Title>Project Finder</Title>}
        {variant === 'specialist' && <Title>Василий Романов</Title>}
        {variant === 'project' && (
          <Description variant="body1">
            Ищем разработчика интерфейсов на React TypeScript
          </Description>
        )}
        {variant === 'specialist' && (
          <Description variant="body1">
            Пишу на React больше 5-и лет, работал в Facebook над Messenger
          </Description>
        )}
        {variant === 'project' && (
          <SectionHeader>Требуемые навыки</SectionHeader>
        )}
        {variant === 'specialist' && <SectionHeader>Навыки</SectionHeader>}
        <SkillTagsContainer>
          <Grid spacing={1} container sx={{ height: 'fit-content' }}>
            <Grid item>
              <SkillTag label={'React'} />
            </Grid>
            <Grid item>
              <SkillTag label={'TypeScript'} />
            </Grid>
            {variant === 'project' && (
              <Grid item>
                <SkillTag label={'Figma'} />
              </Grid>
            )}
            <Grid item>
              <SkillTag label={'Material Design'} />
            </Grid>
            {variant === 'specialist' && (
              <Grid item>
                <SkillTag label={'UI/UX'} />
              </Grid>
            )}
          </Grid>
        </SkillTagsContainer>
      </Content>
    </StyledCard>
  )
}

export default MockupCard
