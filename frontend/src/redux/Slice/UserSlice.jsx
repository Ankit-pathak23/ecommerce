import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




const userData=localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem('userInfo')) : []

const initialState = {
    userInfo :  userData,
    loading : false,
    error : null,
    userDetails:[],
    ShippingAddress:[],
    isforget: false,
}



export const login = createAsyncThunk('user/login', async ({ email, password }) => {
  
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const { data } = await axios.post('/api/users/login/', { email: email, password }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    
    return data;
});


export const logout = createAsyncThunk('user/logout', async () => {
    localStorage.removeItem('userInfo');
});

export const register = createAsyncThunk('user/register', async ({ name, email, password,phone,image }) => {

  const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

    const { data } = await axios.post('api/users/register/', { 'name': name, 'email': email, 'password' : password ,'phone' :phone,'image':image}, config);
    
    localStorage.setItem('userInfo', JSON.stringify(data));

    return data;

});
export const googleregister = createAsyncThunk('user/googleregister', async ({name,email,image}) => {

  const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

    const { data } = await axios.post('api/users/googleregister/', { 'name': name, 'email': email,'image':image}, config);
    console.log(data);
    localStorage.setItem('userInfo', JSON.stringify(data));

    return data;

});


export const getUserDetails = createAsyncThunk('user/getUserDetails', async (id, { getState }) => {
 

  const { userInfo } = getState().user;

  
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const response = await axios.get('/api/users/profile', config);
    console.log(response.data);
    
    return response.data;
});


export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (user, { getState }) => {
  const { userInfo } = getState().user;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
    };
    

    const {data} = await axios.put(`/api/users/profile/update/`,user,config);
    localStorage.setItem('userInfo',JSON.stringify(data));

    return data;


});

export const addShippingAddress = createAsyncThunk(
  'user/addShippingAddress',
  async ({name,phone,country,city,address,postalCode}, { getState }) => {
    const { userInfo } = getState().user;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.post('/api/users/createshippingaddress/', {'name':name,'phone':phone,'address' : address,'city':city,'country':country,'postalCode':postalCode}, config);
    return response.data;
  }
);


export const verifyOTP = createAsyncThunk(
  'user/verifyOTP',
  async ({ email, otp },{getState}) => {
    const { userInfo } = getState().user;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.post('/api/users/verifyuser/', { email, otp }, config);
    return response.data;
  }
);


export const resendOTP = createAsyncThunk(
  'user/resendOTP',
  async (email) => {
    try {
      const response = await axios.post('/api/users/resendotp/', { email });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);


export const forgetpassword = createAsyncThunk(
  'user/forgetpassword',
  async (email) => {
    try {
      const response = await axios.post('/api/users/forgotpassword/', {email });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const resetPassword = createAsyncThunk(
  'user/resetPassword ',
  async ({email,otp,password}) => {
    try {
      const response = await axios.post('/api/users/reset-password/', {email,otp,password });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);




const userSlice = createSlice({
    name :'user',
    initialState,
    reducer : {},
    extraReducers: (builder) => {
        builder
        
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error=null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error=null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = [];
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        
        state.userInfo = action.payload;
        state.error=null
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(googleregister.pending, (state) => {
        state.loading = true;
        state.error=null
      })
      .addCase(googleregister.fulfilled, (state, action) => {
        state.loading = false;
        
        state.userInfo = action.payload;
        state.error=null
      })
      .addCase(googleregister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error=null
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        state.shippingAddress=action.payload.shippingAddress;
        state.error=null
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error=null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error=null
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addShippingAddress.fulfilled, (state, action) => {
        // Update state with the new shipping address
        state.shippingAddress = action.payload;
        state.error=null
      })
      .addCase(addShippingAddress.rejected, (state, action) => {
        state.error=action.payload
      })

      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails.isverified = true; // Update the user's verification status
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(forgetpassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetpassword.fulfilled, (state, action) => {
        state.loading = false;

        state.error = null;
        state.isforget=true;
      })
      .addCase(forgetpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;

        state.error = null;
        state.isforget=false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
  },
});

export default userSlice.reducer;