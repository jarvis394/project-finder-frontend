import React, { useState, useCallback, useEffect } from 'react'
import {
  useMotionValue,
  useAnimation,
  MotionValue,
  AnimatePresence,
  motionValue,
  Variants,
  animationControls,
} from 'framer-motion'
import Card from './Card'
import {
  MIN_SWIPE_WIDTH,
  CIRCLE_WIDTH,
  CIRCLE_ANIMATION_SCALE,
} from 'src/config/constants'
import Circle from './Circle'

interface StackProps {
  onTransformChange: (x: MotionValue<number>) => void
  onVote: (vote: boolean) => void
  items: unknown[]
}

const variants: Variants = {
  enter: {
    scale: 0.95,
    opacity: 0,
    y: 8,
    transformOrigin: 'bottom',
  },
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    y: 0,
    transformOrigin: 'bottom',
    transition: {
      bounce: false,
      ease: 'easeOut',
      delay: 0,
    },
  },
  exit: (direction: boolean) => ({
    x: direction ? 700 : -700,
    opacity: 0,
    transition: {
      bounce: false,
    },
  }),
}

const Stack: React.FC<StackProps> = ({ onTransformChange, onVote, items }) => {
  const likeCircleControls = useAnimation()
  const rejectCircleControls = useAnimation()
  const likeCircleX = useMotionValue(-CIRCLE_WIDTH)
  const rejectCircleX = useMotionValue(-CIRCLE_WIDTH)
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
      const xValue = x.get()
      const ratio = MIN_SWIPE_WIDTH / CIRCLE_WIDTH
      const newLikeCircleX = Math.min(
        (xValue - CIRCLE_WIDTH) * ratio,
        MIN_SWIPE_WIDTH - CIRCLE_WIDTH
      )
      const newRejectCircleX = Math.min(
        (-xValue - CIRCLE_WIDTH) * ratio,
        MIN_SWIPE_WIDTH - CIRCLE_WIDTH
      )
      isCardShown && onTransformChange(x)
      likeCircleX.set(newLikeCircleX)
      rejectCircleX.set(newRejectCircleX)
    },
    [isCardShown]
  )
  const showNewItem = () => {
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
      setDirection(vote)
      setIsCardShown(false)
      onVote(vote)
    }
  }

  useEffect(() => {
    const unsubscribeCardX = current.x.onChange(() => {
      handleTransformChange(current.x)
    })
    const unsubscribeLikeX = likeCircleX.onChange(() => {
      setDoLikeCircleAnimation(
        likeCircleX.get() >= MIN_SWIPE_WIDTH - CIRCLE_WIDTH
      )
    })
    const unsubscribeRejectX = likeCircleX.onChange(() => {
      setDoRejectCircleAnimation(
        rejectCircleX.get() >= MIN_SWIPE_WIDTH - CIRCLE_WIDTH
      )
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
        scale: CIRCLE_ANIMATION_SCALE,
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
        scale: CIRCLE_ANIMATION_SCALE,
      })
    } else {
      rejectCircleControls.start({
        scale: 1,
      })
    }
  }, [doRejectCircleAnimation])

  return (
    <>
      <AnimatePresence
        initial={false}
        onExitComplete={showNewItem}
        custom={direction}
      >
        {isCardShown && (
          <>
            <Circle
              variant="like"
              circleControls={likeCircleControls}
              x={likeCircleX}
            />
            <Card
              style={{ x: current.x, rotate: current.x }}
              transformTemplate={({ rotate, x, scale, y }) => {
                return `translateX(${x}) rotate(${
                  Number(rotate.toString().match(/(-?)\d+/)[0]) / 24
                }deg) scale(${scale}) translateY(${y})`
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
            <Circle
              variant="reject"
              circleControls={rejectCircleControls}
              x={rejectCircleX}
            />
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Stack
