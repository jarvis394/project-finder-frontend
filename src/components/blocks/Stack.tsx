import React, { useState, Children, useCallback, useEffect } from 'react'
import {
  useMotionValue,
  useAnimation,
  MotionValue,
  motion,
  AnimatePresence,
  motionValue,
  Variants,
  animationControls,
} from 'framer-motion'
import Card from './Card'
import { styled } from '@mui/material'
import { MIN_SWIPE_WIDTH } from 'src/config/constants'

interface StackProps {
  onTransformChange: (x: MotionValue<number>) => void
  onVote: (vote: boolean) => void
}

const LikeCircle = styled(motion.div)`
  position: absolute;
  z-index: 1000;
  left: -48px;
  font-size: 48px;
  height: calc(100vh - 56px);
  display: flex;
  align-items: center;
`
const RejectCircle = styled(motion.div)`
  position: absolute;
  z-index: 1000;
  font-size: 48px;
  right: -48px;
  height: calc(100vh - 56px);
  display: flex;
  align-items: center;
`

const variants: Variants = {
  enter: (direction: boolean) => ({
    // x: direction ? -500 : 500,
    scale: 0.7,
    opacity: 0,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      bounce: false,
      ease: 'easeOut',
      delay: 0.25,
    },
  },
  exit: (direction: boolean) => ({
    x: direction ? 500 : -500,
    opacity: 0,
    transition: {
      bounce: false,
    },
  }),
}

const Stack: React.FC<StackProps> = ({
  onTransformChange,
  onVote,
  children,
}) => {
  const items = Children.toArray(children)
  const likeCircleControls = useAnimation()
  const rejectCircleControls = useAnimation()
  const likeCircleX = useMotionValue(-48)
  const rejectCircleX = useMotionValue(-48)
  const [isCardShown, setIsCardShown] = useState(true)
  const [doLikeCircleAnimation, setDoLikeCircleAnimation] =
    useState<boolean>(false)
  const [doRejectCircleAnimation, setDoRejectCircleAnimation] =
    useState<boolean>(false)
  const [direction, setDirection] = useState<boolean>()
  const [current, setCurrent] = useState({
    x: useMotionValue(0),
    controls: useAnimation(),
    element: items[0],
    index: 0,
  })
  const handleTransformChange = useCallback(
    (x: MotionValue<number>) => {
      isCardShown && onTransformChange(x)
      likeCircleX.set(Math.min(x.get(), MIN_SWIPE_WIDTH) / 1.1 - 48)
      rejectCircleX.set(Math.min(-x.get(), MIN_SWIPE_WIDTH) / 1.1 - 48)
    },
    [isCardShown]
  )
  const showNewItem = () => {
    console.log('should show item')
    setCurrent((prev) => ({
      x: motionValue(0),
      index: prev.index + 1,
      element: items[prev.index + 1],
      controls: animationControls(),
    }))
    current.x.set(0)
    setIsCardShown(true)
  }
  const getVote = () => {
    if (current.x.get() <= -MIN_SWIPE_WIDTH) {
      return false
    } else if (current.x.get() >= MIN_SWIPE_WIDTH) {
      return true
    } else return undefined
  }
  const handleDragEnd = () => {
    const vote = getVote()
    if (vote !== undefined) {
      onVote(vote)
      setDirection(vote)
      setIsCardShown(false)
    }
  }

  useEffect(() => {
    const unsubscribeCardX = current.x.onChange(() => {
      handleTransformChange(current.x)
    })
    const unsubscribeLikeX = likeCircleX.onChange(() => {
      setDoLikeCircleAnimation(likeCircleX.get() >= MIN_SWIPE_WIDTH / 2)
    })
    const unsubscribeRejectX = likeCircleX.onChange(() => {
      setDoRejectCircleAnimation(rejectCircleX.get() >= MIN_SWIPE_WIDTH / 2)
    })
    return () => {
      unsubscribeCardX()
      unsubscribeLikeX()
      unsubscribeRejectX()
    }
  }, [isCardShown])

  useEffect(() => {
    if (doLikeCircleAnimation) {
      likeCircleControls.start({
        scale: 2,
      })
    } else {
      likeCircleControls.start({
        scale: 1,
      })
    }
  }, [doLikeCircleAnimation])

  useEffect(() => {
    if (doRejectCircleAnimation) {
      rejectCircleControls.start({
        scale: 2,
      })
    } else {
      rejectCircleControls.start({
        scale: 1,
      })
    }
  }, [doRejectCircleAnimation])

  return (
    <>
      <AnimatePresence onExitComplete={showNewItem} custom={direction}>
        {isCardShown && (
          <>
            <LikeCircle
              animate={likeCircleControls}
              key="like"
              style={{ left: likeCircleX }}
              initial={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              ❤️
            </LikeCircle>

            <Card
              style={{ x: current.x, rotate: current.x }}
              transformTemplate={({ rotate, x }) => {
                return `translateX(${x}) rotate(${
                  Number(rotate.toString().match(/(-?)\d+/)[0]) / 24
                }deg)`
              }}
              key={current.index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              onDragEnd={handleDragEnd}
            >
              {current.element}
            </Card>

            <RejectCircle
              animate={rejectCircleControls}
              key="reject"
              style={{ right: rejectCircleX }}
              initial={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              ❌
            </RejectCircle>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Stack
