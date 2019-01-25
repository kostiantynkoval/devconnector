import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = createStyles({
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
});

const Footer = ({classes}: WithStyles) =>
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