import {createAsyncThunk} from '@reduxjs/toolkit';

import {BASE_URL} from '../utils/Constants';
import instance from './axiosClient';

// export const createAppointment = createAsyncThunk(
//   'trainers/createAppointment',
//   async ({body, company_id}, thunkAPI) => {
//     try {
//       const url = `trainer/company/${company_id}/appointment/create`;
//       const response = await instance.post(url, body);

//       console.log({response});
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.message);
//     }
//   },
// );

export const getInitialInfo = createAsyncThunk(
  'user/initialInfo',
  async ({params}, thunkAPI) => {
    try {
      // Properly construct the URL with query parameters
      const queryString = new URLSearchParams(params).toString();
      const url = `login-staff?${queryString}`;
      const response = await instance.get(url);

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
