import React, {Component} from 'react';
import {connect} from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {REGISTER} from '../../store/actionTypes';

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

export interface RegistrationData {
    name: string,
    email: string,
    password: string,
    password2: string,
    [key: string]: string
}

interface RegisterState {
    data: {
        name: string;
        email: string;
        password: string;
        password2: string;
        [key: string]: string;
    },
    errors: {
        name: string;
        email: string;
        password: string;
        password2: string;
        [key: string]: string;
    }
}

class Register extends Component<WithStyles & DispatchProps & StateProps & RouteComponentProps, RegisterState> {

    constructor(props: WithStyles & DispatchProps & StateProps & RouteComponentProps){
        super(props)
        this.state = {
            data: {
                name: 'q',
                email: 'qq@qq.qq',
                password: 'Q1qqqqqq',
                password2: 'Q1qqqqqq',
            },
            errors: {
                name: '',
                email: '',
                password: '',
                password2: '',
            }
        }
    }

    getSnapshotBeforeUpdate(prevProps: WithStyles & DispatchProps & StateProps & RouteComponentProps, prevState: RegisterState) {
        // define errors, from this components or from backend,
        // if there is errorObject in snapshot it will replace state.errors in componentDidMount
        const newState = {...this.state};
        let propsChanged = false;
        Object.keys(prevProps.errors).forEach((key: string) => {
            if(
                this.props.errors[key] !== prevProps.errors[key] &&
                this.props.errors[key] !== prevState.errors[key]
            ) {
                newState.errors[key] = this.props.errors[key]
                propsChanged = true;
            }
        })
        return propsChanged ? newState : null
    }

    componentDidUpdate(a: any, b: any, snapshot: RegisterState | null) {
        console.log('snapshot', snapshot)
        if(snapshot) {
            this.setState(snapshot)
        }
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedData = {
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value

            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }

        }
        this.setState(changedData as Pick<RegisterState, keyof RegisterState>);
    }

    onSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        // Define array that will store each falsy check
        const checkResults = [];

        // Validating email address
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailReg.test(String(this.state.data.email).toLowerCase())) {
            const emailErr = {
                ...this.state.errors,
                email: 'This email is not valid'
            }
            await this.setState({errors: emailErr})
            checkResults.push(false);
        }
        console.log('EM',this.state.errors);

        // Password validation (8-30 chars, 1 small, 1 capital, 1 number)
        const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/;
        if(!passReg.test(String(this.state.data.password))) {
            const passwErr = {
                ...this.state.errors,
                password: 'Password should contain from 8 to 30 chars, at least 1 small letter, 1 number and 1 capital'
            }
            await this.setState({errors: passwErr})
            checkResults.push(false);
        }

        // Password matching validation
        if(this.state.data.password !== this.state.data.password2) {
            const passw2Err = {
                ...this.state.errors,
                password2: 'Passwords should match'
            }
            await this.setState({errors: passw2Err})
            checkResults.push(false);
        }


        // Checking each input for emptyness

        // Define object with current errors state
        const reqErr = {...this.state.errors};
        Object.keys(reqErr).forEach((name: string) => {
            if(this.state.data[name] === '') {
                reqErr[name] = 'This field is required';
                checkResults.push(false);
            }
        });
        await this.setState({errors: reqErr});
        console.log('reqErr', reqErr)

        // If at least 1 check pushed false to array return false and abort submitting
        if(checkResults.length > 0) return false;

        // Data to send to the server
        const data: RegistrationData = {
            name: this.state.data.name,
            email: this.state.data.email,
            password: this.state.data.password,
            password2: this.state.data.password2,
        }

        // Emit Query Action
        this.props.register(data, this.props.history);

    }

    render() {
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
                        error={this.state.errors.name !== ''}
                        fullWidth
                        name="name"
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        helperText={this.state.errors.name}
                        value={this.state.data.name}
                        onChange={this.onChange}
                    />
                    <TextField
                        error={this.state.errors.email !== ''}
                        fullWidth
                        name="email"
                        label="Email Address"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        helperText={this.state.errors.email}
                        value={this.state.data.email}
                        onChange={this.onChange}
                    />
                    <TextField
                        error={this.state.errors.password !== ''}
                        fullWidth
                        name="password"
                        type="password"
                        label="Password"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        helperText={this.state.errors.password}
                        value={this.state.data.password}
                        onChange={this.onChange}
                    />
                    <TextField
                        error={this.state.errors.password2 !== ''}
                        fullWidth
                        name="password2"
                        type="password"
                        label="Confirm Password"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        helperText={this.state.errors.password2}
                        value={this.state.data.password2}
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

const mapStateToProps = (state: any) => ({
    errors: state.errors
});

const dispatchStateToProps = (dispatch: any) => ({
    register: (data: RegistrationData, history: any) => dispatch({type: REGISTER, payload: { data, history }})
})

interface DispatchProps {
    register: (data: RegistrationData, history: any) => void
}

interface StateProps {
    errors: RegistrationData
}

export default connect(
    mapStateToProps,
    dispatchStateToProps
)(withStyles(styles)(Register));