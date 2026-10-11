
import  MovieCard from './MovieCard'
import type { Movie } from './MovieCard';

interface MovieGridProps{
    movies: Movie[];
}

const MovieGrid = ({movies}: MovieGridProps) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {movies.map((movie)  => (
            <MovieCard key={movie.imdbID} movie={movie} />
            ))}
    </div>
  )
}


export default MovieGrid;