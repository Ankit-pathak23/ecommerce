import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './Pages/Home';

import Error400 from './Containers/Error400/Error400';
import ProductDetailpage from './Pages/ProductDetailPage';
import Cart from './Pages/Cart';
import Signin from './Pages/Singin';
import SignUp from './Pages/SignUp';
import Account from './hocs/Account';
import OrderDetail from './Pages/OrderDetail';
import Order from './Pages/Orders';
import Profile from './Pages/Profile';
import Address from './Pages/Address';
import Checkout from './Pages/CheckOut';
import ProfileEdit from './Pages/ProfileEdit';
import Otp from './Pages/Otp';
import ForgetPassword from './Pages/ForgetPassword';
import PasswordReset from './Pages/PasswordReset';
import PaymentOptions from './Pages/PaymentOptions';
import SavedAddress from './Pages/SavedAddress';
import AddAddress from './Pages/AddAddress';
// import PayPalPayment from './Pages/PaymentOptions';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path='*' element={<Error400 />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/product/:id' element={<ProductDetailpage />} />
          <Route path='/cart/:id?' element={<Cart />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/orderdetail/:id' element={<OrderDetail/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/profile/edit' element={<ProfileEdit/>}/>
          <Route path='/address' element={<Address/>}/>
          <Route path='/addaddress' element={<AddAddress/>}/>
          <Route path='/login' element={<Signin />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/profile/verify' element={<Otp/>}/>
          <Route path='/payment' element={<PaymentOptions/>}/>
          <Route path='/profile/forgotpassword' element={<ForgetPassword/>}/>
          <Route path='/profile/resetpassword' element={<PasswordReset/>}/>
        </Route>
      </Routes>
    </Router>
  
  );
}

export default App;
