import React from 'react';

import Backdrop from '../UI/Backdrop/Backdrop';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './RequestSlip.css';
import Logo from '../Logo/Logo';


const requestSlip = ( props ) => (
    <div>
        <Backdrop
            show={ props.show }/>
        <div
            className={ classes.RequestSlip }
            style={ {
                transform: props.show ? 'translateY(0)' : 'translateY(-150vh)',
                opacity: props.show ? '1' : '0',
            } }> 
            <form>
                <div className={ classes.Header }>
                    <Logo />
                    <h1>Singer Request Slip</h1>
                </div>
                <div className={ classes.GridContainer }>
                    <div className={ classes.ItemA1 }>Your Name:</div>
                    <div className={classes.ItemB1 }>
                        <Input
                            noPadding={ true }
                            changed={ props.changed }
                            shouldValidate={ props.shouldValidate}
                            touched={ props.touched }
                            invalid={ props.invalid }
                            value={ props.value }
                            elementConfig={ props.elementConfig }/>    
                    </div>
                    <div className={ classes.ItemA2 }>Title: </div> 
                    <div className={ [ 
                        classes.ItemB2,
                        classes.ReadOnlyBox 
                        ].join(' ')}>{ props.songData.Title }</div>
                    <div className={ [ classes.GridItem, classes.ItemA3 ].join(' ')}>Artist: </div>
                    <div className={ [ classes.GridItem,
                        classes.ItemB3,
                        classes.ReadOnlyBox 
                        ].join(' ')}>{ props.songData.Artist }</div>
                    <div className={ classes.ItemA4 }>Ref: </div>
                    <div className={ [ 
                        classes.ItemB4,
                        classes.ReadOnlyBox 
                        ].join(' ')}>{ props.songData.DiscRef }</div>  
                    <div className={ classes.ItemC4 }>Key: </div>
                    <div className={ [ 
                        classes.ItemD3,
                        classes.ReadOnlyBox
                        ].join(' ')}>{ props.songData.Key }</div>
                    <div className={ classes.ItemE4 }>Length: </div>
                    <div className={ [ 
                        classes.ItemF3,
                        classes.ReadOnlyBox
                        ].join(' ')}>{ props.songData.Length }</div>
                </div>
                <div className={ classes.CenterButtons}>
                    <Button
                        btnType="Danger"
                        clicked={ props.clickBack }>Back</Button>
                    <div className={ classes.ButtonPadding } />
                    <Button
                        btnType={ props.invalid ? "Disabled" : "Success" }
                        disabled={ props.invalid }
                        clicked={ props.clickSubmit }>Submit</Button>
                </div>
            </form>
        </div>
    </div>
);

export default requestSlip;