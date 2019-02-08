import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import {LOGOUT} from "../../store/actionTypes";

const styles = createStyles({
    grow: {
        flexGrow: 1,
    },
    menuItem: {
        marginRight: 20,
        fontWeight: 400
    },
    title: {
        marginRight: 20,
        cursor: 'pointer'
    },
    button: {
        marginLeft: 8
    }
});

class Navbar extends Component<RouteComponentProps & WithStyles & DispatchProps & StateProps, {}> {

    pushTo = (to: string) => {
        const { history } = this.props;
        if(history.location.pathname === to) return;
        history.push(to);
    }

    logout = () => {
        localStorage.removeItem('token');
        this.props.logout(this.props.history);
    }

    render() {
        const {classes, isAuthenticated, user} = this.props;
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography onClick={() => this.pushTo("/")} variant="h5" color="inherit" className={classes.title}>
                        DevConnector
                    </Typography>

                    {
                        isAuthenticated && (
                            <Fragment>
                                <Button onClick={() => this.pushTo("/")} color="inherit" className={classes.menuItem}>Home</Button>
                                <Button onClick={() => this.pushTo("/dashboard")} color="inherit" className={classes.menuItem}>Dashboard</Button>
                            </Fragment>
                        )
                    }

                    <div className={classes.grow}/>

                    {isAuthenticated ? (
                        <Fragment>
                            <Tooltip title="You should have gravatar account connected to your email to see the image">
                                <Avatar alt={user.name} src={user.avatar} />
                            </Tooltip>
                            <Button onClick={this.logout} color="inherit" className={classes.button}>Logout</Button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button onClick={() => this.pushTo("/register")} color="inherit" className={classes.button}>Register</Button>
                            <Button onClick={() => this.pushTo("/login")} color="inherit" className={classes.button}>Login</Button>
                        </Fragment>
                    )}

                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

const dispatchStateToProps = (dispatch: any): DispatchProps => ({
    logout: (history: any) => dispatch({type: LOGOUT})
})

interface DispatchProps {
    logout: (history: any) => void
}

interface StateProps {
    isAuthenticated: boolean,
    user: any //TODO Make user interface
}

export default connect(
    mapStateToProps,
    dispatchStateToProps
)(withStyles(styles)(withRouter(Navbar)));


