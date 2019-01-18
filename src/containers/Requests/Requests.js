import React, { Component } from 'react';

import List from '../../components/UI/List/List';
import axios from '../../axios-search';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Requests.css';

class Requests extends Component {

    state = {
        currentRequests: [],
        completedRequests: [],
        refreshTimer: 10,
        updateTimer: null
        }

    componentDidMount(){
        let timeleft = this.state.refreshTimer ;
        
        this.setState( { updateTimer: timeleft } );

        let downloadTimer = setInterval( () => {
            timeleft--;
            this.setState( { updateTimer: timeleft} );

            if ( timeleft <= 0 ) {
                clearInterval(downloadTimer);
                this.getRequestUpdates();
                this.setState( { updateTimer: this.state.refreshTimer } );
            }
        },1000);
    }

    getRequestUpdates() {

        // grab request from api sort and save to state
        this.setState( { 
            currentRequests: [{}],
            completedRequests: [{}] 
        } )
    }

    render() {
        return (
            <div className={ classes.Requests }>
                <h1>Requests</h1>
                <p>Refreshing in { this.state.updateTimer < 10 ? "0" + this.state.updateTimer : this.state.updateTimer }</p>
                <h2>Pending</h2>
                <List 
                    listData={this.state.currentRequests} />
                <h2>Completed</h2>
                <List 
                    listData={this.state.completedRequests} />

            </div>
        )
    }


}

export default errorHandler( Requests, axios );