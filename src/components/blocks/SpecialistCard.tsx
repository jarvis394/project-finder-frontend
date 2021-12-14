import { Grid, styled, Typography } from '@mui/material'
import { Icon20PlaceOutline } from '@vkontakte/icons'
import { DragHandlers, MotionProps } from 'framer-motion'
import isMobile from 'is-mobile'
import { User } from 'project-finder-backend-types'
import React, { useCallback, useMemo, useState } from 'react'
import {
  COVER_MAX_HEIGHT,
  CARD_MAX_WIDTH,
  MAX_SKILL_TAGS_DISPLAYED,
  TOP_CARD_MARGIN,
  BOTTOM_BAR_HEIGHT,
  CHROME_ADDRESS_BAR_HEIGHT,
} from 'src/config/constants'
import Avatar from './Avatar'
import Card from './Card'
import SkillTag from './SkillTag'

const Fullname = styled(Typography)(({ theme }) => ({
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
  marginTop: theme.spacing(1),
  display: 'flex',
}))
const LocationContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  gap: theme.spacing(1),
}))
const LocationTextContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: theme.spacing(0.25),
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
const LocationIcon = styled(Icon20PlaceOutline)(({ theme }) => ({
  color: theme.palette.secondary.main,
}))
const SectionHeader = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontFamily: 'Google Sans',
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(2),
}))

export interface SpecialistCardProps {
  data: User
  voteLike: () => unknown
  voteReject: () => unknown
}

const SpecialistCard: React.FC<SpecialistCardProps & MotionProps> = ({
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
      title={'Специалист'}
      open={isOpen}
      setClosed={closeCard}
      onDragStart={onDragStart}
      onDragTransitionEnd={onDragTransitionEnd}
      sx={{
        marginTop: `${TOP_CARD_MARGIN}px`,
        maxHeight: `calc(100vh - ${BOTTOM_BAR_HEIGHT}px - ${
          TOP_CARD_MARGIN * 3
        }px - ${isMobile() ? CHROME_ADDRESS_BAR_HEIGHT : 0}px)`,
      }}
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
            uid={data.username}
            letter={data.name[0]}
            sx={{
              zIndex: 1,
            }}
          />
          <Fullname>
            {data.name} {data.lastname}
          </Fullname>
          <Description open={isExpanded} variant="body1" onClick={openCard}>
            {data.information}
          </Description>
          <SectionHeader>Навыки</SectionHeader>
          <SkillTagsContainer>
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
          <SectionHeader>Локация</SectionHeader>
          <LocationContainer>
            <LocationIcon width={20} height={20} />
            <LocationTextContainer>
              <Typography>{data.location}</Typography>
              <Typography
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {/* {data.canRemote} */}
                Может удаленно
              </Typography>
            </LocationTextContainer>
          </LocationContainer>
        </>
      )}
    </Card>
  )
}

export default React.memo(SpecialistCard)
