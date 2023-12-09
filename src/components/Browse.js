import { useEffect } from "react";
import Header from "./Header"
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice"

const Browse = () => {

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

  return (
    <div>
      <Header />
    </div>
  )
}

export default Browse