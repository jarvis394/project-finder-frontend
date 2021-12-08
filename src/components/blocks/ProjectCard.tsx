import { Grid, styled, Typography } from '@mui/material'
import { DragHandlers, MotionProps } from 'framer-motion'
import { Project } from 'project-finder-backend-types'
import React, { useCallback, useMemo, useState } from 'react'
import {
  COVER_MAX_HEIGHT,
  CARD_MAX_WIDTH,
  MAX_SKILL_TAGS_DISPLAYED,
} from 'src/config/constants'
import Avatar from './Avatar'
import Card from './Card'
import SkillTag from './SkillTag'

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
const CoverImageContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  width: '100%',
  background: theme.palette.action.focus,
  height: COVER_MAX_HEIGHT,
  position: 'absolute',
  left: 0,
  top: 0,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  borderRadius: 0,
  [theme.breakpoints.up(CARD_MAX_WIDTH)]: {
    borderRadius: isExpanded ? 12 : 0,
  },
}))
const CoverImageOffset = styled('div')({
  height: 108,
  display: 'flex',
  flexShrink: 0,
})
const CoverImage = styled('img')({
  height: 'auto',
  width: '100%',
})
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

export interface ProjectCardProps {
  data: Project
  voteLike: () => unknown
  voteReject: () => unknown
}

const ProjectCard: React.FC<ProjectCardProps & MotionProps> = ({
  data,
  voteLike,
  voteReject,
  onDragStart: onDragStartPassed,
  onDragTransitionEnd: onDragTransitionEndPassed,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const openCard = useCallback(() => {
    !isDragging && setOpen(true)
  }, [isDragging])
  const closeCard = () => setOpen(false)
  const shouldShowAndMoreSkillTag = useMemo(
    () => data.skillTags.length > MAX_SKILL_TAGS_DISPLAYED,
    [data.skillTags]
  )
  const skillTagsOverflowCount = useMemo(
    () => data.skillTags.length - MAX_SKILL_TAGS_DISPLAYED,
    [data.skillTags]
  )
  const onDragStart: DragHandlers['onDragStart'] = (...dragStartProps) => {
    onDragStartPassed && onDragStartPassed(...dragStartProps)
    setIsDragging(true)
  }
  const onDragTransitionEnd: DragHandlers['onDragTransitionEnd'] = (
    ...dragTransitionEndProps
  ) => {
    onDragTransitionEndPassed &&
      onDragTransitionEndPassed(...dragTransitionEndProps)
    setIsDragging(false)
  }

  return (
    <Card
      voteLike={voteLike}
      voteReject={voteReject}
      title={'Проект'}
      open={isOpen}
      setClosed={closeCard}
      onDragStart={onDragStart}
      onDragTransitionEnd={onDragTransitionEnd}
      {...props}
    >
      {({ isExpanded }) => (
        <>
          {data.coverUrl && (
            <>
              <CoverImageContainer isExpanded={isExpanded}>
                <CoverImage src={data.coverUrl} />
              </CoverImageContainer>
              <CoverImageOffset />
            </>
          )}
          <Avatar
            src={data.avatarUrl}
            uid={data.title}
            letter={data.title[0]}
            sx={{
              zIndex: 1,
            }}
          />
          <Title>{data.title}</Title>
          <Description open={isExpanded} variant="body1" onClick={openCard}>
            {data.description}
          </Description>
          <SectionHeader>Требуемые навыки</SectionHeader>
          <SkillTagsContainer isExpanded={isExpanded}>
            <Grid spacing={1} container sx={{ height: 'fit-content' }}>
              {data.skillTags
                .slice(
                  0,
                  isExpanded ? data.skillTags.length : MAX_SKILL_TAGS_DISPLAYED
                )
                .map((e, i) => (
                  <Grid item key={i}>
                    <SkillTag label={e.label} />
                  </Grid>
                ))}
              {!isExpanded && shouldShowAndMoreSkillTag && (
                <Grid item onClick={openCard}>
                  <SkillTag
                    variant="outlined"
                    label={'и ещё ' + skillTagsOverflowCount}
                  />
                </Grid>
              )}
            </Grid>
          </SkillTagsContainer>
          <Location>
            {data.location}
            {data.canRemote && (
              <>
                <Bullet>•</Bullet>
                Можно удаленно
              </>
            )}
          </Location>
          <ProfileContainer>
            <Avatar
              size="small"
              src={data.user.avatarUrl}
              letter={data.user.name[0]}
              uid={data.user.username}
            />
            <ProfileUsername>
              {data.user.name} {data.user.lastname}
            </ProfileUsername>
          </ProfileContainer>
        </>
      )}
    </Card>
  )
}

export default React.memo(ProjectCard)
