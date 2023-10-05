import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
// import { getOrderDetails } from "../redux/Slice/OrderSlice"

/*
  This example requires Tailwind CSS v2.0+ 
  
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
const products = [
    {
      id: 1,
      name: 'Distant Mountains Artwork Tee',
      price: '$36.00',
      description: 'You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?',
      address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
      email: 'f•••@example.com',
      phone: '1•••••••••40',
      href: '#',
      status: 'Processing',
      step: 1,
      date: 'March 24, 2021',
      datetime: '2021-03-24',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg',
      imageAlt: 'Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.',
    },
    // More products...
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function OrderDetail() {
    const order=useSelector(state => state.order)
    const dispatch=useDispatch()
    const param=useParams()
    const id=param.id
    const {orderDetails,loading,error}=order;
    console.log(orderDetails);


    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Order Details</h1>
  
          <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
            <dl className="flex">
              <dt className="text-gray-500">Order number&nbsp;</dt>
              <dd className="font-medium text-gray-900">{orderDetails.id}</dd>
              <dt>
                <span className="sr-only">Date</span>
                <span className="text-gray-400 mx-2" aria-hidden="true">
                  &middot;
                </span>
              </dt>
              <dd className="font-medium text-gray-900">
                <time dateTime="2021-03-22"></time>
              </dd>
            </dl>
            {/* <div className="mt-4 sm:mt-0">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                View invoice<span aria-hidden="true"> &rarr;</span>
              </a>
            </div> */}
          </div>
  
          <div className="mt-8">
            <h2 className="sr-only">Products purchased</h2>
  
            <div className="space-y-24">
              {orderDetails.orderItems.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                >
                  <div className="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
                    <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden">
                      <img src={product.image}  className="object-center object-cover" />
                    </div>
                  </div>
                  <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link>{product.name}</Link>
                    </h3>
                    {/* <p className="font-medium text-gray-900 mt-1">{product.price}</p> */}
                    <p className="text-gray-500 mt-3">{product.description}</p>
                  </div>
                  <div className="sm:col-span-12 md:col-span-7">
                    <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                      <div>
                        <dt className="font-medium text-gray-900">Delivery address</dt>
                        <dd className="mt-3 text-gray-500">
                          <span className="block">{product.shippingAddress}</span>
                          <span className="block">{orderDetails.shippingAddress.address}</span>
                          <span className="block">{orderDetails.shippingAddress.city}</span>
                          <span className="block">{orderDetails.shippingAddress.country}</span>
                        </dd>
                      </div>
                      <div>
                        {/* <dt className="font-medium text-gray-900">Shipping updates</dt> */}
                        {/* <dd className="mt-3 text-gray-500 space-y-3">
                          <p>{product.email}</p>
                          <p>{product.phone}</p>
                          <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Edit
                          </button>
                        </dd> */}
                      </div>
                    </dl>
                    <p className="font-medium text-gray-900 mt-6 md:mt-10">
                      {product.status} on <time dateTime={product.datetime}>{product.date}</time>
                    </p>
                    <div className="mt-6">
                      <div className="bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-indigo-600 rounded-full"
                          style={{ width: `calc((2 * 2 + 1) / 8 * 100%)` }}
                        />
                      </div>
                      <div className="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
                        <div className="text-indigo-600">Order placed</div>
                        <div className={classNames(product.step > 0 ? 'text-indigo-600' : '', 'text-center')}>
                          Processing
                        </div>
                        <div className={classNames(product.step > 1 ? 'text-indigo-600' : '', 'text-center')}>
                          Shipped
                        </div>
                        <div className={classNames(product.step > 2 ? 'text-indigo-600' : '', 'text-right')}>
                          Delivered
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Billing */}
          <div className="mt-24">
            <h2 className="sr-only">Billing Summary</h2>
  
            <div className="bg-gray-50 rounded-lg py-6 px-6 lg:px-0 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
              <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:pl-8 lg:col-span-5">
                <div>
                  <dt className="font-medium text-gray-900">Billing address</dt>
                  <dd className="mt-3 text-gray-500">
                    <span className="block">{orderDetails.shippingAddress.address}</span>
                    <span className="block">{orderDetails.shippingAddress.city}</span>
                    <span className="block">{orderDetails.shippingAddress.country}</span>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Payment information</dt>
                  <dd className="mt-3 flex">
                    <div>
                    
                      <p className="text-gray-900">{orderDetails.paymentMethod}</p>
                      
                  
                    </div>
                    {/* {orderDetails.paymentMethod != 'cash on delevery' &&
                    <div className="ml-4">
                      <p className="text-gray-900">RazorPay</p>
                      
                    </div> */}
  
                  </dd>
                </div>
              </dl>
  
              <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:pr-8 lg:col-span-7">
                <div className="pb-4 flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">{orderDetails.totalPrice}</dd>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-gray-900">$0</dd>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">Tax</dt>
                  <dd className="font-medium text-gray-900">${Number(orderDetails.totalPrice)*10/100}</dd>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <dt className="font-medium text-gray-900">Order total</dt>
                  <dd className="font-medium text-indigo-600">${Number(orderDetails.totalPrice)+Number(orderDetails.totalPrice)*10/100}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  }