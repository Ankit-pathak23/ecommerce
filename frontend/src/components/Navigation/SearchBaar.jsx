// import { SortAscendingIcon, UsersIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { fetchLiveSearchResults,setError } from '../../redux/Slice/ProductSlice';

export default function SearchBaar() {

  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const {error} = useSelector(state=> state.products)
  

  useEffect(() => {
    if(searchQuery===''){
      dispatch(setError())
    }
    if (searchQuery.trim() !== '') {
      const delayDebounceFn = setTimeout(() => {
        dispatch(fetchLiveSearchResults(searchQuery));
      }, 1000)
      return () => clearTimeout(delayDebounceFn)
      
    }
  }, [searchQuery]);

  return (
    <div>
      
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
          </div>
          <input
            type="text"
            name="text"
            id="seacrh"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
            placeholder="Search Products"
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {/* <SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
          <span>search</span>
        </button>
      </div>
    </div>
  )
}