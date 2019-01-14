import React from 'react';
import Logo from '../../components/Logo/Logo';

import { Link } from 'react-router-dom';
import classes from './Home.css';

const home = () => (
        <Link className={ classes.Home } to={'/search'}>
            <Logo />
            <h1>Digital Song Book</h1>
            <h3>Tap to start</h3>
        </Link>
);

export default home;