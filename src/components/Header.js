import { signOut } from "firebase/auth"
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { toggleGptSearchView } from "../utils/gptSlice"
import { changeLanguage } from "../utils/configSlice"

const Header = () => {
  const navigate =  useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {})
    .catch((error) => {
        navigate('/error')
    })
  }

  useEffect(() => {
    // take this api from firebase doc manage users 
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user.uid;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
        navigate('/browse')
        
      } else {
        dispatch(removeUser())
        navigate('/')
      }
    });

    // unsubscribing when component unmount 
    return () => unSubscribe();
  }, [])

  const handelGptSearchClick = () => {
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
        <img  className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

        {user && (
          <div className="flex p-2 justify-between">
            {showGptSearch && 
              <select
                className="p-2 m-2 bg-gray-900 text-white"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>

            }
            <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
              onClick={handelGptSearchClick} >{showGptSearch ? "Homepage" : "GPT Search"}</button>
            <img className="hidden md:block w-12 h-12" alt="usericon" src={USER_AVATAR} />
            {/* <img className="w-12 h-12" alt="usericon"  src={user?.photoURL} /> */}
          <button onClick={handleSignOut}  className="text-white h-12 bg-red-800 mx-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">SignOut</button>
          </div>
        )}
    </div>
  )
}

export default Header