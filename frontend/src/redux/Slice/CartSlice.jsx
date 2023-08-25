import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const  addToCart= createAsyncThunk('cart/addToCart',async({id_,qty_,sizeVariant})=>{
console.log(sizeVariant);
  const {data} = await axios.get(`http://127.0.0.1:8000/api/products/${id_}`);
  const { id: productId, name, image, price } = data;
  qty_=Number(qty_)
  return {
    product: productId,
    name,
    image,
    price,
    qty_,
    size:sizeVariant,
  };

})


const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []
const initialState={
  cartItems: cartItemsFromStorage,
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  
};


const cartSlice =createSlice({
  name:'cart',
  initialState,
  reducers: {
    removeFromCart(state,action) {
      
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.product !== itemId);
      
      if(state.cartItems.length === 0) {
        try{localStorage.removeItem('cartItems');}
        catch(error){
          console.log(error);
        }

      }
      else
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    
    },
    saveAddressId(state,action) {
      
      state.address=action.payload
     
    
    }
   
   
  },
  extraReducers: {
  
    [addToCart.fulfilled]: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item)=> item.product === action.payload.product
        
      );
       if(itemIndex>=0){
        state.cartItems[itemIndex].qty_=Number(state.cartItems[itemIndex].qty_)+1;
       }
      else {
        
        state.cartItems.push(action.payload);
      
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
      
      }
    },
    [addToCart.rejected]: (state, action) => {
      
    
    },
  }
  
})


export const {removeFromCart,saveAddressId} = cartSlice.actions;


export default cartSlice.reducer;