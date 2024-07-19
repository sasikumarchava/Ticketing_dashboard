// // api/tickets.js
import axios from 'axios';

export const fetchTickets = async () => {
  const response = await axios.get('http://localhost:5000/tickets');
  return response.data;
};

const BASE_URL = 'http://localhost:5000';

export const saveTicketsApi = async (tickets) => {
  try {
    const response = await axios.post(`${BASE_URL}/tickets`, tickets);
    return response.data;
  } catch (error) {
    throw new Error(`Error saving tickets: ${error.message}`);
  }

};

// import axios from 'axios';

// const BASE_URL = "ticket-27ydrs7nw-sasikumarchavas-projects.vercel.app";

// export const fetchTickets = async () => {
//   const response = await axios.get(`${BASE_URL}/api/tickets`);
//   return response.data;
// };

// export const saveTicketsApi = async (tickets) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/api/tickets`, tickets);
//     return response.data;
//   } catch (error) {
//     throw new Error(`Error saving tickets: ${error.message}`);
//   }
// };

