import React, {Component} from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = createStyles({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        marginBottom: 100,
        marginTop: 50
    },
    title: {

    },
    wrapper: {
        maxWidth: 550,
        width: '80%',
        boxSizing: 'border-box',
    },
    button: {
        margin: '20px 0',
        fontSize: 20
    }
});

class Login extends Component<WithStyles> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h3" gutterBottom>
                    Login
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Create your DevConnector account
                </Typography>
                <div className={classes.wrapper}>
                    {/*<TextField*/}
                        {/*fullWidth*/}
                        {/*required*/}
                        {/*id="outlined-required"*/}
                        {/*label="Name"*/}
                        {/*className={classes.textField}*/}
                        {/*margin="normal"*/}
                        {/*variant="outlined"*/}
                    {/*/>*/}
                    <TextField
                        error
                        fullWidth
                        required
                        id="outlined-error"
                        label="Email Address"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        helperText="Error"
                    />
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Password"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    {/*<TextField*/}
                        {/*error*/}
                        {/*fullWidth*/}
                        {/*required*/}
                        {/*id="outlined-error"*/}
                        {/*label="Confirm Password"*/}
                        {/*className={classes.textField}*/}
                        {/*margin="normal"*/}
                        {/*variant="outlined"*/}
                    {/*/>*/}
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </div>

            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {};
// }
//
// export default connect(
//     mapStateToProps,
// )(Login);
export default withStyles(styles)(Login);