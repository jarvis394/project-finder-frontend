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
import {
  ProjectBase,
  ProjectListSuitableRes,
} from 'project-finder-backend-types'

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

const getRandomProjectData = () => ({
  title: 'Project Finder',
  location: 'ул. Колотушкина, д. 13',
  canRemote: true,
  description:
    'Требуются мобильные разработчики, желательно со стажем коммерческой разработки не менее 80 лет. Обязательно знание PowerPoint.',
  skillTags: [
    {
      name: 'Express',
    },
    {
      name: 'Django',
    },
    {
      name: 'Django',
    },
    {
      name: 'Python',
    },
    {
      name: 'Django',
    },
    {
      name: 'Django',
    },
  ],
  slug: 'project-finder',
  user: {
    username: 'jarvis394',
    name: 'Василий',
    lastname: 'Пупкин',
    contact: '@tarnatovski',
    information:
      'Разработчик на Excel. Пишу игровые движки в свободное время на LibreOffice.',
    skillTags: [{ name: 'Excel' }, { name: 'LibreOffice' }],
  },
})

const Projects = () => {
  const [items, setItems] = useState<unknown[]>([
    getRandomProjectData(),
    getRandomProjectData(),
    getRandomProjectData(),
  ])
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
    console.log('Got vote:', vote)
    animate(x, vote ? MIN_SWIPE_WIDTH : -MIN_SWIPE_WIDTH, {
      onComplete: () => {
        animate(x, 0)
      },
    })
  }
  const loadMoreItems = async (endIndex: number) => {
    console.log('Loading more items from index', endIndex)
    return new Promise<unknown[]>((resolve) => {
      setTimeout(
        () =>
          resolve(new Array(3).fill(0).map((_, i) => getRandomProjectData())),
        1000
      )
    })
  }

  return (
    <>
      <Wrapper style={{ background }}>
        <Stack
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
