import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme';
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
//pages
import HomePage from './pages/HomePage'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PostCreation from './pages/PostCreation';
import UserPage from './pages/UserPage';
//components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute'
import ProtectedRoute from './util/ProtectedRoute';
import axios from 'axios';

const theme = createTheme(themeFile);

axios.defaults.baseURL = 'https://europe-west1-test-forum-995a7.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store} >
        <Router>
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <AuthRoute path="/signup" component={SignUp}/>
              <AuthRoute path="/login" component={Login}/>
              <ProtectedRoute exact path="/createPost" component={PostCreation}/>
              <Route exact path="/users/:userHandle" component={UserPage} />
              <Route exact path="/users/:userHandle/post/:postId" component={UserPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
