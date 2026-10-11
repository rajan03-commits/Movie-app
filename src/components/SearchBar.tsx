import React, { useEffect } from 'react'
import useDebounce from '../hooks/useDebounce';
import { searchMovies } from '../api/omdb';
import type { Movie } from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { fetchFailed, fetchStarted, fetchSucceeded, setQuery } from '../store/moviesSlice';

interface SearchBarProps{
    onResults: (movies: Movie[]) => void;
}

const SearchBar = ({onResults} : SearchBarProps) => {
    const input = useSelector((state: RootState) => state.movies.query)
    const dispatch = useDispatch();

    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        
       dispatch(setQuery(event.target.value))
    }
    const debouncedInput = useDebounce(input, 600);

    useEffect(()=> {
    let stale = false;    
    if (debouncedInput !== ""){
        async function fetchMovies(){ 
            
            dispatch(fetchStarted());
            
            try {
                const movies = await searchMovies(debouncedInput);
                if(!stale){
                    onResults(movies);
                    dispatch(fetchSucceeded())
                }    
            } catch{
                
                if(!stale){
                    dispatch(fetchFailed());
                }
            }
        }
            
        
        fetchMovies();
    }
    else{
        onResults([]);
        dispatch(fetchSucceeded());
        
    }
    return () => {
        stale = true;
    };
    
    },[debouncedInput, onResults, dispatch]);

    return (
        <div>
            <input className='w-full mb-4 max-w-md focus:outline-none focus:ring-2 focus:ring-emerald-500 border rounded p-2' onChange={handleChange} value={input} placeholder='Search Movies...' />
            
        </div>
    );
};

export default SearchBar