import React from 'react';

import Backdrop from '../UI/Backdrop/Backdrop';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './RequestSlip.css';


const requestSlip = ( props ) => (
    <div>
        <Backdrop
            show={ props.show }/>
        <div>
            <div
                className={ classes.RequestSlip }
                style={ {
                    transform: props.show ? 'translateY(0)' : 'translateY(-150vh)',
                    opacity: props.show ? '1' : '0',
                } }> 
                <form>
                    <div className={ classes.GridItem } >
                        <h2>Singer Request Slip</h2>
                        <h2 className={ classes.UserInput }>Your Name:</h2>
                        <Input
                            changed={ props.changed }
                            shouldValidate={ props.shouldValidate}
                            touched={ props.touched }
                            invalid={ props.invalid }
                            value={ props.value }
                            elementConfig={ props.elementConfig }/>
                        <div className={ classes.SongDetails}>
                            <div className={ classes.Artist }>
                                <div className={ classes.Label }><h2>Artist: </h2></div>
                                <div className={ [ classes.ReadOnlyBox, classes.WideFlex ].join(' ') }>{ props.songData.Artist }</div>
                            </div>
                            <div className={ classes.Title }>
                                <div className={ classes.Label }><h2>Title: </h2></div>
                                <div className={ [ classes.ReadOnlyBox, classes.WideFlex ].join(' ') }>{ props.songData.Title }</div>
                            </div>
                            <div className={ classes.BottomRow }>
                                <div className={ classes.col1 }>
                                    <span className={ classes.Inline }>
                                        <h2>Ref: </h2>
                                    </span>
                                    <span className={ classes.Inline }>
                                        <div className={ classes.ReadOnlyBox }>{ props.songData.DiscRef }</div>
                                    </span>
                                </div>
                                <div className={ classes.col2 }>
                                    <span className={ classes.Inline }>
                                        <h2>Key: </h2>
                                    </span>
                                    <span className={ classes.Inline }>
                                        <div className={ classes.ReadOnlyBox }>{ props.songData.Key }</div>
                                    </span>
                                </div>
                                <div className={ classes.col3 }>
                                    <span className={ classes.Inline }>
                                        <h2>Length: </h2>
                                    </span>
                                    <span className={ classes.Inline }>
                                        <div className={ classes.ReadOnlyBox }>{ props.songData.Length }</div>
                                    </span>
                                </div>
                            </div>
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
                    </div>
                </form>
            </div>
        </div>   
    </div>
);

export default requestSlip;