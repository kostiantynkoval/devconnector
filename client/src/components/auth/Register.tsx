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
        width: '80%'
    },
    button: {
        margin: '20px 0',
        fontSize: 20
    }
});

interface RegisterState {
    name: string;
    email: string;
    password: string;
    password2: string;
    nameerr: string;
    emailerr: string;
    passworderr: string;
    password2err: string;
    [key: string]: string;
}

class Register extends Component<WithStyles, RegisterState> {

    constructor(props: WithStyles){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            nameerr: '',
            emailerr: '',
            passworderr: '',
            password2err: '',
        }
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({[e.target.name]: e.target.value, [`${e.target.name}err`]: ''} as Pick<RegisterState, keyof RegisterState>);
    }

    onSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        // Define array that will store each falsy check
        const checkResults = [];

        // Validating email address
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailReg.test(String(this.state.email).toLowerCase())) {
            this.setState({emailerr: 'This email is not valid'})
            checkResults.push(false);
        }

        // Password validation (8-30 chars, 1 small, 1 capital, 1 number)
        const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/;
        if(!passReg.test(String(this.state.password))) {
            this.setState({passworderr: 'Password should contain from 8 to 30 chars, at least 1 small letter, 1 number and 1 capital'})
            checkResults.push(false);
        }

        // Password matching validation
        if(this.state.password !== this.state.password2) {
            this.setState({password2err: 'Passwords should match'})
            checkResults.push(false);
        }

        // Checking each input for emptyness
        ['name','email','password','password2'].forEach((name: string) => {
            if(this.state[name] === '') {
                this.setState({[`${name}err`]: 'This field is required'});
                checkResults.push(false);
            }
        });

        // If at least 1 check pushed false to array return false and abort submitting
        if(checkResults.length > 0) return false;


        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        }
        console.log(data);

    }

    render() {
        console.log(this.state)
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h3" gutterBottom>
                    Sign Up
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Create your DevConnector account
                </Typography>
                <form onSubmit={this.onSubmit} className={classes.wrapper}>
                    <TextField
                        error={this.state.nameerr !== ''}
                        fullWidth
                        name="name"
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        helperText={this.state.nameerr}
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <TextField
                        error={this.state.emailerr !== ''}
                        fullWidth
                        name="email"
                        label="Email Address"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        helperText={this.state.emailerr}
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    <TextField
                        error={this.state.passworderr !== ''}
                        fullWidth
                        name="password"
                        type="password"
                        label="Password"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        helperText={this.state.passworderr}
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    <TextField
                        error={this.state.password2err !== ''}
                        fullWidth
                        name="password2"
                        type="password"
                        label="Confirm Password"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        helperText={this.state.password2err}
                        value={this.state.password2}
                        onChange={this.onChange}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        size="large"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </form>

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
// )(Register);
export default withStyles(styles)(Register);