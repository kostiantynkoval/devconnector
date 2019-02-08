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
    }
});

class Dashboard extends Component<WithStyles, {}> {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <h1 className={classes.title}>Developer Connector Dashboard</h1>
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
// )(Dashboard);
export default withStyles(styles)(Dashboard);