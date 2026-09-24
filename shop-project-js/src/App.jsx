import axios from 'axios';
import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { CheckOut } from './components/CheckOut/CheckOut';
import { Orders } from './components/Orders/Orders';
import { Tracking } from './components/Tracking/Tracking';
import { Routes, Route } from 'react-router';

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/checkout' element={<CheckOut />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/tracking" element={<Tracking />} />
    </Routes>
  )
}

export default App
