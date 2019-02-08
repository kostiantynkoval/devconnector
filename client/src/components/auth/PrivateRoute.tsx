import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    return (
        <Route
            {...rest}
            render={(props: any) =>
                rest.isAuthenticated ? (
                    <Component {...rest} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.history.location.pathname }
                        }}
                    />
                )
            }
        />
    );
};

export default connect(
    (state: any) => ({isAuthenticated: state.auth.isAuthenticated})
)(PrivateRoute);

