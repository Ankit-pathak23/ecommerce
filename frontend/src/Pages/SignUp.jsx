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
import { useState,useEffect } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/Slice/UserSlice'
import Message from '../components/Navigation/Message'
import Loader from '../components/Navigation/Loader'

export default function SignUp() {
  const dispatch =useDispatch();
  const navigate=useNavigate()
  const Location=useLocation();
  
  const [name,setName] = useState('')
  const [message,setMessage] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
 const [image,setImage] = useState([])
 const [phone,setPhone] = useState('')
 
 const redirect = Location.search ? Location.search.split('=')[1] : '/'

 const userRegister =useSelector(state => state.user)
 
 const {error, loading, userInfo} =userRegister
 

 useEffect(() => {
  if(userInfo.length!==0){
      
      navigate('/profile/verify/')
  }
},[navigate,userInfo])

 const submitHandler = (e) => {
  e.preventDefault()
  if(password !== confirmPassword){
    setMessage('Password do not match')
   } else {
  dispatch(register({name,email,password,phone,image}))
   }
  
}

  return (
    <>
  {loading && <Loader/>}
  {error && <Message>{error}</Message>}
    <form className='flex justify-center items-center '>
      <div className="space-y-12 w-full max-w-md space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
         

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <input
                  type="file"
                  multiple accept='image/*'
                  value={image}
                  onChange={(e) =>setImage( e.target.value)}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  
                </input>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="phonenumber" className="block text-sm font-medium leading-6 text-gray-900">
                Enter the password
              </label>
              <div className="mt-2">
                <input
                  id="passwod"
                  name="number"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="phonenumber" className="block text-sm font-medium leading-6 text-gray-900">
                Conform the password
              </label>
              <div className="mt-2">
                <input
                  id="conformPassword"
                  name="number"
                  type="password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="phonenumber" className="block text-sm font-medium leading-6 text-gray-900">
                Enter the phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="number"
                  type="text"
                  required

                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            

            

         

            
          </div>
        </div>

       
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link className="text-sm font-semibold leading-6 text-gray-900" to='/account/login'>
          login
        </Link>
        <button
          type="submit"
          onClick={submitHandler}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
      </div>

      
    </form>
    </>
  )
}
