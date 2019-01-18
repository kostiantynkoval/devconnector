import React, {Component} from 'react';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        flexGrow: 1,
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
    }
};

type Styles = {
    root: any,
    grow: any,
    menuItem: any,
    title: any
}

interface NavbarProps { classes: Styles }


class Navbar extends Component<NavbarProps, {}> {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" color="inherit" className={classes.title}>
                            News1
                        </Typography>
                        <Button color="inherit" className={classes.menuItem}>Menu1</Button>
                        <Button color="inherit" className={classes.menuItem}>Menu2</Button>
                        <div className={classes.grow}/>
                        <Button color="inherit">Sign Up</Button>
                        <Button color="inherit">Login</Button>
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
export default withStyles(styles)(Navbar);

