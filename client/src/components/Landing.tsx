import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {CustomProps} from '../@interface/customProps'


type Styles = {
    root: any,
    grow: any,
    menuItem: any,
    title: any,
    button: any
}

interface NavbarProps { classes: Styles }

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
    },
    button: {

    }
};

class Landing extends Component<NavbarProps, {}> {
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <div>
                    <Button variant="contained" className={classes.button}>
                        Sign Up
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Login
                    </Button>
                </div>
            </Fragment>
        );
    }
}

// function mapStateToProps(state: any) {
//     return state;
// }
//
// export default connect(
//     mapStateToProps,
// )(Landing);
export default withStyles(styles)(Landing);