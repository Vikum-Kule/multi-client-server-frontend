import React ,{useState}from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Avatar, TextField, Button, Stack, Typography, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LockIcon from '@mui/icons-material/Lock';
import { pink } from '@mui/material/colors';
import Validation from './Validation';
import {userLogin} from '../services/Auth';
import axios from 'axios';
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

function Login(props) {
    const history = useHistory();
    const handleLogin = (username, password)=>{
        axios.post("/app/login/",{
            "username": username,
            "password":password
        }).then(response=>{
            console.log("Response..:", response);
            const user = response.data.split('/');
            console.log(user[1]);
            localStorage.setItem('userId', user[1]);
            history.push("/home/searchpatient");
            
        }).catch(error=>{
            console.log("error...", error);
            
            if(error.response.status === 401 || error.response.status === 400 ){
                setShowError("Invalid Credentials");
            }
            else{
                setShowError("Something went wrong...try again later");
            }
            
        })
    }


    const [showError, setShowError] = useState("");

    const [values, setValues] = useState({
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

    const hanldeFormSubmit = async(event)=>{
        setShowError("");
        event.preventDefault();
        setErrors(Validation(values));
        
        console.log(errors);
        if(values.password && values.username){ 
            
            handleLogin(values.username,values.password);    
        }
    }

    const resetError = (event)=>{
        setErrors({});
        setShowError("");
    }



    const classes = useStyles()
    return (
        <Grid>
            <Paper elevation={10} className={classes.paper}>
            <Grid align="center" className={classes.header} >
                
                <Avatar sx={{ bgcolor: pink[500] }}>
                    <LockIcon />
                </Avatar>
                <h3 className={classes.headerTxt}>Sign in</h3>
                {showError ? (
                    <Grid >
                    <Typography
                        align="center"
                        variant="caption"
                        style={{
                        color: "red",
                        fontSize: 12,
                        fontWeight: "bold",
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
                <Button 
                className={classes.btnSignin}
                variant="contained"
                fullWidth
                onClick={hanldeFormSubmit}
                >
                    Sign in
                </Button>
                
            </Stack>
            <Typography align="center" sx={{ m: 2 }} className={classes.forgotpss}>
                <Link 
                href="/signup"
                underline="hover"
                >
                Dont you have account? Signup
                </Link>
            </Typography>
            </Paper>
        </Grid>
    )
}

Login.propTypes = {

}

export default Login;

