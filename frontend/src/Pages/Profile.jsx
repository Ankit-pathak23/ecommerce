import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../redux/Slice/UserSlice';
import Loader from '../components/Navigation/Loader'
export default function Profile() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    

    useEffect(() => {
        
        dispatch(getUserDetails());
    },[])
    const {userDetails,userInfo,loading,error}= useSelector((state)=> state.user);
   
    console.log(userDetails)

    const submitHandler= () =>{
      navigate('/profile/edit')
    }
    const verifyaccount= () => {
      navigate('/profile/verify')
    }
    const imageUrl= userDetails.image === '/images/default_profile.jpg' ? userDetails.imagegoogle : userDetails.image
    console.log(imageUrl);
  return (
    <>
    {loading&&<Loader/>}
    
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
        
      </div>
      <div className="mt-6 border-t border-gray-100">
      <div className="mt-2 flex items-center gap-x-3">
        <img src={imageUrl} className='h-20 w-20 rounded-full'></img>
        </div>
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 relative">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userInfo.name}  </dd>
           
          </div>
          
            {/* {!userDetails.length===0 && 
           <><dt className="text-sm font-medium leading-6 text-gray-900">Mobile Number</dt>
           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails.profile.phone} <Link to='/change/:id' className='absolute inset-y-0 right-0 w-16 cursor-pointer '> </Link></dd></> } */}
            
          
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userInfo.email}  </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
            { userDetails.phone === '0000000000' ? <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Enter the phone number  </dd> :<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails.phone}  </dd> }
            
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          onClick={submitHandler}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit
        </button>
        </div>
        {!userDetails.isverified && 
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <span><p>Your account is not verified </p></span>
        <button
          type="submit"
          onClick={() => verifyaccount()}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Verify
        </button>
        </div>
}
          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
          </div> */}
          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
              qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
              pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
            </dd>
          </div> */}
          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
        </dl>
      </div>
    </div>
    </>
  )
}
