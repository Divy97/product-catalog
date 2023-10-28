import React from 'react'
import SignIn from './components/signIn/SignIn'
import AddProduct from './components/add-products/AddProduct'
import SignUp from './components/signUp/SignUp'
import { Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/AddProduct" element={<AddProduct />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
  )
}

export default App