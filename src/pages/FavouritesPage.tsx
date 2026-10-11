import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store/store";

import MovieGrid from "../components/MovieGrid";

const FavouritesPage = () => {
    const favourites = useSelector(
        (state: RootState) => state.favourites.favourites);

    return (
        <div>
            <Link to="/" className="text-emerald-600 hover:underline">Back To Search</Link>
            {favourites.length === 0
                ? <p className="text-gray-500">No favourite movies yet.</p>
                : <MovieGrid movies={favourites} />
            }
        </div>
    )
};

export default FavouritesPage

