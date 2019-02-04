import React, {Component} from 'react';
import {connect} from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {LOGIN} from '../../store/actionTypes';
import { validateForm } from '../../utils/formValidation'

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

export interface LoginData {
    email: string,
    password: string,
    [key: string]: string
}

interface LoginState {
    data: LoginData,
    errors: LoginData
}

class Login extends Component<WithStyles & DispatchProps & StateProps & RouteComponentProps, LoginState> {

    constructor(props: WithStyles & DispatchProps & StateProps & RouteComponentProps){
        super(props)
        this.state = {
            data: {
                email: 'qq@qq.qq',
                password: 'Q1qqqqqq',
            },
            errors: {
                email: '',
                password: '',
            }
        }
    }

    getSnapshotBeforeUpdate(prevProps: WithStyles & DispatchProps & StateProps & RouteComponentProps, prevState: LoginState) {
        // define errors, from this components or from backend,
        // if there is errorObject in snapshot it will replace state.errors in componentDidMount
        const newState = {...this.state};
        let propsChanged = false;
        console.log('prevState', prevState)
        Object.keys(prevState.errors).forEach((key: string) => {
            if(
                this.props.errors[key] !== prevProps.errors[key] &&
                this.props.errors[key] !== prevState.errors[key]
            ) {
                newState.errors[key] = this.props.errors[key];
                propsChanged = true;
                console.log('changed')
            }
        })
        return propsChanged ? newState : null
    }

    componentDidUpdate(a: any, b: any, snapshot: LoginState | null) {
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
        this.setState(changedData as Pick<LoginState, keyof LoginState>);
    }

    onSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        // Validating form
        const { isValid, errors } = validateForm(this.state.data);

        if(isValid) {
            // Emit Query Action
            const data: LoginData = {
                email: this.state.data.email,
                password: this.state.data.password,
            }
            this.props.login(data, this.props.history);
        } else {
            this.setState({errors})
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h3" gutterBottom>
                    Login
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Login into your DevConnector account
                </Typography>
                <form onSubmit={this.onSubmit} className={classes.wrapper}>
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
                        type="password"
                        fullWidth
                        label="Password"
                        name="password"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        helperText={this.state.errors.password}
                        value={this.state.data.password}
                        onChange={this.onChange}
                    />
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </form>

            </div>
        );
    }
}

interface DispatchProps {
    login: (data: LoginData, history: any) => void
}

interface StateProps {
    errors: LoginData
}

const mapStateToProps = (state: any) => ({
    errors: state.errors
});

const dispatchStateToProps = (dispatch: any) => ({
    login: (data: LoginData, history: any) => dispatch({type: LOGIN, payload: { data, history }})
})

export default connect(
    mapStateToProps,
    dispatchStateToProps
)(withStyles(styles)(Login));