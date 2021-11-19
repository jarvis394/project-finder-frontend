import React from 'react'
import styled from '@emotion/styled'
import {
  useTransform,
  useMotionValue,
  MotionValue,
  motion,
  animate,
} from 'framer-motion'
import { MIN_SWIPE_WIDTH } from 'src/config/constants'
import Stack from 'src/components/blocks/Stack'

const Wrapper = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 56px);
  overflow: hidden;
`
const Item = styled('div')`
  background: #fff;
  width: 360px;
  margin: 16px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`

const Projects = () => {
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
    console.log('Got vote:',vote)
    animate(x, 0, {
      duration: 1
    })
  }

  return (
    <>
      <Wrapper style={{ background }}>
        <Stack onTransformChange={handleTransformChange} onVote={handleVote}>
          <Item>1</Item>
          <Item>2</Item>
        </Stack>
      </Wrapper>
    </>
  )
}

export default React.memo(Projects)
