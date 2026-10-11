import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../components/MovieCard";

interface FavouritesState {
    favourites : Movie[];
}
const saved = localStorage.getItem("favourites");

const initialState : FavouritesState = {
    favourites : saved ? JSON.parse(saved) : []
};

const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        addFavourite: (state, action : PayloadAction<Movie>) =>{
            if (state.favourites.some(fav => fav.imdbID === action.payload.imdbID)) {
                return;
            }
            state.favourites.push(action.payload);
            
        },
        removeFavourite: (state, action : PayloadAction<string>) => {
            state.favourites = state.favourites.filter(movie => movie.imdbID !== action.payload)
        }
    }
})

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;