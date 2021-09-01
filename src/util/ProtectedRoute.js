import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ component: Component, ...rest }) {
    const { authenticated } = useSelector((state) => state.user);

    return(
       <Route 
        {...rest}
        render={(props) => 
            authenticated === false ? <Redirect to="/" /> : <Component {...props} />
        }
        /> 
    )
  
};