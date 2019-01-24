import React from 'react';

import Backdrop from '../UI/Backdrop/Backdrop';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './Login.css';

import key from '../../assets/images/key.png';


const Login = ( props ) => (
    <div>
        <Backdrop
            show={ props.show }/>
        <div
            className={ classes.Login }
            style={ {
                transform: props.show ? 'translateY(0)' : 'translateY(-150vh)',
                opacity: props.show ? '1' : '0',
            } }> 
            <div className={ classes.Header }>
                <div className={ classes.Image }>
                    <img style={{ height: "30px"}} src={ key } alt="Login" />
                </div>
                <div className={ classes.PasswordInput}>
                    <Input
                        elementType="password"
                        changed={ props.changed }
                        value={ props.value } />
                </div>
            </div>
                <div className={ classes.Buttons } >
                <div className={ classes.CancelButton }>
                    <Button
                        clicked={ props.clickedCancel }
                        btnType="">Cancel</Button>
                </div>
                <div className={ classes.LogoutButton }>
                    <Button
                        clicked={ props.clickedLogOut }
                        disabled={ !props.djMode }
                        btnType={!props.djMode ? "Disabled" : "Danger"}>Log Out</Button>
                </div>
                <div className={ classes.LoginButton }>
                <Button
                    clicked={ props.clickedLogIn }
                    disabled={ props.djMode || props.value <= 0 }
                    btnType={ props.djMode || props.value <= 0 ? "Disabled" : "Success" }>Log In</Button>
                </div>
            </div>
        </div>           
    </div>
)

export default Login;