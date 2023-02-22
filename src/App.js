import './App.css'
import { useState, useEffect, useRef } from 'react'

function App() {
  const [seconds, setSeconds] = useState(5)
  const [timerActive, setTimerActive] = useState(false)
  const [circleVisible, setCircleVisible] = useState(false)
  const block1Ref = useRef(null)
  const block2Ref = useRef(null)
  const circleRef = useRef(null)

  const handleStartAnimation = () => {
    setCircleVisible(true)
    setTimeout(() => {
      setCircleVisible(false)
    }, 2000)
    const circle = circleRef.current
    // Get information about the size of an element and its position relative to the viewport
    const block1Rect = block1Ref.current.getBoundingClientRect()
    const block2Rect = block2Ref.current.getBoundingClientRect()
    const circleRect = circle.getBoundingClientRect()

    // Get the coordinates of the centers of the blocks
    const startX = block1Rect.left + block1Rect.width / 2
    const startY = block1Rect.top + block1Rect.height / 2
    const endX = block2Rect.left + block2Rect.width / 2 - circleRect.width / 2
    const endY = block2Rect.top + block2Rect.height / 2 - circleRect.width / 2

    // Add animation circle
    circle.animate(
      [
        {
          transform: `translate(${startX}px, ${startY}px)`,
        },
        {
          transform: `translate(${endX}px, ${endY}px)`,
        },
      ],
      {
        duration: 2000,
        easing: 'ease-out',
      }
    )
  }

  useEffect(() => {
    if (timerActive) {
      // Start animation
      handleStartAnimation()
      // Countdown
      const timerId = setInterval(() => setSeconds((prev) => prev - 1), 1000)
      // Stopping the timer
      setTimeout(() => {
        clearInterval(timerId)
        setSeconds(5)
        setTimerActive(false)
      }, 5000)
    }
  }, [timerActive])

  return (
    <div className='app'>
      <div className='main'>
        <div className='block1' ref={block1Ref}>
          1
        </div>
        <div
          className={circleVisible ? 'circle' : 'circle_hidden'}
          ref={circleRef}
        />
        <div className='block2' ref={block2Ref}>
          2
        </div>
      </div>
      <button
        className='start_btn'
        onClick={() => {
          setTimerActive(true)
        }}
        disabled={timerActive}
      >
        {timerActive ? seconds : 'START'}
      </button>
    </div>
  )
}

export default App
