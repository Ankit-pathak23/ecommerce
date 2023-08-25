import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';



export const createOrder = createAsyncThunk('order/createOrder', async (order, { getState }) => {
  const { userInfo,ShippingAddress } = getState().user;
 
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  
    const { data } = await axios.post(`/api/orders/add/`,order, config);

    localStorage.removeItem('cartItems');
  
    return data;
  });


  export const getOrderDetails=createAsyncThunk('order/getOrderDetails',async(id,{getState}) => {
    const{
        userLogin:{userInfo},
    }= getState();
    const config={
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${userInfo.token}`,
        },
    };
    const {data} = await axios.get(`api/order/${id}/`,config);
    console.log(data);
    return data;
  });

// const addressFromStorage= localStorage.getItem('address') ?
// JSON.parse(localStorage.getItem('address')) : ''
  const orderSlice = createSlice ({
    name : 'order',
    initialState:{orderDetails : {}, loading:false,error:null},
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder 
            .addCase(createOrder.pending,(state) => {
                state.loading=true;
            })
            .addCase(createOrder.fulfilled,(state,action) => {
                state.loading =false;
                state.orderDetails=action.payload;
                console.log(state.orderDetails);
            })
            .addCase(createOrder.rejected,(state,action)=> {
                state.loading= false;
                state.error = action.payload;
            })
            .addCase(getOrderDetails.pending ,(state)=> {
                state.loading=true;
            })
            .addCase(getOrderDetails.fulfilled,(state,action)=>{
                state.loading=false;
                state.orderDetails=action.payload;
            })
            .addCase(getOrderDetails.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
    },
  });

  

  export default orderSlice.reducer;