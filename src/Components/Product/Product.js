import React from 'react';
import './Product.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
const Product = ({ product }) => {
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
                    <button>Buy now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;