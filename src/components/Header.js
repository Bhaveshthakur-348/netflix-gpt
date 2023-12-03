import { signOut } from "firebase/auth"
import { LOGO } from "../utils/constants"
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user.uid;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
        navigate('/browse')
        
      } else {
        dispatch(removeUser())
        navigate('/')
      }
    });
  }, [])

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

        {user && (
          <div className="flex p-2">
          {/* <img className="w-12 h-12" alt="usericon" src="https://external-preview.redd.it/0dTT-3SprPcsNCqo1GTCI-nqGM9EdZYwqyYr_pZ-baE.jpg?auto=webp&s=a1e8532d326f5aa122df2f31694bf142f117fc06" /> */}
          <img className="w-12 h-12" alt="usericon"  src={user?.photoURL} />
          <button onClick={handleSignOut} className="font-bold text-white">SignOut</button>
      </div>
        )}
    </div>
  )
}

export default Header