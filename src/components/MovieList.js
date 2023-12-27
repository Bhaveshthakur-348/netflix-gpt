import MovieCard from "./MovieCard";
import "./MovieList.css";
import { Link } from "react-router-dom";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll custom-scrollbar">
        <div className="flex">
          {movies?.map((movie) => (
            <Link to={`/browse/${movie.id}`}>
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;