import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Checkout.css';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { UserContext } from '../../App';
import Orders from '../Orders/Orders';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";

const Checkout = () => {
    const { productId } = useParams();
    const [productKey, setProductKey] = useState([]);
    const [loggedInUser, setLoggedInUser]= useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        checkOut: new Date(),
    });

    useEffect(() => {
        fetch(`https://sheltered-stream-59836.herokuapp.com/product/${productId}`)
            .then(res => res.json())
            .then(data => setProductKey(data))
    }, [productId])

    const [productInfo, setProductInfo] =useState({
        name : productKey.name,
        price: productKey.price
    })
 

    const handleDateChange = (date) => {
        const newDates = {...selectedDate}
        newDates.checkOut= date;
        setSelectedDate(newDates);
    };
    const handleCheckOut= ()=>{
        const newCheckOut= {...loggedInUser, ...selectedDate, ...productInfo};
        fetch('https://sheltered-stream-59836.herokuapp.com/addCheckout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCheckOut)
        })
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
        })
    }

    return (

        <div className="checkOut-info">
            <h2>Checkout</h2>
            <div className="description">
                <div className="table-desc">
                    <h6>Description</h6>
                    <h6>Quantity</h6>
                    <h6>Price</h6>
                </div>
                
                <div className="product-desc">
                    <h5>{productKey.name}</h5>
                    <h5>1</h5>
                    <h5>${productKey.price}</h5>
                </div>
                <div className="total">
                    <h4>Total</h4>
                    <h4>${productKey.price}</h4>
                </div>
               

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Check Out Date"
                            value={selectedDate.checkOut}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    
                    </Grid>
                </MuiPickersUtilsProvider>

            </div>
            <div className="checkout">
               <button onClick={handleCheckOut}><Link to="/orders">Checkout</Link></button>
            </div>
        </div>
    );
};

export default Checkout;