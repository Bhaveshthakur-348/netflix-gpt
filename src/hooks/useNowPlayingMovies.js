import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice"
import { useEffect } from "react";


const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const getNowPlatingMovies = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/now_playing?page=1', 
            API_OPTIONS
        )
        const json = await data.json();
        console.log("data", json.results);
        dispatch(addNowPlayingMovies(json.results))
    }

    useEffect(() => {
        getNowPlatingMovies();
    }, [])

}

export default useNowPlayingMovies