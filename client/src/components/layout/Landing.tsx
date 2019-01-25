import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Geneva from '../../images/geneva.jpg'


const styles = createStyles({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundImage: `url(${Geneva})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
    },
    title: {
        marginTop: "20%",
        marginBottom: 0
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        marginRight: 26
    }
});

class Landing extends Component<WithStyles, {}> {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <h1 className={classes.title}>Developer Connector</h1>
                <h6>Create a developer portfolio, share posts and get help from other developers</h6>
                <div>
                    <Button variant="contained" className={classes.button}>
                        Sign Up
                    </Button>
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                </div>
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
// )(Landing);
export default withStyles(styles)(Landing);