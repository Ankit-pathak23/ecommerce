/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../../assects/eshoplogo.png'
import { Link, useNavigate } from 'react-router-dom'
import SearchBaar from './SearchBaar'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import { FaHome, FaUserAlt, FaShippingFast } from 'react-icons/fa'
import { CiLogout } from 'react-icons/ci'
import { logout } from '../../redux/Slice/UserSlice'
const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Home', href: '/' },
    { name: 'Stores', href: '#' },
  ],
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbaar() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(true)
  const dispatch=useDispatch();
  const serachBaarToggle = () => {
    setSearch(!search)
  }
  const navigate=useNavigate()
  const { userInfo } = useSelector((state) => state.user)
  const cart=useSelector((state) =>  state.cart)

  const {cartItems} =cart;


  const solutions = [
    { name: 'Profile', description: 'See and update profile', href: '/profile', icon: FaUserAlt },
    { name: 'Address', description: 'Add or update address ', href: '/address', icon: FaHome },
    { name: 'Orders', description: "See the ordered", href: '/order', icon: FaShippingFast },
    { name: 'Logout', description: 'Logout your profile', href: '#', icon: CiLogout },

  ]
  const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
  ]

  const logoutHandler= () => {
  navigate('/')
    dispatch(logout())
  }

  return (
    <div className="bg-white" >
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">

                  {userInfo ? <>
                    <Popover className="relative">
                        <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                          <span>{userInfo.name}</span>
                          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                              <div className="p-4">
                                
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                      <FaUserAlt className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                    </div>
                                    
                                    <div>
                                      <Link to='/profile' className="font-semibold text-gray-900">
                                        Pofile
                                        <span className="absolute inset-0" />
                                      </Link>
                                      <p className="mt-1 text-gray-600">See and Update Profile</p>
                                    </div>
                                  </div>
                                   <div  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                   <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                     <FaHome className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                   </div>
                                   
                                   <div>
                                     <Link to='/address' className="font-semibold text-gray-900">
                                       Address
                                       <span className="absolute inset-0" />
                                     </Link>
                                     <p className="mt-1 text-gray-600">Change your Address</p>
                                   </div>
                                 </div>
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    <FaShippingFast className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                  </div>
                                  
                                  <div>
                                    <Link to='/order' className="font-semibold text-gray-900">
                                      Order
                                      <span className="absolute inset-0" />
                                    </Link>
                                    <p className="mt-1 text-gray-600">See the orders</p>
                                  </div>
                                </div>
                                 <div  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                 <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                   <CiLogout className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                 </div>
                                 
                                 <div>
                                   <button onClick={logoutHandler} className="font-semibold text-gray-900">
                                     Logout
                                     <span className="absolute inset-0" />
                                   </button>
                                   <p className="mt-1 text-gray-600">Logout your profile</p>
                                 </div>
                               </div>
                              </div>
                              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                                  >
                                    <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </Popover>
                  </> :
                    <>
                      <div className="flow-root">

                        <Link to='/login' className="-m-2 block p-2 font-medium text-gray-900">
                          Sign in
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link to='/singnup' className="-m-2 block p-2 font-medium text-gray-900">
                          Create account
                        </Link>
                      </div>
                    </>}

                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to='/'>
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src={logo}
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {userInfo.length===0
                    ? (
                      <>
                        <Link to='/login' className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Sign in
                        </Link>
                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                        <Link to='/signup' className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Create account
                        </Link>
                      </>)
                    : (<>
                      <Popover className="relative">
                        <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                          <span>{userInfo.name}</span>
                          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                              <div className="p-4">
                                
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                      <FaUserAlt className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                    </div>
                                    <div>
                                      <Link to='/profile' className="font-semibold text-gray-900">
                                        Profile
                                        <span className="absolute inset-0" />
                                      </Link>
                                      <p className="mt-1 text-gray-600">See and update your Profile</p>
                                    </div>
                                  </div>
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    <FaHome className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                  </div>
                                  <div>
                                    <Link to='/address' className="font-semibold text-gray-900">
                                      Address
                                      <span className="absolute inset-0" />
                                    </Link>
                                    <p className="mt-1 text-gray-600">Add and Update Address</p>
                                  </div>
                                </div>
                                <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                  <FaShippingFast className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                </div>
                                <div>
                                  <Link to='/order' className="font-semibold text-gray-900">
                                    Order
                                    <span className="absolute inset-0" />
                                  </Link>
                                  <p className="mt-1 text-gray-600">See your Orders</p>
                                </div>
                              </div>
                              <div  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <CiLogout className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                              </div>
                              <div>
                                <button onClick={logoutHandler} className="font-semibold text-gray-900">
                                  Logout
                                  <span className="absolute inset-0" />
                                </button>
                                <p className="mt-1 text-gray-600">Logout your profile</p>
                              </div>
                            </div>
                                
                              </div>
                              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                                  >
                                    <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </Popover>
                    </>)}

                </div>



                {/* Search */}
                <div className="flex lg:ml-6">
                  {search ?
                    <button onClick={serachBaarToggle} className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    : <SearchBaar />}
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to='/cart' className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartItems.reduce((acc,item) => acc+item.qty_, 0)}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
