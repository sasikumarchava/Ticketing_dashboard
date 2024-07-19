import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useDispatch } from 'react-redux';
import { setSearchQuery} from '../redux/ticketSlice';

const Header = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
  const [number, setNumber] = useState(8); // Default to 8 tickets per page
  const [conversation, setConversation] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
  };

  const handleTicketsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumber(value); // Update local state if needed
  };

  const handleConversationChange = (e) => {
    setConversation(e.target.value);
  };

  return (
    <div className="flex items-center w-full p-2">
      <input type="checkbox" className="mx-2" />
      <div className="flex items-center rounded mx-2 p-1 bg-white border border-gray-300">
        <SearchIcon className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search tickets..."
          className="w-full outline-none"
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex items-center mx-2">
        <span className="mx-1">Show</span>
        <select
          value={number}
          onChange={handleTicketsPerPageChange}
          className="w-full bg-white border border-gray-300 rounded p-2"
        >
          {Array.from({ length: 100 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center border border-gray-300 rounded ml-auto">
        <IconButton onClick={onPrevPage} className="p-0" disabled={currentPage === 0}>
          <ArrowLeftIcon />
        </IconButton>
        <span className="mx-2">
          {currentPage + 1} - {totalPages}
        </span>
        <IconButton onClick={onNextPage} className="p-0" disabled={currentPage + 1 === totalPages}>
          <ArrowRightIcon />
        </IconButton>
      </div>

      <div className="ml-3">
        <select
          value={conversation}
          onChange={handleConversationChange}
          className="w-full bg-white border border-gray-300 rounded p-2"
        >
          <option value="">
            <em>Last conversation</em>
          </option>
          <option value="conversation1">Conversation 1</option>
          <option value="conversation2">Conversation 2</option>
          <option value="conversation3">Conversation 3</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
