import React, { useState } from "react";
import { Typography, Box, MenuItem, Select, IconButton, Menu, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ArchiveIcon from "@mui/icons-material/Archive";
import NoteIcon from "@mui/icons-material/Note";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from "react-redux";
import { archiveTicket } from "../redux/ticketSlice";

const TicketDetails = ({ ticket, onBack }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const handleArchiveClick = () => {
        dispatch(archiveTicket(ticket.ticketId));
        setOpenSnackbar(true);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleMoreOptionsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuAction = (action) => {
        console.log(action); // Implement your action logic here
        handleCloseMenu();
    };

    return (
        <div className="p-4 bg-white shadow rounded">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <ArrowBackIcon className="cursor-pointer mr-2" onClick={onBack} />
                    <MailIcon titleAccess="Ticket Details" className="cursor-pointer mr-2" />
                    <Tooltip title="Dispose Ticket" arrow>
                        <ArchiveIcon
                            className="cursor-pointer mr-2"
                            onClick={handleArchiveClick}
                        />
                    </Tooltip>
                    <NoteIcon titleAccess="Add Notes" className="cursor-pointer mr-2" />
                    <Tooltip title="More Options" arrow>
                        <IconButton onClick={handleMoreOptionsClick}>
                            <MoreHorizIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={() => handleMenuAction('SMS Delivery Status')}>
                            SMS Delivery Status
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuAction('Compose Mail')}>
                            Compose Mail
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuAction('Add Attachment')}>
                            Add Attachment
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuAction('Mark as Junk')}>
                            Mark as Junk
                        </MenuItem>
                    </Menu>
                </div>
            </div>

            <Typography variant="h6" className="mb-4">
                Ticket Information
            </Typography>

            {/* Ticket Info Box */}
            <Box className="border border-gray-300 p-4 rounded mb-4">
                <div className="flex items-center mb-2">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-full mr-2">
                        {ticket.name.charAt(0)}
                    </div>
                    <Typography variant="h6">{ticket.name}</Typography>
                </div>

                <div className="mb-2">
                    <strong>Email:</strong> <span className="ml-1">{ticket.email}</span>
                </div>
                <div className="mb-2">
                    <strong>Phone:</strong> <span className="ml-1">123-456-7890</span>
                </div>
                <div className="mb-2">
                    <strong>Ticket ID:</strong> <span className="ml-1">{ticket.ticketId}</span>
                </div>
                <div className="mb-2">
                    <strong>Priority:</strong>
                    <Select
                        value={ticket.priority}
                        className="ml-1"
                        onChange={() => {}}
                    >
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                    </Select>
                </div>
                <div className="mb-2">
                    <strong>Address:</strong> <span className="ml-1">123 Random St, City, State, 12345</span>
                </div>
            </Box>

            {/* Customer Information Accordion */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Customer Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="mb-2">
                        <strong>Customer Code:</strong> <span className="ml-1">N/A</span>
                    </div>
                    <div className="mb-2">
                        <strong>Ticket URL:</strong> <span className="ml-1">Link to Ticket</span>
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Ticket Information Accordion */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Ticket Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
            <tbody>
                <tr>
                    <td className="p-2"><strong>Status</strong></td>
                    <td className="p-2">: Pending</td>
                </tr>
                <tr>
                    <td className="p-2"><strong>SLA Status</strong></td>
                    <td className="p-2">: SLA is violated</td>
                </tr>
                <tr>
                    <td className="p-2"><strong>Created Date</strong></td>
                    <td className="p-2">: 20th Jun 2024, 03:00:02 pm</td>
                </tr>
                <tr>
                    <td className="p-2"><strong>Ticket Tags</strong></td>
                    <td className="p-2">: N/A</td>
                </tr>
                <tr>
                    <td className="p-2"><strong>Due Date</strong></td>
                    <td className="p-2">: 20th Jun 2024, 03:00:02 pm</td>
                </tr>
                <tr>
                    <td className="p-2"><strong>Creator Name</strong></td>
                    <td className="p-2">: Supervisor</td>
                </tr>
                <tr>
                    <td className="p-2"><strong>Last Disposition Type</strong></td>
                    <td className="p-2">: N/A</td>
                </tr>
                <tr>
                    <td className="p-2"><strong>End Date</strong></td>
                    <td className="p-2">: N/A</td>
                </tr>
                <tr>
                    <td className="p-2"><strong>Assigned</strong></td>
                    <td className="p-2">: Supervisor</td>
                </tr>
                <tr>
                    <td className="p-2"><strong>Folder Level</strong></td>
                    <td className="p-2">: Inbox</td>
                </tr>
                <tr>
                    <td className="p-2"><strong>Queue Name</strong></td>
                    <td className="p-2">: N/A</td>
                </tr>
                <tr>
                    <td className="p-2"><strong>Current Sub Status</strong></td>
                    <td className="p-2">: Replied</td>
                </tr>
                <tr>
                    <td className="p-2"><strong>Remarks</strong></td>
                    <td className="p-2">: N/A</td>
                </tr>
            </tbody>
        </table>
    </div>
</AccordionDetails>


            </Accordion>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={`Ticket ${ticket.ticketId} is disposed`}
            />
        </div>
    );
};

export default TicketDetails;
