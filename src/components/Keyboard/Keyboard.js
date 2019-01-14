import React from 'react';

import Button from '../UI/Button/Button';
import classes from './Keyboard.css';

const keyboard = ( props ) => {

    const keys = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
        'O','P','Q','R','S','T','U','V','W','X','Y','Z','0-9','Back' ];
    
    const buttons = [];
    
    for ( let i of keys ) {

        let style = null;
        let btnType = null;
        if ( i === "0-9" ) {
            style = classes.C5;
        }

        if ( i === "Back" ) {
            style = classes.D5;
            btnType = "Danger";
        }

        buttons.push(
            <div 
                key={ i }
                className={ style }>
                <Button
                    key={ i }
                    clicked={ ( event ) => props.clicked(event, i) }
                    btnType={ btnType }>{i}</Button>
            </div>
        );
    }

    return (
        <form className={ classes.Keyboard }>
            <div className={ classes.GridContainer } >
                { buttons }                
            </div>
        </form>
    );
}

export default keyboard;