import React, { useState } from 'react';
import { Button, Select, MenuItem, TextField, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addTicket } from '../redux/ticketSlice';
import { saveTicketsApi } from '../api/ticket';

const AddTicket = ({ toggleAddTicket }) => {
    const dispatch = useDispatch();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [medium, setMedium] = useState('');
    const [mediumId, setMediumId] = useState('');

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleMediumChange = (event) => {
        setMedium(event.target.value);
        setMediumId('');
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        name: Yup.string().required('Name is required'),
        title: Yup.string().required('Title is required'),
        mediumId: medium === 'mail' 
            ? Yup.string()
                .email('Invalid email format')
                .required('Email ID is required')
            : Yup.string(),
        priority: Yup.string().required('Priority is required'),
        date: Yup.string().required('Month and Year are required'),
        status: Yup.string().required('Status is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            title: '',
            mediumId: '',
            priority: 'low',
            date: '',
            status: 'PEND', // Default status
        },
        validationSchema,
        onSubmit: async (values) => {
            const newTicket = {
                email: values.email,
                name: values.name,
                mode: medium,
                status: values.status,
                ticketId: `TICKET-${Date.now()}`,
                priority: values.priority,
                date: values.date,
                mediumId: mediumId,
                files: selectedFiles,
            };

            try {
                // Save ticket via API
                await saveTicketsApi(newTicket);
                
                // Dispatch action to update Redux state
                dispatch(addTicket(newTicket));

                // Close add ticket form
                toggleAddTicket();
            } catch (error) {
                console.error('Error saving ticket:', error);
                // Handle error as needed (e.g., show error message to user)
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="mt-4 p-4 bg-white shadow rounded">
            <Button
                onClick={toggleAddTicket}
                startIcon={<ArrowBackIcon />}
                className="mb-4"
            >
                Back
            </Button>
            <Typography variant="h6">Ticket Template</Typography>

            <div className="mb-4 pb-6">
                <Typography variant="body2">Medium *</Typography>
                <Select
                    displayEmpty
                    value={medium}
                    onChange={handleMediumChange}
                    className="w-full"
                >
                    <MenuItem value="">
                        <em>Select Medium</em>
                    </MenuItem>
                    <MenuItem value="mail">Mail</MenuItem>
                    <MenuItem value="whatsapp">WhatsApp</MenuItem>
                    <MenuItem value="instagram">Instagram</MenuItem>
                    <MenuItem value="linkedin">LinkedIn</MenuItem>
                    <MenuItem value="payment">Payment</MenuItem>
                    <MenuItem value="delivery">Delivery</MenuItem>
                    <MenuItem value="technician">Technician</MenuItem>
                    <MenuItem value="chat">Chat</MenuItem>
                    <MenuItem value="test">Test</MenuItem>
                </Select>
                {medium && (
                    <TextField
                        placeholder={`Enter ${medium.charAt(0).toUpperCase() + medium.slice(1)} ID`}
                        variant="outlined"
                        fullWidth
                        value={mediumId}
                        onChange={(e) => setMediumId(e.target.value)}
                        className="mt-2 pt-6"
                    />
                )}
            </div>

            <div className="mb-4">
                <Typography variant="body2">Email *</Typography>
                <TextField
                    placeholder="Enter email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
            </div>

            <div className="mb-4">
                <Typography variant="body2">Name *</Typography>
                <TextField
                    placeholder="Enter name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
            </div>

            <div className="mb-4">
                <Typography variant="body2">Title *</Typography>
                <TextField
                    placeholder="Enter the title"
                    variant="outlined"
                    fullWidth
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
            </div>

            <div className="flex justify-between mb-4">
                <div className="w-1/2 mr-2">
                    <Typography variant="body2">Priority</Typography>
                    <Select
                        name="priority"
                        value={formik.values.priority}
                        onChange={formik.handleChange}
                        className="w-full"
                    >
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                    </Select>
                </div>
                <div className="w-1/2">
                    <Typography variant="body2">Ticket ID *</Typography>
                    <TextField
                        placeholder="Auto-generated"
                        variant="outlined"
                        fullWidth
                        value={`TICKET-${Date.now()}`} // Display generated ticket ID
                        InputProps={{ readOnly: true }}
                    />
                </div>
            </div>

            <div className="flex justify-between mb-4">
                <div className="w-1/2 mr-2">
                    <Typography variant="body2">Due Month and Year *</Typography>
                    <TextField
                        type="month"
                        variant="outlined"
                        className="w-full"
                        InputLabelProps={{ shrink: true }}
                        name="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
                    />
                </div>
                <div className="w-1/2">
                    <Typography variant="body2">Status *</Typography>
                    <Select
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        className="w-full"
                    >
                        <MenuItem value="PEN">Pending</MenuItem>
                        <MenuItem value="RES">Resolved</MenuItem>
                    </Select>
                </div>
            </div>

            <div className="mb-4">
                <Typography variant="body2">Assign To</Typography>
                <div className="flex justify-between items-center">
                    <Select
                        displayEmpty
                        className="w-full"
                        name="assignee"
                        value={formik.values.assignee}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="">
                            <em>Select Assignee</em>
                        </MenuItem>
                        <MenuItem value="user1">User 1</MenuItem>
                        <MenuItem value="user2">User 2</MenuItem>
                    </Select>
                    <IconButton onClick={() => alert('Upload functionality coming soon!')}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>

            <div className="mb-4">
                <Typography variant="body2">Drop files here</Typography>
                <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="fileUpload"
                />
                <label
                    htmlFor="fileUpload"
                    className="border-dashed border-2 border-gray-400 h-20 flex items-center justify-center cursor-pointer"
                >
                    <Typography variant="body2">Upload files or images</Typography>
                </label>

                <div className="mt-2 flex flex-wrap">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center bg-gray-200 rounded px-2 py-1 m-1">
                            <Typography variant="body2" className="text-sm">
                                {file.name}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default AddTicket;
