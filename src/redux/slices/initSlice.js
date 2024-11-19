import {createSlice} from '@reduxjs/toolkit';

import {initApi} from '../../services/initApi';
import {getInitialInfo} from '../../services/thunkApi';

const initialState = {
  gymsFilters: {},
  allCategories: [],
  allServices: [],
  trainersServices: [],
  servicesByCategoryCollection: [],
  universitiesCollection: [],
  allFacilities: [],
  myLocation: null,
  gymsCollection: {},
  trainersCollection: {},
  myTrainerDetails: {},
  initTrainerData: {},
  initCustomer: {},
  initialCompany: {},
  customerSubscriptions: [],
  customerFavouriteCompanies: [],
  customerFavouriteTrainers: [],
  customerFavouriteTrainersHome: [],
  trainersScreenServices: [],
  homeStackEnabled: false,
  appIsUnderMaintenance: false,

  adminInfo: {},
};

export const FILTER_ATTRIBUTES = {
  TOP_REVIEWED: 'TOP_REVIEWED',
  RANGE_REVIEW: 'RANGE_REVIEW',
  CATEGORY: 'CATEGORY',
  FACILITIES: 'FACILITIES',
};
export const initSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {
    setAdminInfo: (state, action) => {
      state.adminInfo = action.payload;
    },
    setUpdatedTrainer: (state, action) => {
      // Update state
      state.myTrainerDetails = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase('LOGOUT', state => {
      state.myTrainerDetails = {};
      state.initCustomer = {};
      state.initialCompany = {};
    });

    builder.addCase(getInitialInfo.fulfilled, (state, action) => {
      state.customerSubscriptions = action.payload?.subscriptionsCollection;
    });
  },
});

export const {setAdminInfo} = initSlice.actions;

export default initSlice.reducer;
