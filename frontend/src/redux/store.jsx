import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// Import other slices if you have them
import CartSlice from './Slice/CartSlice';
import ProductSlice from './Slice/ProductSlice';
import UserSlice from './Slice/UserSlice';
import OrderSlice from './Slice/OrderSlice';

const store = configureStore({
  reducer: {
    products: ProductSlice,
    // Add other reducers for different parts of your application here if needed
    cart: CartSlice,
    user: UserSlice,
    order: OrderSlice,
  },
  middleware: [...getDefaultMiddleware({
    serializableCheck: false
  })],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
