import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack, TextField, Tooltip, Typography, Alert } from '@mui/material'
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { width } from '@mui/system';
import Validation from '../components/Validation';
import axios from 'axios';
import NoteIcon from '@mui/icons-material/Note';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
const useStyles = makeStyles({
    container:{
        display:"flex",
        backgroundColor:"#ffffff",
        marginTop:"60px",
        padding:"20px"
    },
    paper:{
        display:"flex",
        color:"#ffffff"
    },
    itemContainer:{
        marginBottom:"10px"
    },
    recordContainer:{
        display:"flex",
        height:"500px",
        backgroundColor:"blue",
        padding:"20px" 
    },
    recordStack:{
        width:"100%"
    },
    itemRecord:{
        marginBottom:"10px",
        margin:"10px"
    },
    dialog:{
        width:"500px"
    }


})

function SearchPatient() {
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

    const [selectedIndex, setSelectedIndex] = React.useState(0);


    const handleListItemClick = (event, item) => {
        // console.log(id);
        setSelectedIndex(item.id);
        getRecords(item.id);
        setPatient(item);
        

    };

    const [values, setValues] = useState({
        phone:"",
        record:"",
    });

    // const [p_name, setPname]= useState("");
    // const [p_age, setPage]= useState(null);
    const [patient, setPatient]= useState(null);
    const [showError, setShowError] = useState("");
    const [errors, setErrors]= useState({});
    const resetError = (event)=>{
        setErrors({});
        setShowError("");
    }
    const [patients, setPatients] = useState([]);
    const [records, setRecords] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [showErrAlart, setErrAlart]= useState(false);

  const handleClickOpen = () => {
    setErrors([]);
    setOpen(true);
  };

  const handleClose = () => {
    values.record="";
    setOpen(false);
  };

    const handleChange=(event)=>{
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }

    const hanldeSearchNum = async(event)=>{
        setShowError("");
        event.preventDefault();
        setPatients([]);
        setErrors(Validation(values));
        if(values.phone){
            handSearch(values.phone);
        }
        
        
    }



    const handSearch = (phone)=>{
        axios.post("/app/search/",{
            "phone": phone,
        }).then(response=>{
            //dispatch({ type: Actions.RECEIVE_DATA, payload: response.data }) 
            console.log(response.data);
            setPatients(response.data);
        }).catch(error=>{
            console.log("error...", error);
            if(error.response.status === 401 || error.response.status === 400 ){
                setShowError("Number is does not exist");
            }
            else{
                setShowError("Something went wrong...try again later");
            } 
            
        })
    }

    const getRecords = (id)=>{
        axios.get("/app/records/?id="+id).then(response=>{
            //dispatch({ type: Actions.RECEIVE_DATA, payload: response.data }) 
            console.log(response.data);
            setRecords(response.data);
        }).catch(error=>{
            console.log("error...", error);
            // if(error.response.status === 401 || error.response.status === 400 ){
            //     setShowError("Number is does not exist");
            // }
            // else{
            //     setShowError("Something went wrong...try again later");
            // } 
            
        })
    }

    const addRecords =(event)=>{
        const d_id = localStorage.getItem("userId"); 
        console.log(d_id);

        axios.post("/app/newrecord/",{
            "patient_id": patient.id,
            "record":values.record,
            "date":"",
            "d_id":d_id
        }).then(response=>{
            console.log(response.data);
            getRecords(patient.id);
            handleClose();
        }).catch(error=>{
            setErrAlart(true);
            console.log("error...", error);
            // if(error.response.status === 401 || error.response.status === 400 ){
            //     setShowError("Number is does not exist");
            // }
            // else{
            //     setShowError("Something went wrong...try again later");
            // } 
            
        })
    }

    


    return (
        <div className={classes.container}>
        
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Record</DialogTitle>
                <DialogContent className={classes.dialog}>
                {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText> */}
                <TextField
                    autoFocus
                    margin="dense"
                    id="record"
                    label="Record"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.record}
                    name="record"
                    onChange={handleChange}
                    helperText={errors.record}
                    error={errors.record}
                />
                {showErrAlart?
                            <Grid item xs={12}>
                            <Alert onClose={() => {setErrAlart(false)}} severity="error">Something went wrong..Try again later!</Alert>
                            </Grid>: null
                }

                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addRecords}>Add</Button>
                </DialogActions>
            </Dialog>
    </div>
            <Grid container className={classes.paper} spacing={5} >
                <Grid item xs={12}>
                <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search patient"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    name="phone" 
                    value={values.phone}
                    onChange={handleChange}
                    helperText={errors.phone}
                    onClick={resetError}
                />
                <IconButton 
                    type="submit" 
                    sx={{ p: '10px' }} 
                    aria-label="search"
                    onClick={hanldeSearchNum}
                >
                    <SearchIcon />
                </IconButton>
                </Paper>
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
                {errors.phone ? (
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
                        {errors.phone}
                    </Typography>
                    </Grid>
                ) : null}
                </Grid>
                <Grid item xs={4} ms={6}>
                    {patients?
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {patients.map(item=>(
                            <Paper className={classes.itemContainer}>
                                <ListItemButton 
                                alignItems="flex-start" 
                                key={item.id}
                                selected={item.id === selectedIndex? true: false}
                                onClick={(event) => handleListItemClick(event, item)}
                                >
                                <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon/>
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                primary={item.name}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Age
                                    </Typography>
                                    {item.year}
                                    </React.Fragment>
                                }
                                />
                            </ListItemButton>
                        </Paper>
                        ))}
                        
                        <Divider variant="inset" component="li" />
                    </List>:null
                }
                    
                </Grid>
                <Grid item xs={8} ms={6}>
                    <Paper className={classes.recordContainer} elevation={3} >
                        <Stack className={classes.recordStack}>
                        {patient?
                            <item>
                            <Grid container>
                                <Grid xs={11}>
                                    <Typography>Name: {patient.name}</Typography>
                                    <Typography>Age: {patient.year}</Typography>
                                </Grid>
                                <Grid xs={1}>
                                    <Tooltip title="Add record">
                                    <IconButton 
                                        aria-label="add" 
                                        size="large"
                                        onClick={handleClickOpen}
                                    >
                                        <NoteAddIcon fontSize="inherit" />
                                    </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            </item>:<h3>Select a patient</h3>
                        }
                        
                        
                        {records?
                        <List sx={{ width: '100%',overflow: 'auto', bgcolor: 'background.paper' }}>
                        {records.map(item=>(
                            <Paper className={classes.itemRecord} elevation={12}>
                                <ListItemButton 
                                alignItems="flex-start" 
                                key={item}
                                >
                                <ListItemAvatar>
                                <Avatar>
                                    <NoteIcon/>
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                primary={item.date}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {item.d_name}
                                    </Typography>
                                    <p>{item.record}</p>
                                    </React.Fragment>
                                }
                                />
                            </ListItemButton>
                        </Paper>
                        ))}
                        
                        <Divider variant="inset" component="li" />
                    </List>:null
                }
                        </Stack>

                    </Paper>
                </Grid>
            </Grid> 
        </div>
    )
}

export default SearchPatient
