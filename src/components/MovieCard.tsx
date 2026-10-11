import { Link } from "react-router-dom";
import {motion} from "framer-motion";

export interface Movie {
    Title : string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

interface MovieCardProps{
    movie: Movie;
}

const MovieCard = ({movie} : MovieCardProps) => {
    return(
    <Link to = {`/movie/${movie.imdbID}`}>
    <motion.div  initial={{opacity: 0,  y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4}} whileHover={{scale: 1.03}} className="rounded-xl relative bg-white shadow-lg overflow-hidden">
        {movie.Poster === "N/A" ? <div className="aspect-2/3 flex  bg-gray-800 text-gray-300 items-center justify-center">No Poster available</div> : <img className="w-full aspect-2/3 bg-gray-800 text-gray-300 object-cover" src={movie.Poster} alt={movie.Title}/>}
        <div className="absolute inset-x-0 bottom-0 p-3 text-white bg-linear-to-t from-black/80 to-transparent pt-16">
            <h3 className="font-bold">{movie.Title}</h3>
            <div className="flex items-center gap-2">
                <p className="gap-2">{movie.Year}</p>
                <span className="rounded bg-emerald-600 text-xs px-2 py-0.5 capitalize">{movie.Type}</span>
            </div>
        </div>
    </motion.div>
    </Link>
    );
};
export default MovieCard;