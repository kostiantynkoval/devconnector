import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = createStyles({
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
});

class Navbar extends Component<RouteComponentProps & WithStyles, {}> {

    pushTo = (to: string) => {
        const { history, location } = this.props;
        if(location.pathname === to) return;
        history.push(to);
    }

    render() {;
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography onClick={() => this.pushTo("/")} variant="h5" color="inherit" className={classes.title}>
                            DevConnector
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

