import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Keyboard from '../../components/Keyboard/Keyboard';

import classes from './Browse.css';

class Browse extends Component {

    keyClickHandler = ( event, id ) => {
        event.preventDefault();
        
        if ( id === "Back" ) {
            this.props.history.goBack();
        } else {
            this.props.history.push({
                pathname: '/search-results',
                search: '?searchby=' + this.props.browseBy + '&value=' + id + '&browse=true'
            })
            
        }
    }

    render() {
        return (
            <div className={ classes.Browse } >
                <h1>Browse by { this.props.browseBy }</h1>
                <Keyboard clicked={ this.keyClickHandler } />
            </div>
        );
    }
}

export default withRouter( Browse );