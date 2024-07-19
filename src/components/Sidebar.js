import React, { useState } from 'react';
import { Button, Box, Typography, IconButton, Tooltip, Popover } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import ComposeEmail from './Email';

const Sidebar = ({ toggleAddTicket, setActiveView, shuffleTickets }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeView, setActiveViewState] = useState("Unassigned");
    const [composeEmailOpen, setComposeEmailOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewClick = (view) => {
        setActiveViewState(view);
        setActiveView(view);
        shuffleTickets(view);
        handleClose(); 
    };

    const handleAddTicket = () => {
        toggleAddTicket();
        handleClose();
    };

    const handleComposeMail = () => {
        setComposeEmailOpen(true);
        handleClose();
    };

    const handleComposeEmailClose = () => {
        setComposeEmailOpen(false);
    };

    const views = [
        "Unassigned",
        "All Pending",
        "All Complete",
        "All Junk",
        "Assigned to Me",
        "Created by Me"
    ];

    return (
        <div className='relative'>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Views</Typography>

                <Tooltip title="Search Folder">
                    <div className='pl-12 cursor-pointer'>
                        <FolderIcon />
                    </div>
                </Tooltip>
                <Tooltip title="New Ticket Creation" arrow>
                    <IconButton onClick={handleClick} className="p-1">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-300">
                            <AddIcon style={{ fontSize: '24px' }} />
                        </div>
                    </IconButton>
                </Tooltip>
            </Box>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className="mt-2 mb-3 w-48 bg-white shadow-lg rounded-lg border border-gray-300">
                    <div className="p-2">
                        <div className='pb-3'>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleAddTicket}
                                className="w-full mb-2 border border-black text-black hover:bg-black hover:text-white"
                            >
                                Add Ticket
                            </Button>
                        </div>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleComposeMail}
                            className="w-full border border-black text-black hover:bg-black hover:text-white"
                        >
                            Compose Mail
                        </Button>
                    </div>
                </div>
            </Popover>

            <Box display="flex" flexDirection="column">
                {views.map((view) => (
                    <Button
                        key={view}
                        variant="text"
                        onClick={() => handleViewClick(view)}
                        sx={{
                            mb: 1,
                            justifyContent: 'flex-start',
                            width: '100%',
                            color: activeView === view ? 'white' : 'black',
                            backgroundColor: activeView === view ? '#1976D2' : 'transparent',
                            '&:hover': {
                                cursor: 'pointer',
                                backgroundColor: activeView === view ? '#1565C0' : '#E3F2FD',
                            },
                        }}
                    >
                        {view}
                    </Button>
                ))}
            </Box>
            <Popover
                open={composeEmailOpen}
                onClose={handleComposeEmailClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <ComposeEmail onBackClick={handleComposeEmailClose} />
            </Popover>
        </div>
    );
};

export default Sidebar;
