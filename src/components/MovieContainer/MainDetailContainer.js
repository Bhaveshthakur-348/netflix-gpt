import React from "react";
import SecondaryContainer from "../SecondaryContainer";
import { useNavigate } from "react-router-dom";

const MainDetailContainer = ({video}) => {
  const navigate = useNavigate();

  const handleBackToBrowse = () => {
    navigate("/Browse");
  };

  return (
    <div className="mt-[30px]">
      <button className="text-white bg-purple-800 px-4 py-2 rounded-lg absolute top-4 left-4" onClick={handleBackToBrowse}>
        Home
      </button>

      <div className="w-screen -mt-24 aspect-video" style={{ height: "150%" }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video?.key}?&autoplay=1&mute=0&loop=1&playlist=${video?.key}&controls=0&modestbranding=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen>
          </iframe>
      </div>

      <SecondaryContainer />
    </div>
  );
};

export default MainDetailContainer;
