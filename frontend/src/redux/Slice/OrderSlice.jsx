import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';




export const createOrder = createAsyncThunk('order/createOrder', async (order, { getState }) => {
  const { userInfo } = getState().user;
 
  
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


  export const razorpay = createAsyncThunk('order/payment', async ({ paymentID, orderID, signature, price }, { getState }) => {
    const { userInfo } = getState().user;
   
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log('hii');
  
    
       const {data} = await axios.post(`/api/payment/`, {
        payment_id: paymentID,
        order_id: orderID,
        signature: signature,
        amount: price,
  },config);
  
      
    
      return data;
    });


    


  export const getOrderDetails=createAsyncThunk('order/getOrderDetails',async(id,{getState}) => {
    const { userInfo } = getState().user;
    const config={
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${userInfo.token}`,
        },
    };
    const {data} = await axios.get(`api/orders/${id}/`,config);
    console.log(data);
    return data;
  });
  export const usersorders = createAsyncThunk('order/usersorder', async (id, { getState }) => {
    console.log("hii");
    try {
      const { userInfo } = getState().user;
      console.log("hwo");
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      console.log("hlo");
      const { data } = await axios.get(`api/users/orders/`, config);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to be caught by the calling code
    }
  });
  export const paymentinitated = createAsyncThunk('payment', async ({price,id}, { getState }) => {
    console.log("hii");
    try {
      const { userInfo } = getState().user;
      console.log("hwo");
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      console.log("hlo");
      const { data } = await axios.post(`razorpay/pay`, {amount:price,id},config);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to be caught by the calling code
    }
  });
  export const paymentsuccess = createAsyncThunk('payment', async ({response}, { getState }) => {
    console.log("hii");
    try {
      const { userInfo } = getState().user;
      console.log("hwo");
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      console.log("hlo");
      const { data } = await axios.post(`razorpay/success`, {response},config);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to be caught by the calling code
    }
  });

// const addressFromStorage= localStorage.getItem('address') ?
// JSON.parse(localStorage.getItem('address')) : ''
  const orderSlice = createSlice ({
    name : 'order',
    initialState:{orderDetails : {}, loading:false,error:null,paymentmade:false,userOrder:[],orderLoading:false},
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
                state.orderLoading=false
            })
            .addCase(getOrderDetails.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(razorpay.pending ,(state)=> {
                state.loading=true;
            })
            .addCase(razorpay.fulfilled,(state,action)=>{
                state.loading=false;
                state.orderDetails=action.payload;
                state.paymentmade=true;
            })
            .addCase(razorpay.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(usersorders.pending ,(state)=> {
                state.loading=true;
                
            })
            .addCase(usersorders.fulfilled,(state,action)=>{
                state.loading=false;
                state.userOrder=action.payload;
                // state.paymentmade=true;
            })
            .addCase(usersorders.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
    },
  });

  

  export default orderSlice.reducer;