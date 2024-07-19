// store.js
import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './ticketSlice';

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});

export default store;
