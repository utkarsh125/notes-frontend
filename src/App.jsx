import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import React from 'react'
import SignUp from './pages/SignUp/SignUp'

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" exact element={<Home/>} />
      <Route path="/login" exact element={<Login/>} />
      <Route path="/signup" exact element={<SignUp/>} />
    </Routes>
  </Router>
)
const App = () => {
  return (
    <div className='font-poppins'>
      {routes}
    </div>
  )
}

export default App