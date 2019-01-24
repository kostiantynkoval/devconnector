import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        display: 'flex',
        flexFlow: 'column nowrap'
    },
    grow: {
        flexGrow: 1
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'center'
    }
};

type Styles = {
    grow: any,
    root: any,
    toolbar: any
}


interface NavbarProps { classes: Styles }

const Footer = ({classes}: Pick<NavbarProps, 'classes'>) =>
(
    <div className={classes.root}>
        <div className={classes.grow}/>
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="body2" color="inherit">
                    Copyright&copy; {new Date().getFullYear()} DevConnector
                </Typography>
            </Toolbar>
        </AppBar>
    </div>
);

// function mapStateToProps(state: any) {
//     return state;
// }
//
// export default connect(
//     mapStateToProps,
// )(Footer);
export default withStyles(styles)(Footer);