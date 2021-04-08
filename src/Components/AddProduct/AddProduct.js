import React from 'react';
import './AddProduct.css';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddProduct = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL]= useState(null);
    const history= useHistory()
    
    const onSubmit = data => {
        const groceryData={
            name: data.name,
            weight: data.weight,
            price: data.price,
            imageURL: imageURL
        };
        const url= `http://localhost:5055/admin`;


        fetch(url, {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(groceryData)
        })
        .then(res=> console.log('server side respond'))
        history.push('/admin');
    };

    const handleImageUpload= event =>{
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '4462fa6ba6fbb9a9cf1312d84fa93c55');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', 
        imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    return (
        <div className="add-product-wrap">
            <h4>Add Product</h4>

            <div className="add-product-form">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-box">
                        <div className="single-input">
                            <label htmlFor="">Product Name</label><br />
                            <input type="text" placeholder="Enter Name" name="name" ref={register} />
                        </div>
                        <div className="single-input">
                            <label htmlFor=""> Weight</label><br />
                            <input type="text" placeholder="Enter Name" name="weight" ref={register} />
                        </div>
                    </div>

                    <div className="input-box">
                        <div className="single-input">
                            <label htmlFor="">Add Price</label><br />
                            <input type="text" placeholder="Enter Price" name="price" ref={register} />
                        </div>
                        <div className="single-input">
                            <label htmlFor=""> Add Photo</label><br />
                            <input type="file" id="img" name="img" accept="image/*" onChange={handleImageUpload}/>
                        </div>
                    </div>

                    <div className="submit">
                        <input type="submit" value="Save"/>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default AddProduct;