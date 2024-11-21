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
  chatMessages: [],
  staffEmail: null,
  groupId: null,
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
    setStaffEmail: (state, action) => {
      state.staffEmail = action.payload;
    },
    setStaffGroupId: (state, action) => {
      state.groupId = action.payload;
    },
    addMessage: (state, action) => {
      state.chatMessages = [...action.payload, ...state.chatMessages];
    },
    setUpdatedTrainer: (state, action) => {
      // Update state
      state.myTrainerDetails = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase('LOGOUT', state => {
      state.myTrainerDetails = {};
      state.adminInfo = {};
      state.chatMessages = [];
      state.staffEmail = null;
      state.groupId = null;
    });

    builder.addCase(getInitialInfo.fulfilled, (state, action) => {
      state.customerSubscriptions = action.payload?.subscriptionsCollection;
    });
  },
});

export const {setAdminInfo, addMessage, setStaffEmail, setStaffGroupId} =
  initSlice.actions;

export default initSlice.reducer;
