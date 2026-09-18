import axios from 'axios';
import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { CheckOut } from './components/CheckOut/CheckOut';
import { Orders } from './components/Orders/Orders';
import { Tracking } from './components/Tracking/Tracking';
import { Routes, Route } from 'react-router';
import { useState, useEffect } from 'react';

function App() {
  const [cart, setCart] = useState([])

  const appData = async () => {
    const response = await axios.get('/api/cart-items?expand=product')
    setCart(response.data);
  }
  useEffect(() => {
    appData();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<HomePage cart={cart} appData={appData} />} />
      <Route path='/checkout' element={<CheckOut cart={cart} appData={appData} />} />
      <Route path="/orders" element={<Orders cart={cart} appData={appData} />} />
      <Route path="/tracking" element={<Tracking cart={cart} />} />
    </Routes>
  )
}

export default App
