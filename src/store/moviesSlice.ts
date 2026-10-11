import { createSlice, type  PayloadAction  } from "@reduxjs/toolkit";

import type { Movie } from "../components/MovieCard";

interface MovieState {
    list: Movie[];
    query: string;
    loading: boolean;
    error: boolean;
};

const initialState : MovieState = {
    list : [],
    query: "",
    loading: false,
    error: false,
};



const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<Movie[]>) =>{
            state.list = action.payload;
        },
        setQuery: (state, action: PayloadAction<string>) =>{
            state.query = action.payload;
        },
        fetchStarted: (state) => {
            state.loading = true;
            state.error = false;
        },
        fetchSucceeded: (state) => {
            state.loading = false;
            state.error = false;
        },
        fetchFailed: (state) => {
            state.loading = false;
            state.error = true;
        }

    }
})

export const { setMovies, setQuery, fetchStarted, fetchSucceeded, fetchFailed } = moviesSlice.actions;
export default moviesSlice.reducer;
