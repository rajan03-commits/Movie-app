import axios from "axios";

const api = axios.create({
    baseURL:  "https://www.omdbapi.com/",
    timeout: 3000,
    params: {
        apikey: import.meta.env.VITE_OMDB_API_KEY,
    },
    
});

export async function searchMovies (query: string) {
    const response = await api.get("", {params: {s: query} });
    return response.data.Search ?? [];
    
}

export async function getMovieDetails(imdbID : string) {
    const response = await api.get("",{params : {i:imdbID} });
    return response.data;
}


export default api;
