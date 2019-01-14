import React from 'react';

import karaokeLogo from '../../assets/images/logo-karaoke-png.png';
import classes from './Logo.css';

const logo = ( props ) => (
    <div className={ classes.Logo }>
        <img src={ karaokeLogo } alt="Karaoke Search" />
    </div>
);

export default logo;