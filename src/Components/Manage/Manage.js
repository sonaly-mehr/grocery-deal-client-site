import React, { useEffect, useState } from 'react';
import ManageProduct from '../ManageProduct/ManageProduct';
import './Manage.css';
const Manage = () => {
    const [manageProducts, setManageProducts]= useState([]);

    useEffect(()=>{
            fetch('http://localhost:5055/manage')
            .then(res=> res.json())
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
                manageProducts.map(pd=> <ManageProduct pd={pd}></ManageProduct>)
            }
        </div>
    );
};

export default Manage;