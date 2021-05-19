import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const Home = () => {

    const history = useHistory();

    const handleSign = () => {
        history.push('/sign');
    }

    const CardStyle = {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    };

    return (
        <div style={CardStyle}>
            <h2>Please Sign Up!</h2>
            <Button style={{fontSize: "20px"}} onClick={handleSign} variant="contained" color="secondary">Create Your Account</Button>
        </div>
    );
};

export default Home;