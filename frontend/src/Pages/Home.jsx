import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from "../redux/Slice/ProductSlice"
import { StarIcon } from '@heroicons/react/20/solid'

const productslist = {
  products:[{ id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',},{ id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',}]
   
  
  // More products...
  }
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Home() {
  const dispatch = useDispatch()
  
  
  
  
  // Fetch products from the Redux store
  useEffect(() => {
    dispatch(listProducts())
  }, [])
  const productslist = useSelector(state => state.products)
  const {error,loading}=useSelector(state => state.user)
  // Get products from the Redux store
  
  return (
    
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productslist.products.map((product) => (
            <div key={product.id} className="group relative">
              
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.image}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                /> 
  
              
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
