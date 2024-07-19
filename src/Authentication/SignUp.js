// import React from 'react';
// import { Grid, Paper, Avatar, Typography, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

// const SignUp = () => {
//     const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
//     const headerStyle = { margin: 0 };
//     const avatarStyle = { backgroundColor: '#1bbd7e' };
//     const marginTop = { marginTop: 5 };

//     return (
//         <Grid>
//             <Paper style={paperStyle}>
//                 <Grid align='center'>
//                     <Avatar style={avatarStyle}>
//                         <AddCircleOutlineOutlinedIcon />
//                     </Avatar>
//                     <Typography variant='h5' style={headerStyle}>Sign Up</Typography>
//                     <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
//                 </Grid>
//                 <form>
//                     <TextField fullWidth label='Name' placeholder="Enter your name" style={marginTop} />
//                     <TextField fullWidth label='Email' placeholder="Enter your email" style={marginTop} />
//                     <FormControl component="fieldset" style={marginTop}>
//                         <FormLabel component="legend">Gender</FormLabel>
//                         <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
//                             <FormControlLabel value="female" control={<Radio />} label="Female" />
//                             <FormControlLabel value="male" control={<Radio />} label="Male" />
//                         </RadioGroup>
//                     </FormControl>
//                     <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" style={marginTop} />
//                     <TextField fullWidth label='Password' type="password" placeholder="Enter your password" style={marginTop} />
//                     <TextField fullWidth label='Confirm Password' type="password" placeholder="Confirm your password" style={marginTop} />
//                     <FormControlLabel
//                         control={<Checkbox name="checkedA" />}
//                         label="I accept the terms and conditions."
//                         style={marginTop}
//                     />
//                     <Button type='submit' variant='contained' color='primary' style={marginTop}>Sign up</Button>
//                 </form>
//             </Paper>
//         </Grid>
//     );
// }

// export default SignUp;
