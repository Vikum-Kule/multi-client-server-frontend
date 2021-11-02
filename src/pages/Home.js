import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, collapseClasses, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    title:{
        color:"#1976d2"
    },
    page:{
        backgroundColor:"#f9f9f9",
        width:"100%"
    },
    sideTxt:{
      color:"#1976d2"
    }

})


const drawerWidth = 240;

export default function Home({children}) {
    const classes = useStyles()

    const history = useHistory()

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const buttonSelect=(event,index,path)=>{
      history.push(path);
      setSelectedIndex(index)
    }

    const hndleLogout =(event)=>{
      localStorage.clear(); //for localStorage
      sessionStorage.clear(); 
      history.push("/");
    }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{backgroundColor:"#ffffff"}}
      >
        <Toolbar>
          <Grid container>
            <Grid item xs={11}>
              <Typography  className={classes.title} variant="h6" noWrap component="div">
                Home
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Button onClick={hndleLogout} variant="text">Logout</Button>
            </Grid>
          </Grid>
        </Toolbar>       
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {[
                {text:'Search User',path:"/home/searchpatient", index:0 },
                {text:'New user',path:"/home/newpatient",index:1},
            ].map((item, index) => (
              <ListItem button key={item}
              selected={item.index === selectedIndex? true: false}
                // onClick={()=> history.push(item.path)}
                onClick={(event) => buttonSelect(event, item.index,item.path)}
              >
                <ListItemText className={classes.sideTxt} primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box className={classes.page} component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}