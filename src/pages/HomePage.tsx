import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setMovies } from "../store/moviesSlice.ts";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../components/MovieCard.tsx";
import Loader from "../components/Loader.tsx";
import ErrorMessage from "../components/ErrorMessage.tsx";

function HomePage (){
    
    const movies = useSelector((state: RootState) => state.movies.list )
    const loading = useSelector((state : RootState) => state.movies.loading)
    const error = useSelector((state: RootState) => state.movies.error)
    const query = useSelector((state : RootState) => state.movies.query)
    const dispatch = useDispatch();
    const handleResults = useCallback((list: Movie[]) => {
    dispatch(setMovies(list));
    }, [dispatch]);

return (
    <div>
        <div className="flex gap-4 justify-between mb-4 items-center">
            <h1 className="text-3xl font-bold">Movie Finder</h1>
            <Link to="/favourites" className="hover:underline text-2xl text-emerald-600">Favourites</Link>
        </div>
        <SearchBar onResults={handleResults} />  
        {loading? <Loader /> : error? <ErrorMessage message="Something Went Wrong" /> : movies.length === 0 && query? <p className="text-gray-500">No Result</p> : <MovieGrid movies={movies} /> }
        
    </div>
    
)
}

export default HomePage;




