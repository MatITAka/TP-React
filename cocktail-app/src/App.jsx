import './App.css'
import Home from './pages/Home.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CocktailDetail from './pages/CocktailDetail.tsx'
import Favorites from './pages/Favorites.tsx'


function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cocktail/:id" element={<CocktailDetail />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
