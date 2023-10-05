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
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { addShippingAddress } from '../redux/Slice/UserSlice';
import SavedAddress from './SavedAddress';
import { getUserDetails } from '../redux/Slice/UserSlice';
import { saveAddressId } from '../redux/Slice/CartSlice'



export default function Address() {
const [name,setName]=useState('');
const [phone,setPhone]=useState('');
const [country,setCountry]=useState('');
const [city,setCity]=useState('');
const [address,setAddress]=useState('');
const [postalCode,setPostalCode]=useState('');

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {userDetails,error}=useSelector((state)=>state.user)

  
  useEffect(() => {
        
    dispatch(getUserDetails());
},[])

const shippingAddress = userDetails.ShippingAddress
console.log(shippingAddress);
  // const submitHandler = (e) => {
  //     e.preventDefault()
  //   dispatch(addShippingAddress({name,phone,country,city,address,postalCode}))
  //   if(!error){
  //     navigate('/address')
  //   }
  // }
  const cartItem= useSelector(state => state.cart)
   
  const {cartItems} =cartItem
 
    const submitHandler = (id) => {
        
      dispatch(saveAddressId(id));
       if(cartItems.length===0){
        navigate('/cart')
       }
      else{
        navigate('/payment')
      }
      
    }
  return (
    <>
    
    <div className="bg-white py-24 sm:py-32" >
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
    {shippingAddress.length!==0 && 
    shippingAddress.map((address,index) => (
      <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none" key={address.id}>
        <div className="p-8 sm:p-10 lg:flex-auto">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Address</h3>
          <p className="mt-6 text-base leading-7 text-gray-600">
           Name = {address.name}
          </p>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Street Address = {address.address}
          </p>
          <div className="mt-10 flex items-center gap-x-4">
            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">More Informations</h4>
            <div className="h-px flex-auto bg-gray-100" />
          </div>
          <ul
            role="list"
            className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
          >
            
              <li className="flex gap-x-3">
                
                City = {address.city}
              </li>
              <li  className="flex gap-x-3">
                
            Phone = {address.phone}
              </li>
              <li  className="flex gap-x-3">
                
               Postal Code = {address.postalCode}
              </li>
              <li  className="flex gap-x-3">
                
               Country = {address.country}
              </li>
          
          </ul>
        </div>
        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="mx-auto max-w-xs px-8">
             
              
              <button
                onClick={() => submitHandler(address.id)}
                className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Continue
              </button>
              
            </div>
          </div>
        </div>
      </div>
       ))
    }
    <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link className="text-sm font-semibold leading-6 text-gray-900" to='/addAddress'>
          Add Address
        </Link>
        </div>
    </div>
  </div>

    </>
  )
}
