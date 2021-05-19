import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.Config';
import { Button, Link, TextField } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import { UserContext } from '../../App';
import { useHistory } from 'react-router';

const Form = () => {

  
  const [user, setUser] = useContext(UserContext);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const [newUserInfo, setNewUserInfo] = useState(true);

  

    const handleBlur = (e) => {
        // console.log(e.target.name, e.target.value);
      let isValid = true;
        if (e.target.name === 'email')
        {
            const isValid = /\S+@\S+\.\S+/.test(e.target.value);
            // console.log(isEmailValid);
        }

        if (e.target.name === 'password')
        {
            const isPassLengthValid = e.target.value.length >= 6;
            const isPasswordValid = /\d{1}/.test(e.target.value);
            const isValid = isPassLengthValid && isPasswordValid;
            // console.log(isPassLengthValid && isPasswordValid);
      }
      
      if (isValid)
      {
        const newUser = {...user};
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
      }
    }

    const handleSubmit = (e) =>  {
      
      console.log("submit successfully");
      e.preventDefault();

      if (newUserInfo && user.email && user.password)
      {
          firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((res) => {
              // console.log(res)
              const newUser = {...user};
              newUser.errorMessage = '';
              newUser.success = true;
              setUser(newUser);
            })
            .catch((error) => {
              // console.log(error.message);
              const newUser = {...user};
              newUser.errorMessage = error.message;
              newUser.success = false;
              setUser(newUser);
            });
      }
      if (!newUserInfo && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            const newUser = { ...user };
            newUser.errorMessage = "";
            newUser.success = true;
            setUser(newUser);
          })
          .catch((error) => {
            const newUser = { ...user };
            newUser.errorMessage = error.message;
            newUser.success = false;
            setUser(newUser);
          });
      }
  }
  
  return (
    <div>
      {newUserInfo && (
        <div
          style={{
            backgroundColor: "lightBlue",
            padding: "14px",
            margin: "auto",
            width: "400px",
            borderRadius: "10px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Sign Up</h2>
          <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <TextField
              name="name"
              label="Name"
              type="text"
              autoComplete="current-password"
              variant="filled"
              onBlur={handleBlur}
              required
            />
            <br />
            <br />
            <TextField
              name="email"
              label="Email"
              type="text"
              autoComplete="current-password"
              variant="filled"
              onBlur={handleBlur}
              required
            />
            <br />
            <br />
            <TextField
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
              onBlur={handleBlur}
              required
            />
            <br />
            <br />
            <Button
              style={{ textTransform: "capitalize" }}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Sign Up
            </Button>
            <br />
            <br />
            <Button
              onClick={() => setNewUserInfo(!newUserInfo)}
              variant="outlined"
              color="secondary"
            >
              Have you account? Sign In
            </Button>
            {user.errorMessage ? (
              <Alert severity="error">{user.errorMessage}</Alert>
            ) : (
              " "
            )}
            {user.success && (
              <Alert severity="success">User sign up successfully!</Alert>
            )}
          </form>
        </div>
      )}

      {
        // Sign In Section.
      }
      {!newUserInfo && (
        <div
          style={{
            backgroundColor: "lightBlue",
            padding: "14px",
            margin: "auto",
            width: "400px",
            borderRadius: "10px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1 style={{ textAlign: "center" }}>sign In</h1>
          <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <TextField
              name="email"
              label="Email"
              type="text"
              autoComplete="current-password"
              variant="filled"
              onBlur={handleBlur}
              required
            />
            <br />
            <br />
            <TextField
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
              onBlur={handleBlur}
              required
            />
            <br />
            <br />
            <Button
              type="submit"
              style={{ textTransform: "capitalize" }}
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <br />
            {user.errorMessage ? (
              <Alert severity="error">{user.errorMessage}</Alert>
            ) : (
              " "
            )}
            {user.success && (
              <Alert severity="success">User sign in successfully!</Alert>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;