import React from 'react';
import './Product.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
const Product = ({ product }) => {
    const history = useHistory()
    const handleProduct=(id)=>{
       history.push(`/products/${id}`);
    }
    return (
        
        <div>
            <div className="col-md-4 col-12">
                <div className="single-product-info">
                    <img src={product.imageURL} alt="" />
                    <div className="product-name-weight">
                    <h6><span>{product.name}-</span> <span>{product.weight}</span></h6>
                    </div><br/>
                    <div className="product-price-btn">
                    <span>${product.price}</span>
                    <button onClick={()=>handleProduct(product._id)} className="search-btn">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;