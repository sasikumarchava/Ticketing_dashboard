import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { archiveTicket, selectTickets, selectSearchQuery } from '../redux/ticketSlice';
import MailIcon from '@mui/icons-material/Mail';
import ArchiveIcon from '@mui/icons-material/Archive';
import Tooltip from '@mui/material/Tooltip';
import FlagIcon from '@mui/icons-material/Flag';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ChatIcon from '@mui/icons-material/Chat';

const modeMapping = {
    mail: { icon: <MailIcon style={{ color: '#D44638' }} />, name: 'Mail' },
    whatsapp: { icon: <WhatsAppIcon style={{ color: '#25D366' }} />, name: 'WhatsApp' },
    instagram: { icon: <InstagramIcon style={{ color: '#E4405F' }} />, name: 'Instagram' },
    linkedin: { icon: <LinkedInIcon style={{ color: '#0077B5' }} />, name: 'LinkedIn' },
    chatbot: { icon: <ChatIcon style={{ color: '#FF9900' }} />, name: 'Chatbot' },
    default: { icon: <MailIcon style={{ color: '#D44638' }} />, name: 'Unknown' },
};

const Body = ({ onTicketClick, currentPage, ticketsPerPage, shuffledTickets }) => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(selectSearchQuery);
    const tickets = useSelector(selectTickets); // Always declare useSelector at the top

    useEffect(() => {
        console.log('Current tickets:', tickets);
        // Ensure tickets are stored in localStorage on state update
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }, [tickets]);

    // Conditionally use shuffledTickets or useSelector for tickets array
    const filteredTickets = (shuffledTickets || tickets).filter(ticket =>
        ticket.status !== 'ARCHIVED' && // Exclude archived tickets
        (ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
         ticket.mode.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Calculate pagination index range
    const startIndex = currentPage * ticketsPerPage;
    const displayedTickets = filteredTickets.slice(startIndex, startIndex + ticketsPerPage);

    const handleArchive = (ticketId, event) => {
        event.stopPropagation();
        dispatch(archiveTicket(ticketId));
        alert('Ticket is archived');
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <tbody>
                    {displayedTickets.map((record) => {
                        const mode = modeMapping[record.mode] || modeMapping.default;
                        return (
                            <tr
                                key={record.ticketId}
                                onClick={() => onTicketClick(record)}
                                className="hover:bg-gray-100 cursor-pointer"
                            >
                                <td className="p-4 border-b border-gray-300 text-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </td>
                                <td className="p-4 border-b border-gray-300 text-center">
                                    <div className="flex items-center justify-center">
                                        <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 mr-1">
                                            {record.email.charAt(0).toLowerCase()}
                                        </div>
                                        <span className="truncate max-w-[150px] block">{record.email}</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-gray-300 text-center">
                                    <div className="flex items-center justify-center">
                                        <Tooltip title={mode.name}>
                                            {mode.icon}
                                        </Tooltip>
                                        <span className="rounded-full bg-red-50 text-red-500 border border-red-500 px-2 py-1 ml-4">{mode.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-gray-300 text-center truncate max-w-[150px]">{record.name}</td>
                                <td className="p-4 border-b border-gray-300 text-center">
                                    <div className={`w-16 h-8 flex items-center justify-center rounded-md ${record.status === 'RES' ? 'bg-green-200 text-green-600' : 'bg-yellow-200 text-yellow-600'}`}>
                                        <span className="text-base">{record.status}</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-gray-300 text-center">
                                    <div className="flex items-center justify-center">
                                        <Tooltip title="Escalated">
                                            <FlagIcon className="text-red-600 mr-2 cursor-pointer" />
                                        </Tooltip>
                                        <Tooltip title="Archive Ticket">
                                            <ArchiveIcon
                                                className="text-yellow-600 mr-2 cursor-pointer"
                                                onClick={(event) => handleArchive(record.ticketId, event)}
                                            />
                                        </Tooltip>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-gray-300 text-center">
                                    <Tooltip title={record.priority === 'high' ? "High Priority" : "Low Priority"}>
                                        <div className={`w-4 h-4 flex items-center justify-center ${record.priority === 'high' ? 'bg-red-100 border border-red-500 text-red-500' : 'bg-blue-100 border border-blue-500 text-blue-500'} rounded ml-2`}>
                                            {record.priority === 'high' ? 'H' : 'L'}
                                        </div>
                                    </Tooltip>
                                </td>
                                <td className="p-4 border-b border-gray-300 text-center truncate max-w-[100px]">{record.date}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Body;

