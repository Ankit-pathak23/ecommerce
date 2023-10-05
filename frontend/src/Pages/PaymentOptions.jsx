
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder, getOrderDetails,payment } from "../redux/Slice/OrderSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Message from '../components/Navigation/Message'
import useRazorpay from "react-razorpay";
import axios from 'axios';
import { showRazorpay } from '../components/Navigation/PayWithRazorPay';
function PaymentOptions() {
    const radios = [
        {
            name: "RazorPay",
            description: "It's the faster, safer way to send and receive money.",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.60676 23.1864L8.02271 20.5444L7.09617 20.5229H2.67188L5.74654 1.02757C5.75608 0.968712 5.7871 0.913836 5.83243 0.874866C5.87776 0.835896 5.93582 0.814423 5.99626 0.814423H13.4562C15.9328 0.814423 17.642 1.32978 18.5343 2.34698C18.9526 2.82417 19.219 3.32282 19.3479 3.87159C19.4831 4.44739 19.4855 5.13533 19.3535 5.97438L19.3439 6.03562V6.57325L19.7622 6.81025C20.1146 6.99715 20.3945 7.21108 20.6092 7.45604C20.9671 7.86403 21.1986 8.38257 21.2964 8.99734C21.3974 9.62961 21.364 10.382 21.1986 11.2338C21.0077 12.2136 20.6991 13.0669 20.2824 13.7652C19.899 14.4086 19.4107 14.9423 18.8309 15.3558C18.2774 15.7487 17.6197 16.047 16.8761 16.2378C16.1555 16.4255 15.334 16.5202 14.4329 16.5202H13.8523C13.4372 16.5202 13.0339 16.6697 12.7174 16.9377C12.4001 17.2113 12.1901 17.5851 12.1257 17.9939L12.082 18.2317L11.3471 22.8882L11.3137 23.0592C11.3049 23.1133 11.2898 23.1403 11.2676 23.1586C11.2477 23.1753 11.219 23.1864 11.1912 23.1864H7.60676Z" fill="#253B80" />
                <path d="M20.1586 6.09761C20.1364 6.23997 20.1109 6.38551 20.0823 6.53503C19.0985 11.586 15.7327 13.3309 11.4341 13.3309H9.24541C8.71971 13.3309 8.27673 13.7127 8.19481 14.2312L7.07422 21.3381L6.75689 23.3526C6.70361 23.693 6.96606 24 7.30963 24H11.1915C11.6512 24 12.0417 23.666 12.1141 23.2126L12.1523 23.0154L12.8831 18.3772L12.9301 18.1227C13.0016 17.6678 13.3929 17.3337 13.8526 17.3337H14.4332C18.1942 17.3337 21.1384 15.8067 21.999 11.388C22.3584 9.54209 22.1723 8.00078 21.2212 6.91678C20.9333 6.58991 20.5762 6.31871 20.1586 6.09761Z" fill="#179BD7" />
                <path d="M19.13 5.68728C18.9797 5.64354 18.8246 5.60378 18.6655 5.56799C18.5057 5.53299 18.3419 5.50198 18.1732 5.47494C17.5831 5.3795 16.9365 5.33417 16.2438 5.33417H10.3967C10.2528 5.33417 10.116 5.36678 9.9935 5.42563C9.72389 5.55526 9.52348 5.81056 9.47496 6.12311L8.2311 14.0014L8.19531 14.2313C8.27723 13.7127 8.72022 13.331 9.24591 13.331H11.4346C15.7332 13.331 19.099 11.5853 20.0828 6.53508C20.1122 6.38556 20.1369 6.24002 20.1591 6.09766C19.9102 5.96564 19.6406 5.85271 19.3503 5.75648C19.2787 5.73262 19.2048 5.70955 19.13 5.68728Z" fill="#222D65" />
                <path d="M9.47421 6.12308C9.52272 5.81052 9.72314 5.55523 9.99275 5.42639C10.116 5.36753 10.252 5.33493 10.396 5.33493H16.2431C16.9358 5.33493 17.5824 5.38026 18.1725 5.4757C18.3411 5.50274 18.5049 5.53375 18.6648 5.56875C18.8238 5.60453 18.9789 5.6443 19.1292 5.68804C19.204 5.71031 19.278 5.73337 19.3503 5.75644C19.6406 5.85267 19.9102 5.9664 20.1592 6.09763C20.4518 4.23104 20.1568 2.96014 19.1475 1.80933C18.0349 0.5424 16.0267 0 13.4571 0H5.99712C5.47222 0 5.02446 0.381748 4.94334 0.901084L1.83607 20.5969C1.77483 20.9866 2.07546 21.3381 2.46834 21.3381H7.07397L8.23034 14.0014L9.47421 6.12308Z" fill="#253B80" />
            </svg>,
            function: 'razorpayHandel'
        },

        // {
        //     name: "Cash on delevery",
        //     description: " Make payment on the time of delivery",
        //     icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        //         <path d="M11.8832 8.24628L10.2798 15.7425H8.34041L9.94398 8.24628H11.8832ZM20.0422 13.0867L21.063 10.2717L21.6504 13.0867H20.0422ZM22.2067 15.7425H24L22.4334 8.24628H20.7792C20.4064 8.24628 20.0921 8.46243 19.953 8.79575L17.0431 15.7425H19.0799L19.4842 14.623H21.9719L22.2067 15.7425ZM17.1441 13.2952C17.1526 11.3169 14.4092 11.2073 14.4276 10.3233C14.4335 10.0547 14.6898 9.76859 15.2499 9.69542C15.5276 9.65967 16.2939 9.63067 17.1625 10.0309L17.5022 8.44068C17.0357 8.27191 16.4353 8.10938 15.6883 8.10938C13.7711 8.10938 12.4224 9.12773 12.4116 10.5872C12.3993 11.6664 13.375 12.2681 14.1086 12.6276C14.865 12.995 15.1184 13.2305 15.1147 13.5588C15.1094 14.0617 14.5116 14.2844 13.9549 14.2929C12.9793 14.308 12.4138 14.0292 11.9632 13.8191L11.6111 15.4624C12.065 15.6702 12.9013 15.8509 13.7672 15.8602C15.8054 15.8602 17.1381 14.8538 17.1441 13.2952ZM9.1121 8.24628L5.96986 15.7425H3.92017L2.37375 9.75999C2.28001 9.3921 2.19823 9.25688 1.91313 9.10143C1.44678 8.84819 0.676937 8.6113 0 8.46395L0.0458603 8.24628H3.34574C3.76606 8.24628 4.14424 8.52599 4.24051 9.01022L5.05739 13.3483L7.07471 8.24628H9.1121Z" fill="#1434CB" />
        //     </svg>,
        //     function: 'orderConform'

        // },
    ]
    const [selectedOption, setSelectedOption] = useState('RazorPay');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        
    };
    
    const [Razorpay] = useRazorpay();
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const location=useLocation();
    const orderCreate=useSelector(state => state.order)
    const cartItem=useSelector(state => state.cart)
    const {cartItems} =cartItem
    // console.log(cartItem);
    console.log(orderCreate);
    
    const{orderDetails,error,loading,paymentmade} = orderCreate
    console.log(orderDetails);
    console.log(orderDetails.id);

   
    const [orderDetailsLoaded, setOrderDetailsLoaded] = useState(false);

    const price=  cartItems.reduce((acc,item) => acc+item.qty_*item.price, 0).toFixed(2)
    console.log(price);
    

    useEffect(() => {
        if(orderDetailsLoaded){
           const id=orderDetails.id
            showRazorpay({price,id})
            // navigate("/order")
        }
    },[orderDetailsLoaded])

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (loading) {
                await dispatch(getOrderDetails(orderDetails.id));
                setOrderDetailsLoaded(true);
            }
        };

        fetchOrderDetails();
    }, [loading, orderDetails, dispatch]);

    
   

    // ... rest of the component ...
 

    const submitHandler= () => {
        
        
            dispatch(createOrder({
                  orderItems: cartItem.cartItems,
                  
                  paymentMethod: selectedOption,
                  isPaid: true,
                  index:cartItem.address,
                  totalprice:  price
              }))
            
            
            
        
    }
    


    return (
        <>
            <div class="flex flex-col  bg-white  select-none  rounded-2xl+ sm:flex-row ">
                <div class="bg-gray-200 h-52 sm:h-full sm:w-72 rounded-xl ">


                {error && <Message>{error}</Message>}

                    <div className="max-w-md mx-auto px-">

                        <ul className="mt-1 space-y-2">
                            {
                                radios.map((item, idx) => (
                                    <li key={idx}>
                                        <label htmlFor={item.name} className="block relative">
                                            <input id={item.name} type="radio" defaultChecked={selectedOption=== item.name} name="payment" className="sr-only peer" onChange={handleOptionChange} value={item.name} />
                                            <div className="w-full flex gap-x-3 items-start p-4 cursor-pointer rounded-lg border bg-white shadow-sm ring-indigo-600 peer-checked:ring-2 duration-200">
                                                <div className="flex-none">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <h3 className="leading-none text-gray-800 font-medium pr-3">
                                                        {item.name}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-4 flex-none flex items-center justify-center w-4 h-4 rounded-full border peer-checked:bg-indigo-600 text-white peer-checked:text-white duration-200">
                                                <svg className="w-2.5 h-2.5" viewBox="0 0 12 10"><polyline fill="none" stroke-width="2px" stroke="currentColor" stroke-dasharray="16px" points="1.5 6 4.5 9 10.5 1"></polyline></svg>
                                            </div>
                                        </label>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>



                </div>
                <div class="flex flex-col flex-1 gap-5 sm:p-2">
                    <div class="flex flex-col flex-1 gap-3">
                        <div class="w-full bg-gray-200  h-14 rounded-2xl">
                            <div className="pl-3 pt-3 pr-3 flex justify-between text-base font-medium text-gray-900">
                                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty_, 0)})</h2>
                                ₹ {cartItems.reduce((acc, item) => acc + item.qty_ * item.price, 0).toFixed(2)}
                            </div>
                        </div>

                    </div>
                    <div class="flex gap-3 mt-auto">

                        <div class="w-20 h-8 ml-auto bg-gray-200 rounded-full ">
                            <button
                                onClick={() => submitHandler()}
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"

                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentOptions

