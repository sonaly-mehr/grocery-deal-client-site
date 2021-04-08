import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import OrderDetail from '../OrderDetail/OrderDetail';
import './Orders.css';

const Orders = () => {
    // const {productName} =useParams();
    const [orders, setOrders] = useState([]);
    const [loggedInUser, setLoggedInUser]= useContext(UserContext);

    useEffect(() => {
        fetch('https://sheltered-stream-59836.herokuapp.com/order?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setOrders(data))
    })
    return (
        <div className="order-summary">
            <h3>You have: {orders.length} Orders</h3>
            <div className="order-description">
                <div className="order-table-desc">
                    <h6>Email</h6>
                    <h6 className="orderDate">Checkout Date</h6>
                </div>
            </div>
            {
                orders.map(order => <OrderDetail order={order}></OrderDetail>)

            }
        </div>
        // <li>Email:{order.email} <br/> Check Out date: {(new Date(order.checkOut).toDateString('dd/MM/yyy'))} <br/> Product Name: {order.name}</li>
    );
};

export default Orders;