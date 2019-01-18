import React from 'react';

import Backdrop from '../UI/Backdrop/Backdrop';
import Button from '../UI/Button/Button';

import classes from './SelectedRequest.css';

const selectedRequest = ( props ) => (
    <div>
        <Backdrop
            show={ props.show }/>
        <div
            className={ classes.SelectedRequest }
            style={ {
                transform: props.show ? 'translateY(0)' : 'translateY(-150vh)',
                opacity: props.show ? '1' : '0',
            }}>
            <div className={ classes.GridContainer }>
                <div className={ classes.ItemA1 }>Singer: </div>
                <div className={ [ 
                    classes.ItemB1,
                    classes.ReadOnlyBox 
                    ].join(' ')}>{ props.songData.Singer }</div>
                <div className={ classes.ItemA2 }>Ref: </div>
                <div className={ [ 
                    classes.ItemB2,
                    classes.ReadOnlyBox 
                    ].join(' ')}>{ props.songData.DiscRef }</div>  
                <div className={ classes.ItemC2 }>Length: </div>
                <div className={ [ 
                    classes.ItemD2,
                    classes.ReadOnlyBox
                    ].join(' ')}>{ props.songData.Length }</div>
                <div className={ classes.ItemA3 }>Title: </div>
                <div className={ [ 
                    classes.ItemB3,
                    classes.ReadOnlyBox 
                    ].join(' ')}>{ props.songData.Title }</div>
                <div className={ [ classes.GridItem, classes.ItemA4 ].join(' ')}>Artist: </div>
                <div className={ [ classes.GridItem,
                    classes.ItemB4,
                    classes.ReadOnlyBox 
                    ].join(' ')}>{ props.songData.Artist }</div>
            </div>
            <div className={ classes.CenterButtons}>
                <Button
                    btnType=""
                    clicked={ props.clickBack }>Close</Button>
                <div className={ classes.ButtonPadding } />
                <Button
                    btnType="Success"
                    disabled={ props.invalid }
                    clicked={ props.clickCompleted }>Completed</Button>
            </div>
        </div>
    </div>
);

export default selectedRequest;