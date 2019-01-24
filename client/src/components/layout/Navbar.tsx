import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        //flexGrow: 1,
    },
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
};

type Styles = {
    root: any,
    grow: any,
    menuItem: any,
    title: any,
    button: any
}

interface NavbarProps { classes: Styles }

class Navbar extends Component<RouteComponentProps & NavbarProps, {}> {

    pushTo = (to: string) => {
        const { history, location } = this.props;
        if(location.pathname === to) return;
        history.push(to);
    }

    render() {
        console.log(this.props);
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography onClick={() => this.pushTo("/")} variant="h5" color="inherit" className={classes.title}>
                            News1
                        </Typography>
                        <Button color="inherit" className={classes.menuItem}>Menu1</Button>
                        <Button color="inherit" className={classes.menuItem}>Menu2</Button>
                        <div className={classes.grow}/>
                        <Button onClick={() => this.pushTo("/register")} color="inherit" className={classes.button}>Register</Button>
                        <Button onClick={() => this.pushTo("/login")} color="inherit" className={classes.button}>Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

// function mapStateToProps(state: any) {
//     return state;
// }
//
// export default connect(
//     mapStateToProps,
// )(Navbar);
export default withStyles(styles)(withRouter(Navbar));

