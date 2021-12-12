import React, { useState } from 'react'
import styled from '@emotion/styled'
import {
  useTransform,
  useMotionValue,
  MotionValue,
  motion,
  animate,
} from 'framer-motion'
import {
  BOTTOM_BAR_HEIGHT,
  CHROME_ADDRESS_BAR_HEIGHT,
  MIN_SWIPE_WIDTH,
} from 'src/config/constants'
import Stack from 'src/components/blocks/Stack'
import isMobile from 'is-mobile'
import ProjectCard from 'src/components/blocks/ProjectCard'
import getRandomProjectData from 'src/utils/getRandomProjectData'

const Wrapper = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(
    100vh - ${BOTTOM_BAR_HEIGHT}px -
      ${isMobile() ? CHROME_ADDRESS_BAR_HEIGHT : 0}px
  );
  overflow: hidden;
`

const Projects = () => {
  const [items, setItems] = useState<unknown[]>(
    new Array(10).fill(0).map(() => getRandomProjectData())
  )
  const x = useMotionValue(0)
  const xConstraints = [-MIN_SWIPE_WIDTH, 0, MIN_SWIPE_WIDTH]
  const background = useTransform(x, xConstraints, [
    'linear-gradient(180deg, #B8A2F3 0%, #B8A2F3 100%)',
    'linear-gradient(180deg, #fcfcfc 0%, #fcfcfc 100%)',
    'linear-gradient(180deg, #FF869D 0%, #FF869D 100%)',
  ])
  const handleTransformChange = (newX: MotionValue) => {
    x.set(newX.get())
  }
  const handleVote = (vote: boolean) => {
    animate(x, vote ? MIN_SWIPE_WIDTH : -MIN_SWIPE_WIDTH, {
      onComplete: () => {
        animate(x, 0)
      },
    })
  }
  const loadMoreItems = async (endIndex: number) => {
    return new Promise<unknown[]>((resolve) => {
      setTimeout(
        () => resolve(new Array(3).fill(0).map(() => getRandomProjectData())),
        500
      )
    })
  }

  return (
    <>
      <Wrapper style={{ background }}>
        <Stack
          CardComponent={ProjectCard}
          onTransformChange={handleTransformChange}
          onVote={handleVote}
          loadMoreFunction={loadMoreItems}
          initialItems={items}
        />
      </Wrapper>
    </>
  )
}

export default React.memo(Projects)
