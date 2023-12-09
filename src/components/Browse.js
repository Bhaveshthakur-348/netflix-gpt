import { useEffect } from "react";
import Header from "./Header"
import { API_OPTIONS } from "../utils/constants";

const Browse = () => {

  const getNowPlatingMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?page=1', 
      API_OPTIONS
    )
    const json = await data.json();
    console.log("data", json);

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