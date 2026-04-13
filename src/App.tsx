import { Routes, Route } from 'react-router-dom'
import './index.css'
import { HomePage } from './pages/HomePage'
import { SommeilPage } from './pages/SommeilPage'
import { ProductPage } from './pages/ProductPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sommeil" element={<SommeilPage />} />
      <Route path="/produit/:slug" element={<ProductPage />} />
    </Routes>
  )
}
