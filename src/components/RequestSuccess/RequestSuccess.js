import React from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import Logo from '../Logo/Logo';
import classes from './RequestSuccess.css';

const requestSuccess = ( props ) => (
    <div>
        <Backdrop
            show={ props.show }/>
        <div
            className={ classes.RequestSuccess }
            style={ {
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0',
            }}> 
            <div style={ { height: "90px"} }>
                <Logo />
            </div>
            <p>Thank you <strong>{ props.singer }</strong> for your request of <strong>{ props.songData.Title }</strong> in the style of <strong>{ props.songData.Artist }</strong>. It has been submitted to the DJ.</p>
            <p>Keep listening and you will be called when it's your turn to sing.</p>
            <p>While you're waiting why not request another?</p>
            <br/>
            <br/>
            <p className={ classes.CenterText }>Please note the DJ will not be able to tell you how long untill you are called. Please be patient.</p>
            <p className={ classes.Timer }>Return to start in: <strong>{ props.timer < 10 ? "0" + props.timer : props.timer }</strong></p> 
        </div>
    </div>
);

export default requestSuccess