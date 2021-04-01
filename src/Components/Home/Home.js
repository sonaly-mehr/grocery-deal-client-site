import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Product from '../Product/Product';
import './Home.css';



const Home = () => {
    const [products, setProducts]= useState([]);

    useEffect(()=> {
        fetch('http://localhost:5055/home')
        .then(res=> res.json())
        .then(data => setProducts(data))
    }, [])
    return (
        <div className="home-section">
            <div className="row">
                {
                    products.length=== 0 && <h2 className="spinner"><CircularProgress/></h2>
                }
               {
                   products.map(product => <Product product={product}></Product>)
               }
            </div>
        </div>
    );
};

export default Home;