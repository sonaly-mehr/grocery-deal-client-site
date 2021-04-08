import React from 'react';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';
firebase.initializeApp(firebaseConfig);


const Login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    const [newUser, setnewUser] = useState(false);
    const [user, setUser] = useState({
        // isSignedIn: false,
        name: '',
        email: ''
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleSingIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const SingedIn = {
                    // isSignedIn: true,
                    // name: displayName,
                    email: email
                    // photo: photoURL
                }
                setUser(SingedIn);
                setLoggedInUser(SingedIn);
                history.replace(from);
                // console.log(displayName, photoURL, email);
            })
    }

    // const handleSingOut=()=>{
    //   firebase.auth().signOut()
    //   .then(res =>{
    //     const singOutUser = {
    //       isSignedIn: false,
    //       name: '',
    //       email: '',
    //       photo:''
    //     }
    //     setUser(singOutUser);
    //   })

    // }

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {

            const isPasswordValid = e.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && isPasswordHasNumber;
            // console.log(isFormValid);
        }
        if (isFormValid) {
            let newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);

        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

                .then(res => {
                    const newUserInfo = { ...user };
                    setUser(newUserInfo);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    updateUserName(user.name);

                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    // newUserInfo.error = '';
                    // newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log('sing in user info', res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    // console.log('sing in user info', res.user);

                });
        }
        e.preventDefault();
    }
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log("user name updated successfully");
        }).catch(function (error) {
            console.log(error);
        });

    }


    return (

        <div>

            <div className="login-info">
                <div className="login-details">

                    {
                        user.isSignedIn && <p>Welcome {user.name}</p>
                    }
                    <form action="">
                        {!newUser ? <h5>Login</h5> : <h5>Create Account</h5>}
                        {
                            newUser && <input className="nameField" type="name" name="name" onBlur={handleBlur} placeholder="Enter Your Name" required />
                        }
                        <input type="email" name="email" onBlur={handleBlur} placeholder="Enter Your Email" required /><br />
                        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" required /><br />
                        {/* {
              newUser && <input className="nameField" type="password" name="ConfirmPassword" onBlur={handleBlur} placeholder="Confirm Password" required />
            } */}

                        {!newUser && <div><input type="checkbox" /><label htmlFor="">Remember Me</label> <a className="pass-retrieve" href="#">Forgot Password?</a></div>}
                        <input onClick={handleSubmit} type="submit" value={newUser ? 'Create a New Account' : 'Log In'} />
                        {!newUser ?
                            <p>Don't Have an account? <a onClick={() => setnewUser(!newUser)} href="#">Create an account</a></p>
                            : <p>Already Have an account? <a onClick={() => setnewUser(!newUser)} href="#">Login</a></p>
                        }

                    </form>
                </div>
                <div className="or-sec">
                    <p>Or</p>
                </div>
                <button className="login-btn" onClick={handleSingIn}><FontAwesomeIcon className="icon" icon={faGoogle}></FontAwesomeIcon>Continue with google</button>
                {
                    user.success && <p style={{ color: 'green', textAlign: 'center' }}>User {newUser ? 'Created' : 'Logged In'} Successfully!</p>
                }
            </div>
        </div>
    );
};

export default Login;