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
    console.log(query);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if(query === ''){
      const { data } = await axios.get('/api/products/');
      console.log(data);
      return data;
    }
    const response = await axios.get(`/api/products/searchitem/?query=${query}`, config);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: { products: [], productDetails: {}, loading: false, error: null,search:false,searchedProduct:[],filter:false,filterPrdoduct:[] },
  reducers: {
    setError(state) {
      
      state.error=null
      state.searchedProduct=[]
    
     
    
    },
    setFilter(state, action) {
      const { type, category, sort } = action.payload;
      state.filter=true

      // Filter products based on category and type
       const productfilter=state.search? state.searchedProduct:state.products
      const filteredProducts = productfilter.filter((product) => {
        console.log(type);
        if (type === '') {
          return true; // No category filter selected, show all products
        }
        return type.includes(product.category);
      });

      // Sort the filtered products based on the selected sort option
      let sortedProducts = type==''?[...state.products]:[...filteredProducts];

      if (sort === 'Price: Low to High') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sort === 'Price: High to Low') {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sort === 'Best Rating') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
      }
      else if (sort === 'Most Popular') {
        // Sorting in ascending order of createdAt
        sortedProducts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      }

      state.filterPrdoduct = sortedProducts;
      console.log(state.products);
      
    },
  
    
  },
  extraReducers: {
    
      [listProducts.pending]: (state) => {
        state.loading = true;
        state.error=null
      },
      [listProducts.fulfilled]: (state, action) => {
        state.loading = false;
        state.filter=false;
        state.products = action.payload;
       
      },
      [listProducts.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
      [listProductDetails.pending]: (state) => {
        state.loading = true;
        state.error=null
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
        state.error=null
      },
      [fetchLiveSearchResults.fulfilled]: (state,action) => {
        state.loading = false;
        state.search= true;
        state.searchedProduct=action.payload;
       
        
      },
      [fetchLiveSearchResults.rejected]: (state,action) => {
        state.loading = false;
        state.error=action.error.message
        
      }
  },
});

export const {setError,setFilter} = productSlice.actions;

export default productSlice.reducer;
