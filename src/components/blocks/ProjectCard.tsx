import { Grid, styled, Typography } from '@mui/material'
import { MotionProps } from 'framer-motion'
import React, { useMemo, useState } from 'react'
import { MAX_SKILL_TAGS_DISPLAYED } from 'src/config/constants'
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
  marginTop: theme.spacing(1.5),
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

interface ProjectCardProps {
  // FIXME: add proper Project types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  voteLike: () => unknown
  voteReject: () => unknown
}

const ProjectCard: React.FC<ProjectCardProps & MotionProps> = ({
  data,
  voteLike,
  voteReject,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false)
  const openCard = () => setOpen(true)
  const closeCard = () => setOpen(false)
  const shouldShowAndMoreSkillTag = useMemo(
    () => data.skillTags.length > MAX_SKILL_TAGS_DISPLAYED,
    [data.skillTags, isOpen]
  )
  const skillTagsOverflowCount = useMemo(
    () => data.skillTags.length - MAX_SKILL_TAGS_DISPLAYED,
    [data.skillTags]
  )

  return (
    <Card
      voteLike={voteLike}
      voteReject={voteReject}
      title={'Проект'}
      open={isOpen}
      setClosed={closeCard}
      {...props}
    >
      {({ isExpanded }) => (
        <>
          <Avatar
            src={data.avatarUrl}
            uid={data.title}
            letter={data.title[0]}
          />
          <Title>{data.title}</Title>
          <Description open={isExpanded} variant="body1" onClick={openCard}>
            {data.description}
          </Description>
          <SkillTagsContainer isExpanded={isExpanded}>
            <Grid spacing={1} container sx={{ height: 'fit-content' }}>
              {data.skillTags
                .slice(
                  0,
                  isExpanded ? data.skillTags.length : MAX_SKILL_TAGS_DISPLAYED
                )
                .map((e, i) => (
                  <Grid item key={i}>
                    <SkillTag label={e.name} />
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
        </>
      )}
    </Card>
  )
}

export default React.memo(ProjectCard)
