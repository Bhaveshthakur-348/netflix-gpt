import { useState } from "react";
import Header from "./Header"

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  return (
    <div>
        <Header />
        <div className="absolute">
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/c906271d-7184-4eec-83c9-b6d4c1a068ec/728874a6-eeda-400a-9bcf-a935a1408a4f/IN-en-20231127-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="logo" />
        </div>
        <form className="absolute p-12 w-3/12 my-36 mx-auto right-0 left-0 bg-black text-white rounded-lg bg-opacity-80">
            <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && (
                <input type="text" placeholder="Full Name" className="p-3 my-4 w-full bg-gray-700"/>
            )}
            <input type="text" placeholder="Email Address" className="p-3 my-4 w-full bg-gray-700"/>
            <input type="password" placeholder="Password" className="p-3 my-4 w-full bg-gray-700" />
            <button className="bg-red-700 p-2 my-6 w-full">{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                {isSignInForm? "New to Netflix? Sign Up Now": "Already registered? Sign In Now."}
            </p>
        </form>
    </div>
  )
}

export default Login