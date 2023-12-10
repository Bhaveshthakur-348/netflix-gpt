import { BG_URL } from "../utils/constants"
import GptSearchBar from "./GptSearchBar"

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img src={BG_URL} alt="logo" />
      </div>
      <GptSearchBar />
    </div>
  )
}

export default GptSearch