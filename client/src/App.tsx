import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          up
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          down
        </button>
        <p>
          {count}
        </p>
      </div>
    </>
  )
}

export default App
