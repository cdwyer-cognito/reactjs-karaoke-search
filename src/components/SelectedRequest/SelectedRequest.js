import React from 'react';

import Backdrop from '../UI/Backdrop/Backdrop';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

import { timeString } from '../../utils/dateTime';

import classes from './SelectedRequest.css';

const selectedRequest = ( props ) => {
    
    let completedButton = null;
    let dateTime = null;

    if ( props.typeOfSelected === "pending" ) {
        completedButton = (
            <Button
                btnType="Success"
                disabled={ props.invalid }
                clicked={ props.clickCompleted }>Completed</Button>
        );

        dateTime = props.songData.DateTime;
    } else {
        dateTime = props.songData.CompletedDateTime;
    }

    let reportIssue = null;

    if ( props.reportIssue ) {
        reportIssue = 
            <div className={ classes.IssueRecording }>
                <Input 
                    elementType="select"
                    value={ props.issueSummary }
                    changed={ props.updateIssueSummary }
                    elementConfig={ { options: [ 
                        { value: "Song does not match label", displayValue: "Song does not match label"},
                        { value: "No Audio", displayValue: "No Audio"},
                        { value: "No Words", displayValue: "No Words"},
                        { value: "Corrupeted / Unusable", displayValue: "Corrupeted / Unusable"},
                        { value: "Song is incomplete", displayValue: "Song is incomplete"},
                        { value: "Other", displayValue: "Other"}
                      ] }}/>
                <Button
                    clicked={ props.submitReport }>Submit Report</Button>
            </div>
    }
    
    return (
        <div>
            <Backdrop
                show={ props.show }/>
            <div
                className={ classes.SelectedRequest }
                style={ {
                    transform: props.show ? 'translateY(0)' : 'translateY(-150vh)',
                    opacity: props.show ? '1' : '0',
                }}>
                <div className={ classes.CenterButtons}>
                    <Button
                        btnType={ props.disablePrevious ? "Disabled" : null }
                        disabled={ props.disablePrevious }
                        clicked={ props.clickPrevious }>&lt; Previous</Button>
                    <div 
                        className={ classes.ButtonPadding } 
                        style={ { fontSize: "0.7em"} }>{ dateTime ? timeString( dateTime.toLocaleString() ) : null } <br/> ( { props.index + 1 } / { props.available } )</div>
                    <Button
                        btnType={ props.disableNext ? "Disabled" : null }
                        disabled={ props.disableNext }
                        clicked={ props.clickNext }>Next &gt;</Button>
                </div>
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
                        btnType="Danger"
                        clicked={ props.clickBack }>Close</Button>
                    <Button
                        clicked={ props.issueToggle }
                    >Record Issue</Button>
                    { completedButton }
                </div>
                { reportIssue }
            </div>
        </div>
    );
};

export default selectedRequest;