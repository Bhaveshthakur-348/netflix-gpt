import { signOut } from "firebase/auth"
import { LOGO } from "../utils/constants"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
  const navigate =  useNavigate()
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
        navigate('/')
    })
    .catch((error) => {
        navigate('/error')
    })
  }
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