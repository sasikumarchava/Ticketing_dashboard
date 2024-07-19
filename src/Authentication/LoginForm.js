import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {

    const navigate = useNavigate();
    const initialValues = {
        username: '',
        password: '',
        remember: false
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().email('Please enter a valid email').required("Required"),
        password: Yup.string().required("Required")
    });

    const onSubmit = (values, props) => {
        console.log(values);
        setTimeout(() => {
            props.resetForm();
            props.setSubmitting(false);
            onLogin();
            navigate("/") // Call the login handler after successful submission
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Paper className="p-8 w-full max-w-md bg-white rounded-lg shadow-md transition transform hover:scale-70 duration-300">
                <Grid align="center">
                    <Avatar className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        <AccountCircleIcon className="text-white" />
                    </Avatar>
                    <Typography variant="h5" className="mt-2 mb-4 text-gray-800">Sign In</Typography>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <div className="mb-4">
                                <Field
                                    as={TextField}
                                    label="Username"
                                    name="username"
                                    placeholder="Enter username"
                                    fullWidth
                                    required
                                    helperText={<ErrorMessage name="username" />}
                                    error={props.touched.username && Boolean(props.errors.username)}
                                    variant="outlined"
                                    className="mb-2"
                                />
                            </div>
                            <div className="mb-4">
                                <Field
                                    as={TextField}
                                    label="Password"
                                    name="password"
                                    placeholder="Enter password"
                                    type="password"
                                    fullWidth
                                    required
                                    helperText={<ErrorMessage name="password" />}
                                    error={props.touched.password && Boolean(props.errors.password)}
                                    variant="outlined"
                                    className="mb-2"
                                />
                            </div>
                            <div className="mb-4">
                                <Field
                                    as={FormControlLabel}
                                    name="remember"
                                    control={<Checkbox color="primary" />}
                                    label="Remember me"
                                    className="text-gray-600"
                                />
                            </div>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                disabled={props.isSubmitting}
                                fullWidth
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition duration-300 transform hover:translate-y-1"
                            >
                                {props.isSubmitting ? "Loading" : "Sign in"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Typography className="mt-4 text-center">
                    <Link href="#" underline="hover" className="text-blue-600 hover:text-blue-800">
                        Forgot password?
                    </Link>
                </Typography>
            </Paper>
        </div>
    );
};

export default LoginForm;

