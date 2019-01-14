import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = ( props ) => (
    <ul className={ classes.NavigationItems } >
        <NavigationItem link="/search" clicked={ props.clicked }>Search</NavigationItem>
        <NavigationItem link="/browse/by-artist" clicked={ props.clicked }>Browse by Artist</NavigationItem>
        <NavigationItem link="/browse/by-title" clicked={ props.clicked }>Browse by Title</NavigationItem>
    </ul>
);

export default navigationItems;