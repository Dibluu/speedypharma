import { Routes, Route } from 'react-router-dom'
import './index.css'
import { HomePage } from './pages/HomePage'
import { SommeilPage } from './pages/SommeilPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sommeil" element={<SommeilPage />} />
    </Routes>
  )
}
