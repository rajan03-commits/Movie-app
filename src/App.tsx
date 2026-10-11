import HomePage from './pages/HomePage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from "react";
import { useSelector } from 'react-redux'
import type { RootState } from "./store/store"
import FavouritesPage from './pages/FavouritesPage'

const App = () => {
  const favourites = useSelector(
  (state: RootState) => state.favourites.favourites
  );
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);
  return (
    <div className='p-4 bg-gray-100 text-gray-800 min-h-screen'>
      <Routes>
      
      <Route path ="/" element={<HomePage />} />
      <Route path="/movie/:imdbID" element={<MovieDetailsPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
    
    </Routes>
    </div>
  )
}

export default App