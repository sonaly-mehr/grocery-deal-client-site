import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Home from './Components/Home/Home';
import Orders from './Components/Orders/Orders';
import Admin from './Components/Admin/Admin'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound';
import { createContext, useState } from 'react';
import userEvent from '@testing-library/user-event';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Checkout from './Components/Checkout/Checkout';
export const UserContext= createContext();

function App(){
  const [loggedInUser, setLoggedInUser]= useState(false);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    

  <div className="home-section">
    <div className="container">
    <div className="header-section">
      {/* <div className="row">
        <div className="col-md-4"> */}
          <div className="header-name">
            <h4><span>Grocery</span> Deal</h4>
          </div>
        </div>

        {/* <div className="col-md-8"> */}
          <div className="menu">
            <Router>
              
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/admin">Admin</Link>
                  </li>
                  <li>
                    <Link to="/home">Detail</Link>
                  </li>
                  {!loggedInUser ?
                  <li>
                  <Link className="login" to="/login">Login</Link>
                </li>
                  :
                  <li ><Link to="/login" style={{color: 'green'}}>{loggedInUser.email}</Link></li>
                  
                  
                  
                 }
                </ul>
              </nav>



              <Switch>
                <Route path="/home">
                  <Home></Home>
                </Route>

                <Route exact path="/">
                  <Home></Home>
                </Route>

                <PrivateRoute path="/admin">
                  <Admin></Admin>
                </PrivateRoute>

                <PrivateRoute path="/orders">
                   <Orders></Orders>
                </PrivateRoute>

                <Route path="/login">
                  <Login></Login>
                </Route>

                <PrivateRoute path="/products/:productId">
                   <Checkout></Checkout>
                </PrivateRoute>

                <PrivateRoute path="/orders">
                   <Orders></Orders>
                </PrivateRoute>

                <Route path="*">
                  <NotFound></NotFound>
                </Route>

              </Switch>


            </Router>
          </div>
        </div>
        {/* </div> */}
      {/* </div> */}

    {/* </div> */}
  </div>
  </UserContext.Provider>


  );
}

export default App;
 


