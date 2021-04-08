import React from 'react';
import './OrderDetails.css';

const OrderDetail = (props) => {
    const { email, checkOut, name } = props.order;
    return (
        <div className="manage-orders">
                <div className="order-product-desc">
                    <h5>{email}</h5>
                    <h5 className="date">{(new Date(checkOut).toDateString('dd/MM/yyy'))}</h5>
                </div>
                {/* <div className="total">
                    <h4>Total</h4>
                    <h4>${productKey.price}</h4>
                </div> */}
            </div>
    );
};

export default OrderDetail;