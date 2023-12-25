import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import genAI from "../utils/genAI";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import Shimmer from "./Shimmer";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [shimmerVisible, setShimmerVisible] = useState(false);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    setShimmerVisible(true);

    const searchTerm =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = searchTerm;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const gptMovies = response.text().split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    setShimmerVisible(false);

    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
    

    /* Normal text search without GPT
    const searchTerm = searchText.current.value.toLowerCase();
    const gptMovies = searchTerm.split(',').map(term => term.trim());
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
    */
  };

  return (
    <>
      <div className="pt-[35%] md:pt-[10%] flex justify-center">
        <form
          className="w-full md:w-1/2 bg-black grid grid-cols-12 relative"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            ref={searchText}
            className="p-4 m-4 col-span-9"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="col-span-3 m-4 py-3 px-4 bg-red-700 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
      {shimmerVisible && <Shimmer />}
    </>
  );
};

export default GptSearchBar;