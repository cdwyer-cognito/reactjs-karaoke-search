import React, { Component } from 'react';

import List from '../../components/UI/List/List';
import SelectedRequest from '../../components/SelectedRequest/SelectedRequest';
import axios from '../../axios-search';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Requests.css';

class Requests extends Component {

    state = {
        pendingRequests: [{
            UID: "123456",
            GUID: "abc123",
            Singer: "A Singer",
            DiscRef: "MRH87-12",
            Length: "4:07",
            Artist: "Wheatus",
            Title: "Africa",
            Key: "B",
            DateTime: "19/01/19 17:48"
        },
        {
            UID: "987654",
            GUID: "abc987",
            Singer: "Another Singer",
            DiscRef: "SFMW866-01",
            Length: "3:26",
            Artist: "Motorhead",
            Title: "Ace of Spades",
            Key: "F",
            DateTime: "19/01/19 17:50"
        }],
        completedRequests: [{
            UID: "2468",
            GUID: "qwerty",
            Singer: "A completed Singer",
            DiscRef: "SF001-02",
            Length: "4:14",
            Artist: "Neil Diamond",
            Title: "Sweet Caroline",
            Key: "G",
            DateTime: "19/01/19 17:50",
            CompletedDateTime: "19/01/19 19:02"
        }],
        refreshTimer: 60,
        updateTimer: null,
        requestSelected: false,
        requestSelectedIndex: 0,
        typeOfSelected: "pending",
        selectedArrayLength: 2,
        requestData: {}
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
        let pendingRequests = null;
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

                pendingRequests = this.sortArrayByDateTime( pending );
                completedRequests = this.sortArrayByCompletedDateTime( pending );

                this.setState( { 
                    pendingRequests: pendingRequests,
                    completedRequests: completedRequests 
                });
            })
            .catch( err => console.log( err ) );
      
    }
 
    getSongDataByIndex = ( index ) => {

        let selectedArray = this.state.pendingRequests;

        if ( this.state.typeOfSelected === "completed" ) {
            selectedArray = this.state.completedRequests;
        }

        this.setState({
            requestSelectedIndex: index,
            requestData: selectedArray[ index ]
        });

    }

    clickPreviousHandler = () => {
        if ( this.state.requestSelectedIndex <= 0 ) {
            return null;
        }
        this.getSongDataByIndex( this.state.requestSelectedIndex - 1 )
    } 

    clickNextHandler = () => {
        if ( this.state.requestSelectedIndex + 1 >= this.state.selectedArrayLength ) {
            return null;
        }

        this.getSongDataByIndex( this.state.requestSelectedIndex + 1 );
    }

    clickBackHandler = () => {
        this.setState( { requestSelected: false } );
    }

    clickCompletedHandler = () => {
        // api call to mark track as completed
        // then api call to get latest requests
        // this.getRequestUpdates();


        this.setState( { 
            requestSelected: false,
            requestSelectedIndex: null,
            typeOfSelected: "",
            selectedArrayLength: 0,
            requestData: {}
         } );
    }

    findSongData = ( id, listType ) => {

        let searchArray = this.state.pendingRequests;
        if ( listType === "completed" ) {
            searchArray = this.state.completedRequests;
        }

        const search = ( id ) => { 
            let i = 0;
            for( let songData of searchArray ) {
                if ( songData.GUID === id ) {
                    return [ songData, i ];
                }
                i++;
            }
        }

        const data = search( id );

        this.setState( {
            requestSelectedIndex: data[ 1 ],
            requestData: data[ 0 ],
            typeOfSelected: listType,
            selectedArrayLength: searchArray.length,
            requestSelected: true
        } );
    }

    rowClickHandlerPending = ( id ) => {
        this.findSongData( id, "pending" );
    }

    rowClickHandlerCompleted = ( id ) => {
        this.findSongData( id, "completed" );
    }

    render() {
        return (
            <div className={ classes.Requests }>
                <SelectedRequest 
                    show={ this.state.requestSelected }
                    songData={ this.state.requestData }
                    clickBack={ this.clickBackHandler }
                    disablePrevious={ this.state.requestSelectedIndex <= 0 }
                    clickPrevious={ this.clickPreviousHandler }
                    disableNext={ this.state.requestSelectedIndex + 1 >= this.state.selectedArrayLength }
                    clickNext={ this.clickNextHandler }
                    clickCompleted={ this.clickCompletedHandler }
                    typeOfSelected={ this.state.typeOfSelected }
                    index={ this.state.requestSelectedIndex }
                    available={ this.state.selectedArrayLength } />
                <div className={ classes.RequestsHeader }>
                    <h1>Requests</h1>
                    <p className={ classes.Timer } >Updating in { this.state.updateTimer < 10 ? "0" + this.state.updateTimer : this.state.updateTimer }</p>
                </div>
                <h2>Pending</h2>
                <List 
                    listData={ this.state.pendingRequests }
                    clicked={ this.rowClickHandlerPending } 
                    listType="pending"/>
                <h2>Completed</h2>
                <List 
                    listData={this.state.completedRequests}
                    clicked={ this.rowClickHandlerCompleted }
                    listType="completed"/>
            </div>
        )
    }

}

export default errorHandler( Requests, axios );