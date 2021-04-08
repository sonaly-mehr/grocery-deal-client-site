import React, { useEffect, useState } from 'react';
import ManageProduct from '../ManageProduct/ManageProduct';
import { CircularProgress } from '@material-ui/core';
import './Manage.css';
const Manage = () => {
    const [manageProducts, setManageProducts] = useState([]);

    useEffect(() => {
        fetch('https://sheltered-stream-59836.herokuapp.com/manage')
            .then(res => res.json())
            .then(data => setManageProducts(data))
    }, [])
    return (
        <div className="manage-product-wrap">
            <h4>Manage Product</h4>
            <div className="manage-product-table">
                <span>Product Name</span> <span>Weight</span>
                <span>Price</span> <span>Action</span>
            </div>
            {
                manageProducts.length === 0 && <h2 className="spinner"><CircularProgress /></h2>
            }
            {
                manageProducts.map(pd => <ManageProduct pd={pd}></ManageProduct>)
            }
        </div>
    );
};

export default Manage;