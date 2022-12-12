import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ loggedIn, children, ...props }) {
    return (
    <Route {...props}>
        {loggedIn === false ? <Redirect to="/" /> : children }
    </Route>
    )
}

export default ProtectedRoute;
