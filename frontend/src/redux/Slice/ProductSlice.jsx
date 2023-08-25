import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const listProducts = createAsyncThunk('products/listProducts', async () => {
  
  const { data } = await axios.get('/api/products/');
  return data;
  
});

export const listProductDetails = createAsyncThunk('products/listProductDetails', async (id) => {
  
  const { data } = await axios.get(`/api/products/${id}`);
  
  
  return data;
});

export const fetchLiveSearchResults = createAsyncThunk(
  'product/fetchLiveSearchResults',
  async (query) => {
    const response = await axios.get(`/api/products/search//?search=${query}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: { products: [], productDetails: {}, loading: false, error: null },
  reducers: {},
  extraReducers: {
    
      [listProducts.pending]: (state) => {
        state.loading = true;
      },
      [listProducts.fulfilled]: (state, action) => {
        state.loading = false;
        state.products = action.payload;
       
      },
      [listProducts.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
      [listProductDetails.pending]: (state) => {
        state.loading = true;
      },
      [listProductDetails.fulfilled]: (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      },
      [listProductDetails.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
      [fetchLiveSearchResults.pending]: (state) => {
        state.loading = true;
        
      },
      [fetchLiveSearchResults.fulfilled]: (state,action) => {
        state.loading = false;
        state.products=action.payload;
        
      },
      [fetchLiveSearchResults.rejected]: (state,action) => {
        state.loading = false;
        state.error=action.error.message
        
      }
  },
});

export default productSlice.reducer;
