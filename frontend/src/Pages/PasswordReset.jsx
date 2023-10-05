import { Link, useNavigate } from "react-router-dom";
import logo from '../assects/eshoplogo.png'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, forgetpassword,resetPassword } from "../redux/Slice/UserSlice";
import Loader from "../components/Navigation/Loader";
import Message from "../components/Navigation/Message";
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

export default function PasswordReset() {

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [conformPassword, setConformPassword] = useState('')
  const [message,setMessage] = useState('')

  const navigate = useNavigate()
  const userLogin = useSelector(state => state.user)
  const dispatch = useDispatch()
  

  

  console.log(userLogin);
 

 
  const { error, loading, userInfo,userDetails,isforget } = userLogin

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== conformPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(resetPassword({ email, otp, password })); // Pass an object with the required properties
    }
  }
 

  useEffect(() => {
   
    //   dispatch(getUserDetails())
      if(isforget===false){
        navigate('/login')
      
    }
  }, [navigate, isforget])

  
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}


        <Message>{error}</Message>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter the Email 
          </h2>
          
          {error && <Message className="mx-auto h-10 w-auto">{error}</Message>}
          {loading && <Loader className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 bg-red-500" />}

        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e) => submitHandler(e, {email,otp,password,conformPassword})} method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  
                  value={email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Otp
              </label>
              <div className="mt-2">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  
                  value={otp}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  
                  value={password}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Conform Password
              </label>
              <div className="mt-2">
                <input
                  id="conformPassword"
                  name="conformPassword"
                  type="password"
                  
                  value={conformPassword}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setConformPassword(e.target.value)}
                />
              </div>
            </div>

            


            <div>
              <button
                type="submit"
                
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                confirm
              </button>
              
            </div>
          </form>

         
        </div>
      </div>
    </>
  )
}
