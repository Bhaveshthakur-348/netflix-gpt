import { useRef, useState } from "react";
import Header from "./Header"
import {checkValidData} from '../utils/validate'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase"
import { USER_AVATAR } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  const handleButtonClick = () => {
    console.log(email.current.value)
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message)

    if(message) return;

    if (!isSignInForm) {
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
         .then((userCredential) => {
            const user = userCredential.user;

            updateProfile(user, {
                displayName: name.current.value, photoURL: USER_AVATAR
              }).then(() => {
                console.log(name.current.value)
                 const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              }).catch((error) => {
                setErrorMessage(error.message)
              });
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage)
        })
    }else{
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
            const user = userCredential.user;
    // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage)
        });
    }

  }

  return (
    <div>
        <Header />
        <div className="absolute">
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/c906271d-7184-4eec-83c9-b6d4c1a068ec/728874a6-eeda-400a-9bcf-a935a1408a4f/IN-en-20231127-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="logo" />
        </div>
        <form  onSubmit={(e) => e.preventDefault()} className="absolute p-12 w-3/12 my-36 mx-auto right-0 left-0 bg-black text-white rounded-lg bg-opacity-80">
            <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && (
                <input type="text" ref={name} placeholder="Full Name" className="p-3 my-4 w-full bg-gray-700"/>
            )}
            <input type="text" ref={email} placeholder="Email Address" className="p-3 my-4 w-full bg-gray-700"/>
            <input type="password" ref={password} placeholder="Password" className="p-3 my-4 w-full bg-gray-700" />
            <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
            <button className="bg-red-700 p-2 my-6 w-full" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                {isSignInForm? "New to Netflix? Sign Up Now": "Already registered? Sign In Now."}
            </p>
        </form>
    </div>
  )
}

export default Login