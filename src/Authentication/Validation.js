import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from './LoginForm';

const SignInOutContainer = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const paperStyle = { width: 340, margin: "20px auto" };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={2}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    return (
        <Paper elevation={20} style={paperStyle}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                onChange={handleChange}
                aria-label="sign in tabs"
            >
                <Tab label="Sign In" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Login handleChange={handleChange} />
            </TabPanel>
        </Paper>
    );
}

export default SignInOutContainer;

