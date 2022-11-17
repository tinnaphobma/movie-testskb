import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
    </div>
  )
}

export default App
