import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../redux/ticketSlice';
import Body from './Body';
import Header from './Header';

const TicketsPage = ({ onTicketClick }) => {
    const dispatch = useDispatch();
    const ticketStatus = useSelector((state) => state.tickets.status);
    const error = useSelector((state) => state.tickets.error);
    const tickets = useSelector((state) => state.tickets.tickets);
    
    const [currentPage, setCurrentPage] = useState(0);
    const ticketsPerPage = 8;

    useEffect(() => {
        if (ticketStatus === 'idle') {
            dispatch(fetchTickets());
        }
    }, [ticketStatus, dispatch]);

    const totalPages = Math.ceil(tickets.length / ticketsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    };

    return (
        <div>
            {ticketStatus === 'loading' && <p>Loading...</p>}
            {ticketStatus === 'failed' && <p>{error}</p>}
            <Header 
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
            />
            <Body 
                activeView="Assigned to Me" 
                onTicketClick={onTicketClick} 
                currentPage={currentPage}
                ticketsPerPage={ticketsPerPage}
            />
        </div>
    );
};

export default TicketsPage;

