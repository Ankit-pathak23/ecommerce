import { Link, useNavigate } from "react-router-dom";
import logo from '../assects/eshoplogo.png'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, forgetpassword } from "../redux/Slice/UserSlice";
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

export default function ForgetPassword() {

  const [email, setEmail] = useState('')

  const navigate = useNavigate()
  const userLogin = useSelector(state => state.user)
  const dispatch = useDispatch()
  

  

  console.log(userLogin);
  const submitHandler = (e,email) => {
    e.preventDefault()
    
    dispatch(forgetpassword( email))
    
  

  }
 

 
  const { error, loading, userInfo,userDetails,isforget } = userLogin

  useEffect(() => {
    if (isforget) {
      navigate('/profile/resetpassword');
    }
  }, [navigate, isforget]);
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
          <form className="space-y-6" onSubmit={(e) => submitHandler(e, email)} method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="otp"
                  name="otp"
                  type="email"
                  
                  value={email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            


            <div>
              <button
                type="submit"
                
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
              
            </div>
          </form>

         
        </div>
      </div>
    </>
  )
}
