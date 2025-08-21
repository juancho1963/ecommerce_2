import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layouts/Header'
import Home from './components/Home'
import Producto from './components/productos/producto'
import Cart from './components/cart/Cart'
import Checkout from './components/checkout/Checkout'
import Login from './components/user/Login'
import Register from './components/user/Register'

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/producto/:slug' element={<Producto/>}/>        
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/> 
      </Routes>
    </BrowserRouter>    
  )
}

export default App
