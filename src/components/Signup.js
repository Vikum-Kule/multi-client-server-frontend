import React ,{useState}from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Avatar, TextField, Button, Stack, Typography, Link, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LockIcon from '@mui/icons-material/Lock';
import { pink } from '@mui/material/colors';
import Validation from './Validation';
import {userLogin} from '../services/Auth';
import axios from 'axios';
import { Box } from '@mui/system';
import { useHistory } from 'react-router';
// import { Link } from 'react-router-dom';




const useStyles = makeStyles({
    paper:{
      padding:"20px",
      height:"75vh",
      width:"40vh",
      margin:"10vh auto"
  
    },
    header:{
        marginTop:"20px"
    },
    headerTxt:{
        marginTop:"0px"
    }, 
    forgotpss:{
        marginTop:"30px"
    }

})

function Signup(props) {
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);

    const [showError, setShowError] = useState("");

    const [values, setValues] = useState({
        fullname:"",
        username:"",
        password:"",

    });

    const [errors, setErrors]= useState({});

    const handleChange=(event)=>{
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }



        const handSignup = (fullname,username, password)=>{
            axios.post("/app/register/",{
                "name":fullname,
                "username": username,
                "password":password
            }).then(response=>{
                setLoading(false);
                console.log("Response..:", response);
                const user = response.data.split('/');
                console.log(user[1]);
                localStorage.setItem('userId', user[1]);
                history.push("/home/searchpatient");
            }).catch(error=>{
                setLoading(false);
                // 
                if(error.response.status === 401 || error.response.status === 400 ){
                    setShowError("Previously Logged");
                }
                else{
                    setShowError("Something went wrong...try again later");
                }
            })
        }

    const hanldeFormSubmit = async(event)=>{
        event.preventDefault();
        setErrors(Validation(values));
        if(values.fullname && values.password && values.username){ 
            setLoading(true);
            handSignup(values.fullname,values.username,values.password);
        }
    }

    const resetError = (event)=>{
        setErrors({});
    }



    const classes = useStyles()
    return (
        <Grid>
            <Paper elevation={10} className={classes.paper}>
            <Grid align="center" className={classes.header} >
                
                <Avatar sx={{ bgcolor: pink[500] }}>
                    <LockIcon />
                </Avatar>
                <h3 className={classes.headerTxt}>Sign Up</h3>
                {showError ? (
                    <Grid container>
                    <Typography
                        align="left"
                        variant="caption"
                        style={{
                        color: "red",
                        fontSize: 16,
                        fontWeight: "bold",
                        paddingLeft: 40,
                        }}
                    >
                        {showError}
                    </Typography>
                    </Grid>
                ) : null}
            </Grid>
            <Stack direction={"column"} spacing={4}>
                <Grid container direction={"column"} spacing={1}>
                <Grid item>
                        <TextField 
                            error={errors.fullname}
                            id="fullname"
                            type="text" 
                            label="Fullname" 
                            variant="standard"
                            fullWidth
                            required
                            name="fullname" 
                            value={values.fullname}
                            onChange={handleChange}
                            className={classes.inputContainer}
                            helperText={errors.fullname}
                            onClick={resetError}
                        />
                    </Grid>
                    <Grid item>
                    <TextField 
                            error={errors.username}
                            id="username"
                            type="text" 
                            label="Username" 
                            variant="standard"
                            fullWidth
                            required
                            name="username" 
                            value={values.username}
                            onChange={handleChange}
                            className={classes.inputContainer}
                            helperText={errors.username}
                            onClick={resetError}
                        />
                    </Grid>
                    <Grid item>    
                        <TextField
                            error={errors.password}
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            fullWidth
                            required
                            name="password" 
                            value={values.password}
                            onChange={handleChange}
                            className={classes.inputContainer}
                            helperText={errors.password}
                            onClick={resetError}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Button 
                    className={classes.btnSignin}
                    variant="contained"
                    fullWidth
                    onClick={hanldeFormSubmit}
                    disabled={loading}
                    >
                        Sign up
                    </Button>
                    {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                        color: "green[500]",
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                        }}/>)}
                </Box>
                
            </Stack>
            <Typography align="center" sx={{ m: 2 }} className={classes.forgotpss}>
            <Link 
                href="/"
                underline="hover"
                >
                Already have account? Signin
                </Link>
            </Typography>
            </Paper>
        </Grid>
    )
}

Signup.propTypes = {

}

export default Signup;

