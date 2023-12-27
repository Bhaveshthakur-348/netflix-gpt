import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import MainDetailContainer from "./MainDetailContainer";
import { API_OPTIONS } from "../../utils/constants";

const MovieDetails = () => {
  const { movieId } = useParams();

  const [video, setVideo] = useState(null);

  const fetchMovie = useCallback(async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,API_OPTIONS);
    const json = await data.json();
    setVideo(json.results[0]);
  }, [movieId]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  return (
    <div>
      <MainDetailContainer video={video} />
    </div>
  );
};

export default MovieDetails;
