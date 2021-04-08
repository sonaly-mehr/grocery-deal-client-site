import React from 'react';
import './ManageProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/fontawesome-free-regular'

const ManageProduct = ({ pd }) => {
    const deleteProduct = (id) => {
        fetch(`https://sheltered-stream-59836.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                console.log('deleted successfully')
            })
    }
    return (
        <div className="manage-product">
            <h6>{pd.name}</h6>
            <h6 className="weight">{pd.weight}</h6>
            <h6 className="price">${pd.price}</h6>
            <button onClick={()=> deleteProduct(pd._id)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
        </div>
    );
};

export default ManageProduct;