import React from 'react';
import Logo from '../../components/Logo/Logo';

import { Link } from 'react-router-dom';
import classes from './Home.css';

import singers from '../../assets/images/singers.png';

const home = () => (
    <Link className={ classes.Home } to={'/search'}>
        <Logo />
        <h1>Digital Song Book</h1>
        <h3>Tap to start</h3>
        <div>
            <img src={ singers } alt="karaoke book" />
        </div>
    </Link>
);

export default home;