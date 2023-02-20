import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [seconds, setSeconds] = useState(5)
  const [timerActive, setTimerActive] = useState(false)

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1)
    } else {
      setSeconds(5)
      setTimerActive(false)
    }
  }, [seconds, timerActive])
  return (
    <div className='App'>
      <div className='Main'>
        <div className='Block-1'>
          <span>1</span>
          <div className={timerActive ? 'Circle' : 'Circle-hidden'}></div>
        </div>
        <div className='Block-2'>2</div>
      </div>
      <button
        className='Start-btn'
        onClick={() => setTimerActive(true)}
        disabled={timerActive}
      >
        {timerActive ? seconds : 'START'}
      </button>
    </div>
  )
}

export default App
