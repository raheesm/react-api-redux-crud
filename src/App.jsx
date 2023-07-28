import { Route, Routes } from 'react-router-dom'
import './App.css'
import HeaderMenu from './components/AppNavbar'
import Create from './components/Create'
import Read from './components/Read'
import { useState,useEffect } from 'react'
import View from './components/View'
import Edit from './components/Edit'

function App() { 
const [theme,setTheme] = useState(false)
useEffect(() => {
  document.body.setAttribute('data-bs-theme', theme ? 'light' : 'dark');
}, [theme]);
  return (
    <div>
    <HeaderMenu setTheme={setTheme} theme={theme} />
    <Routes>
      <Route path='/' element={<Read/>}></Route>
      <Route path='/:vid' element={<View/>}></Route>
      <Route path='/edit/:eid' element={<Edit/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
    </Routes>
    </div>
  )
}

export default App
