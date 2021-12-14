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
import SpecialistCard from 'src/components/blocks/SpecialistCard'
import getRandomSpecialistData from 'src/utils/getRandomSpecialistData'
import SelectProject from 'src/components/blocks/SelectProject'
import SelectedProjectTopbar from 'src/components/blocks/SelectedProjectTopbar'

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

const Specialists = () => {
  const [items, setItems] = useState<unknown[]>(
    [...new Array(2).fill(0).map(() => getRandomSpecialistData()), getRandomSpecialistData({ zashitin: true }), ...new Array(7).fill(0).map(() => getRandomSpecialistData())]
  )
  const [selectedProject, setSelectedProject] = useState<string>('')
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
        () =>
          resolve(new Array(10).fill(0).map(() => getRandomSpecialistData())),
        500
      )
    })
  }

  const selectProject = (project: string) => {
    setSelectedProject(project)
  }

  const openSelection = () => {
    setSelectedProject('')
  }

  return (
    <>
      <Wrapper style={{ background }}>
        {!selectedProject && <SelectProject selectProject={selectProject} />}
        {selectedProject && (
          <>
            <SelectedProjectTopbar
              onClick={openSelection}
              project={selectedProject}
            />
            <Stack
              CardComponent={SpecialistCard}
              onTransformChange={handleTransformChange}
              onVote={handleVote}
              loadMoreFunction={loadMoreItems}
              initialItems={items}
            />
          </>
        )}
      </Wrapper>
    </>
  )
}

export default React.memo(Specialists)
