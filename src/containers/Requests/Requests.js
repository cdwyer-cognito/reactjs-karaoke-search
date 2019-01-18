import React, { Component } from 'react';

import List from '../../components/UI/List/List';
import SelectedRequest from '../../components/SelectedRequest/SelectedRequest';
import axios from '../../axios-search';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Requests.css';

class Requests extends Component {

    state = {
        currentRequests: [],
        completedRequests: [],
        refreshTimer: 30,
        updateTimer: null,
        requestSelected: true,
        requestData: {
            Singer: "A Singer",
            DiscRef: "MRH87-12",
            Length: "4.07",
            Artist: "Wheatus",
            Title: "Africa"
        }
    }

    componentDidMount(){
        
        // this.getRequestUpdates();
        let timeleft = this.state.refreshTimer ;
        this.setState( { updateTimer: timeleft } );

        setInterval( () => {
            timeleft--;
            this.setState( { updateTimer: timeleft} );

            if ( timeleft <= 0 ) {
                // this.getRequestUpdates();
                this.setState( { updateTimer: this.state.refreshTimer } );

                timeleft = this.state.refreshTimer ;
                this.setState( { updateTimer: timeleft } );
            }
        },1000);
    }

    sortArrayByDateTime = ( array ) => {
        return array.sort( (a, b) => {
            if ( a.DateTime < b.DateTime ) {
                return -1;
            }

            if ( a.DateTime > b.DateTime ) {
                return 1;
            }
        
            return 0;
        });
    };

    sortArrayByCompletedDateTime = ( array ) => {
        return array.sort( (a, b) => {
            if ( a.CompletedDateTime < b.CompletedDateTime ) {
                return -1;
            }
        
            if ( a.CompletedDateTime > b.CompletedDateTime ) {
                return 1;
            }
        
            return 0;
        });
    };

    getRequestUpdates() {

        const pending = [];
        const completed = [];
        let currentRequests = null;
        let completedRequests = null;

        axios.get('/submitted-requests')
            .then( res => {
                
                for ( let request of res.data ) {
                    if ( request.State ) {
                        completed.push( request );
                    } else {
                        pending.push( request );
                    }
                }

                currentRequests = this.sortArrayByDateTime( pending );
                completedRequests = this.sortArrayByCompletedDateTime( pending );

                this.setState( { 
                    currentRequests: currentRequests,
                    completedRequests: completedRequests 
                });
            })
            .catch( err => console.log( err ) );
      
    }

    clickBackHandler = () => {
        this.setState( { requestSelected: false } );
    }

    clickCompletedHandler = () => {
        // api call to mark track as completed
        // then api call to get latest requests
        // this.getRequestUpdates();

        this.setState( { requestSelected: false } );
    }

    render() {
        return (
            <div className={ classes.Requests }>
                <SelectedRequest 
                    show={ this.state.requestSelected }
                    songData={ this.state.requestData }
                    clickBack={ this.clickBackHandler }
                    clickCompleted={ this.clickCompletedHandler }/>
                <div className={ classes.RequestsHeader }>
                    <h1>Requests</h1>
                    <p className={ classes.Timer } >Updating in { this.state.updateTimer < 10 ? "0" + this.state.updateTimer : this.state.updateTimer }</p>
                </div>
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