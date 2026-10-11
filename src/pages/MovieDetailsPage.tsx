import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import { getMovieDetails } from '../api/omdb';
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import type { RootState } from "../store/store";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";


interface MovieDetails {
  Title: string;
  Poster: string;
  Plot: string;
  Year: string;
  Actors :string;
  Director : string;
  imdbRating: string; 
  imdbID: string;
  Type: string;
}

const MovieDetailsPage = () => {
  const {imdbID} = useParams();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState<MovieDetails>()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const favourites = useSelector((state: RootState) => state.favourites.favourites );
  const isFavourite = favourites.some(fav => fav.imdbID === movie?.imdbID);

  const handleFavourite = () => { 
    if(!movie) return;
    if(isFavourite){
      dispatch(removeFavourite(movie.imdbID));
    } else {
      dispatch(addFavourite(movie));
    }
    
  }


  useEffect(() => {
    if(!imdbID) return;
    
    

    getMovieDetails(imdbID).then((data) => {
      if(data.Response === "False"){
        setError(true);
        setLoading(false);
        return; 
      }
      setMovie(data);
      setLoading(false);
        
    })
    .catch(()=>{
      setError(true);
      setLoading(false);
    });
    }, [imdbID]);
  return (
    
    <div >
        <Link to="/" className="mb-4 inline-block text-emerald-700 hover:underline">Back To Search</Link>
        {loading ? <Loader /> : error ? <ErrorMessage  message="Something Went Wrong" /> :
        (
        <div>
          
          <button onClick={handleFavourite} className={`px-4 py-2 rounded text-white mb-4 ${isFavourite ?  "bg-red-500 hover:bg-red-600" :  "bg-emerald-600 hover:bg-emerald-700"}`}>{isFavourite ? "Remove from favourites" : "Add to favourites"}</button>
          <div className="flex flex-col md:flex-row gap-6">
            <div>
            {movie?.Poster && movie.Poster !== "N/A" ? (
             <img className="w-full md:w-64" src={movie?.Poster}  alt={movie?.Title} />
             ) : (
              "No Poster Available"
              )}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{movie?.Title}</h1>
          <p>{movie?.Plot}</p>
        <h3 className="text-gray-500">
          {movie?.Year} <br />
          {movie?.Actors} <br />
          {movie?.Director} <br />
          {movie?.imdbRating} 
          
        </h3>

        </div>
          </div>
          
        </div>
        
        )
        }
        
    </div>
  )
}

export default MovieDetailsPage




