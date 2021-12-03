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
import {
  MIN_SWIPE_WIDTH,
  CIRCLE_WIDTH,
  CIRCLE_ANIMATION_SCALE,
} from 'src/config/constants'
import Circle from './Circle'
import { Button, CircularProgress } from '@mui/material'

interface StackProps {
  onTransformChange: (x: MotionValue<number>) => void
  onVote: (vote: boolean) => void
  loadMoreFunction: (endIndex: number) => Promise<unknown[]>
  initialItems: unknown[]
  CardComponent: React.ElementType
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

const Stack: React.FC<StackProps> = ({
  onTransformChange,
  onVote,
  loadMoreFunction,
  initialItems,
  CardComponent,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [refreshIndex, setRefreshIndex] = useState(0)
  const [index, setIndex] = useState(0)
  const [items, setItems] = useState(initialItems)
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
    data: items[0],
    index: 0,
  })

  const vote = (v: boolean) => {
    /**
     * We do not need to have any logic in vote function
     * because it triggers on card animation end, which happens
     * only when user did a vote
     */
    if (!isLoading) {
      // Hide card
      setIsCardShown(false)
      setDirection(v)
      onVote(v)
    } else return undefined
  }
  const voteLike = () => vote(true)
  const voteReject = () => vote(false)

  /** Function to handle any position updates in layout */
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

  const showNextItem = useCallback(
    (index: number) => {
      console.log('show new item at index:', index)

      // Update current item and global index
      setRefreshIndex((prev) => prev + 1)
      setCurrent({
        x: motionValue(0),
        index: index,
        data: items[index],
        controls: animationControls(),
      })

      // Reset UI positions
      current.x.set(0)
      likeCircleControls.set({
        left: -CIRCLE_WIDTH - 16,
        scale: 1,
        transition: { duration: 0, bounce: false },
      })
      rejectCircleControls.set({
        right: -CIRCLE_WIDTH - 16,
        scale: 1,
        transition: { duration: 0, bounce: false },
      })

      // Display new card
      setIsCardShown(true)
    },
    [items]
  )

  /** Gets vote based on swipe direction and distance */
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

  /**
   * Activated only after the card ended exit animation (got swiped away)
   * Goes to the next card and fetches more if needed
   */
  const handleAnimationComplete = async (name: string) => {
    if (name === 'exit') {
      if (current.index === items.length - 1) {
        // Start loading skeleton
        setIsLoading(true)

        // Fetch new items
        const newItems = await loadMoreFunction(refreshIndex)
        setItems(newItems)
        setIndex(0)
        setIsLoading(false)
        console.log('set new items', newItems, items)
      } else {
        setIndex((prev) => prev + 1)
      }
    }
  }

  useEffect(() => {
    /**
     * FIXME: idk why we cannot call showNextItem without
     * destroying listeners on current.x position
     *
     * Here is ugly hack to not to call showNextItem, but add +1
     * to global index.
     */
    if (refreshIndex !== 0) showNextItem(index)
    else setRefreshIndex(1)
  }, [index])

  // Subscribe to `motion` components position
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

  // Handle like circle animation when reached swipe distance
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

  // Handle reject circle animation when reached swipe distance
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
      {isLoading && <CircularProgress color="primary" />}
      <AnimatePresence initial={false} custom={direction}>
        {isCardShown && (
          <>
            <Circle
              variant="like"
              circleControls={likeCircleControls}
              x={likeCircleX}
            />
            <CardComponent
              onAnimationComplete={handleAnimationComplete}
              style={{ x: current.x, rotate: current.x }}
              transformTemplate={({ rotate, x, scale, y }) => {
                // Rotate degree is lowered down because it depends
                // on X value and so it looks nice
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
              data={current.data}
              voteLike={voteLike}
              voteReject={voteReject}
            />
            <Circle
              variant="reject"
              circleControls={rejectCircleControls}
              x={rejectCircleX}
            />
          </>
        )}
      </AnimatePresence>
      <Button
        style={{ position: 'absolute', zIndex: 1000, left: 4, top: 4 }}
        onClick={voteReject}
        color="secondary"
        variant="contained"
      >
        vote reject
      </Button>
      <Button
        style={{ position: 'absolute', zIndex: 1000, right: 4, top: 4 }}
        onClick={voteLike}
        color="primary"
        variant="contained"
      >
        vote like
      </Button>
    </>
  )
}

export default Stack
