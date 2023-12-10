import { signOut } from "firebase/auth"
import { LOGO, USER_AVATAR } from "../utils/constants"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate =  useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((store) => store.user);

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

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

        {user && (
          <div className="flex p-2">
          <img className="w-12 h-12" alt="usericon" src={USER_AVATAR} />
          {/* <img className="w-12 h-12" alt="usericon"  src={user?.photoURL} /> */}
          <button onClick={handleSignOut} className="font-bold text-white">SignOut</button>
      </div>
        )}
    </div>
  )
}

export default Header