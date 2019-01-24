import React from 'react';

import Navigationitems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Logo from '../../Logo/Logo';

const sideDrawer = ( props ) => {
    
    let attachedClasses = [ classes.SideDrawer, classes.Close];
    if ( props.open ){
        attachedClasses = [ classes.SideDrawer, classes.Open];
    }

    return(
        <Aux>
            <Backdrop 
                show={ props.open }
                clicked={ props.closed } />
            <div className={ attachedClasses.join(' ') }>
                <div className={ classes.Logo } >
                    <Logo />
                </div>
                <nav>
                    <Navigationitems 
                        djMode={ props.djMode }
                        clicked={ props.closed }/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;