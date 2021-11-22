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
const SkillTagsContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1.5),
}))

interface ProjectCardProps {
  // FIXME: add proper Project types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

const ProjectCard: React.FC<ProjectCardProps & MotionProps> = ({
  data,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false)
  const openCard = () => setOpen(true)
  const closeCard = () => setOpen(false)
  const shouldShowAndMoreSkillTag = useMemo(
    () => !isOpen && data.skillTags.length > MAX_SKILL_TAGS_DISPLAYED,
    [data.skillTags, isOpen]
  )
  const skillTagsOverflowCount = useMemo(
    () => data.skillTags.length - MAX_SKILL_TAGS_DISPLAYED,
    [data.skillTags]
  )

  return (
    <Card title={'Проект'} open={isOpen} setClosed={closeCard} {...props}>
      <Avatar src={data.avatarUrl} uid={data.title} letter={data.title[0]} />
      <Title>{data.title}</Title>
      <Description open={isOpen} variant="body1" onClick={openCard}>
        {data.description}
      </Description>
      <SkillTagsContainer>
        <Grid spacing={1} container>
          {data.skillTags
            .slice(0, isOpen ? data.skillTags.length : MAX_SKILL_TAGS_DISPLAYED)
            .map((e, i) => (
              <Grid item key={i}>
                <SkillTag label={e.name} />
              </Grid>
            ))}
          {shouldShowAndMoreSkillTag && (
            <Grid item onClick={openCard}>
              <SkillTag
                variant="outlined"
                label={'и ещё ' + skillTagsOverflowCount}
              />
            </Grid>
          )}
        </Grid>
      </SkillTagsContainer>
    </Card>
  )
}

export default React.memo(ProjectCard)
