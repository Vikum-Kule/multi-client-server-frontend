import { Alert, Button, Grid, Paper, TextField, Typography, CircularProgress, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import Validation from '../components/Validation';
import axios from 'axios';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    container:{
        marginTop:"50px",
        display:"flex"
    },
    paper:{
        display:"flex",
        padding:"20px"
    },
    btnContainer:{
        marginTop:"20px"
    }

})

function Newpatient() {
    const history = useHistory();

     useEffect(()=>{
        const isLogged = localStorage.getItem("userId");
        console.log(isLogged);
        if(isLogged==null){
            console.log("done");
            history.push("/");
        }else{
            console.log("not done");
        } 
    });

    const classes = useStyles()
    const [errors, setErrors]= useState({});

    const [values, setValues] = useState({
        p_name:"",
        phone:"",
        age:"",
        record:""

    });

    const [showError, setShowError] = useState("");
    const [showAlart, setAlart]= useState(false);
    const [showErrAlart, setErrAlart]= useState(false);
    const [loading, setLoading]= useState(false);

    const handleChange=(event)=>{
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }

    const hamdleSubmit=(event)=>{
        setErrors(Validation(values));
        if(values.p_name && values.age && values.phone && values.record){
            setLoading(true);
            addPatient();
            console.log(errors.phone)
        }
        

    }

    const errorReset=(event)=>{
        setErrors([])
    }

    const addPatient=()=>{
        axios.post("/app/newpatient/",{
            "name":values.p_name,
            "age":values.age,
            "phone":values.phone
        }).then(response=>{
            //dispatch({ type: Actions.RECEIVE_DATA, payload: response.data }) 
            
            console.log(response.data);
            const user = response.data.split('%');
            console.log(user[1]);
            addRecords(user[1]);

        }).catch(error=>{
            setLoading(false);
            console.log("error...", error);
            setErrAlart(true)
            if(error.response.status === 401 || error.response.status === 400 ){
                setShowError("Number is does not exist");
            }
            else{
                setShowError("Something went wrong...try again later");
            } 
            
        })
    }

    const addRecords =(p_id)=>{
        const d_id = localStorage.getItem("userId"); 
        console.log(d_id);

        axios.post("/app/newrecord/",{
            "patient_id":p_id ,
            "record":values.record,
            "date":"",
            "d_id":d_id
        }).then(response=>{
            setLoading(false);
            console.log(response.data);
            setAlart(true);
            resetInputs();

        }).catch(error=>{
            setLoading(false);
            setErrAlart(true)
            console.log("error...", error);
            // if(error.response.status === 401 || error.response.status === 400 ){
            //     setShowError("Number is does not exist");
            // }
            // else{
            //     setShowError("Something went wrong...try again later");
            // } 
            
        })
    }

    const resetInputs =()=>{
        console.log("reset");
        values.p_name="";
        values.phone="";
        values.age="";
        values.record="";
    }




    return (
        <div>
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Paper elevation={3} className={classes.paper}>
                    <Grid container spacing={2.5}>
                        <Grid item xs={8}>
                            <TextField 
                                type="text"
                                id="p_name" 
                                label="Name" 
                                variant="outlined"
                                fullWidth
                                name="p_name"
                                value={values.p_name}
                                onChange={handleChange}
                                error={errors.p_name}
                                helperText={errors.p_name}
                                onClick={errorReset}
                            /> 
                        </Grid>
                        <Grid item xs={7}>
                            <TextField 
                                type="number"
                                id="p_age" 
                                label="Age" 
                                variant="outlined"
                                name="age"
                                value={values.age}
                                onChange={handleChange}
                                error={errors.age}
                                helperText={errors.age}
                                onClick={errorReset}
                            /> 
                        </Grid>
                        <Grid item xs={7}>
                            <TextField 
                                type="text"
                                id="p_number" 
                                label="Phone" 
                                variant="outlined"
                                fullWidth
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                error={errors.phone}
                                helperText={errors.phone}
                                onClick={errorReset}
                            /> 
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                    id="outlined-multiline-static"
                                    label="Record"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    name="record"
                                    value={values.record}
                                    onChange={handleChange}
                                    error={errors.record}
                                    helperText={errors.record}
                                    onClick={errorReset}
                            />
                        </Grid>
                        {showAlart?
                            <Grid item xs={8}>
                            <Alert onClose={() => {setAlart(false)}}>Patient successfully added!</Alert>
                            </Grid>: null
                        }
                        {showErrAlart?
                            <Grid item xs={8}>
                            <Alert onClose={() => {setErrAlart(false)}} severity="error">Something went wrong..Try again later!</Alert>
                            </Grid>: null
                        }
                        <Grid item xs={6}>
                            <Button onClick={resetInputs} variant="outlined">reset</Button>
                        </Grid>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Grid item xs={6} className={classes.btnContainer}>
                                <Button 
                                disabled={loading}
                                onClick={hamdleSubmit} variant="contained">Submit</Button>
                            </Grid>
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
                    </Grid>
                </Paper>
            </Grid>
            
        </Grid> 
        </div>
    )
}

export default Newpatient
