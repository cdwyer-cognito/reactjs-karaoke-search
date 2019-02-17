import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = ( props ) => {

    let djNavigation = null;
    if ( props.djMode ) {
        djNavigation = (
            <React.Fragment>
                <NavigationItem link="/admin" clicked={ props.clicked }>Admin</NavigationItem>
                <NavigationItem link="/requests" clicked={ props.clicked }>Requests</NavigationItem>
            </React.Fragment>
        );
    }

    return(
        <ul className={ classes.NavigationItems } >
            { djNavigation }
            <NavigationItem link="/search" clicked={ props.clicked }>Search</NavigationItem>
            <NavigationItem link="/browse/by-artist" clicked={ props.clicked }>Browse by Artist</NavigationItem>
            <NavigationItem link="/browse/by-title" clicked={ props.clicked }>Browse by Title</NavigationItem>
        </ul>
    );
}

export default navigationItems;