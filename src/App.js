import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Typography} from '@mui/material';
import './App.css';
import Create from './pages/Create'; 
import Note from './pages/Note';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/private-theming';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import Newpatient from './pages/Newpatient';
import { Search } from '@mui/icons-material';
import SearchPatient from './pages/SearchPatient';

const theme = createTheme({

})


function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/note">
          <Note/>
        </Route>
        <Route path="/home">
          <Home>
            <Switch>
                <Route path="/home/newpatient">
                  <Newpatient/>
                </Route>
                <Route path="/home/searchpatient">
                  <SearchPatient/>
                </Route>
            </Switch>
          </Home>
          </Route>
      </Switch>
    </Router>
    </ThemeProvider>  
  );
}

export default App;
