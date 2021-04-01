import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddProduct from '../AddProduct/AddProduct';
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Manage from '../Manage/Manage';

const Admin = () => {
  return (

    <div className="admin-section">

      <div className="container">
          <div className="admin-panel">

              <Router>
                <div className="admin-menu">
                  <nav>
                    <ul>
                      <li>
                        <FontAwesomeIcon className="menu-icon" icon={faBox}></FontAwesomeIcon> <Link to="/manage">Manage Product</Link>
                      </li>
                      <li>
                        <FontAwesomeIcon className="menu-icon" icon={faPlus}></FontAwesomeIcon> <Link to="/add">Add Product</Link>
                      </li>
                      <li>
                        <FontAwesomeIcon className="menu-icon" icon={faPencilAlt}></FontAwesomeIcon> <Link to="/edit">Edit Product</Link>
                      </li>
                    </ul>
                  </nav>

                  <Switch>
                    <Route path="/add">
                      <AddProduct></AddProduct>
                    </Route>

                    <Route path="/manage">
                      <Manage></Manage>
                    </Route>

                    <Route path="/edit">
                      <AddProduct></AddProduct>
                    </Route>

                    <Route path="/">
                      <AddProduct></AddProduct>
                    </Route>

                  </Switch>
                </div>
              </Router>
            </div>
          </div>
            
       </div>
      

  );
};

export default Admin;