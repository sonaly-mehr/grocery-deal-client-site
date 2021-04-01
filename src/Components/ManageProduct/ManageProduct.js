import React from 'react';
import './ManageProduct.css';

const ManageProduct = ({ pd }) => {
    return (
        <div className="manage-product">

            <h6>{pd.name}</h6>
            <h6 className="weight">{pd.weight}</h6>
            <span>${pd.price}</span>
            <button>Delete</button>
        </div>
    );
};

export default ManageProduct;