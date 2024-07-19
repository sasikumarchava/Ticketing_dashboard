import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTickets as fetchTicketsApi } from '../api/ticket';
import { saveTicketsApi } from '../api/ticket';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
  const data = await fetchTicketsApi();
  return data;
});

export const saveTickets = (tickets) => {
  saveTicketsApi(tickets);
  localStorage.setItem('tickets', JSON.stringify(tickets)); 
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: JSON.parse(localStorage.getItem('tickets')) || [],
    status: 'idle',
    error: null,
    searchQuery: '',
    ticketsToShow: 8, // Default to 8 tickets per page
    composeEmailOpen: false, // Initial state for compose email
  },
  reducers: {
    addTicket: (state, action) => {
      const updatedTickets = [...state.tickets, action.payload];
      state.tickets = updatedTickets;
      localStorage.setItem('tickets', JSON.stringify(updatedTickets));
    },
    archiveTicket: (state, action) => {
      const updatedTickets = state.tickets.filter(
        ticket => ticket.ticketId !== action.payload
      );
      state.tickets = updatedTickets;
      localStorage.setItem('tickets', JSON.stringify(updatedTickets));
    },
    setTickets: (state, action) => {
      state.tickets = action.payload;
      localStorage.setItem('tickets', JSON.stringify(action.payload));
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
    setTicketsToShow: (state, action) => {
      state.ticketsToShow = action.payload;
    },
    // New reducer to manage composeEmailOpen state
    setComposeEmailOpen: (state, action) => {
      state.composeEmailOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets = action.payload;
        localStorage.setItem('tickets', JSON.stringify(action.payload)); // Store fetched tickets in local storage
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { addTicket, archiveTicket, setTickets, setSearchQuery, clearSearchQuery, setTicketsToShow, setComposeEmailOpen } = ticketSlice.actions;

// Selectors
export const selectTickets = (state) => state.tickets.tickets;
export const selectSearchQuery = (state) => state.tickets.searchQuery;
export const selectTicketsToShow = (state) => state.tickets.ticketsToShow;
export const selectComposeEmailOpen = (state) => state.tickets.composeEmailOpen;

export default ticketSlice.reducer;

