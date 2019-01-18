import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../components/UI/Input/Input';
import List from '../../components/UI/List/List';
import RequestSlip from '../../components/RequestSlip/RequestSlip';
import RequestSuccess from '../../components/RequestSuccess/RequestSuccess';

import axios from '../../axios-search';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './SearchResults.css';

class SearchResults extends Component {

    state = {
        searchParams: {
            searchby: '',
            searchvalue: '',
            browse: false
        },
        searchResults: [{ UID: "123456", DiscRef: "SF123", Artist: "ABBA", Title: "Waterloo", Key:"B#", Length:"3:26"},
            { UID: "5754", DiscRef: "SF124-01", Artist: "ABBA", Title: "Dancing Queen", Key:"C", Length:"3:04"},
            { UID: "8787", DiscRef: "SF123-03", Artist: "ABC", Title: "The Look of Love pt1", Key:"D", Length:"4:19"},
            { UID: "123475", DiscRef: "SF128-09", Artist: "Spice Girls", Title: "Stop", Key:"B", Length:"3:38"}],
        filteredResults: [{ UID: "123456", DiscRef: "SF123", Artist: "ABBA", Title: "Waterloo", Key:"B#", Length:"3:26"},
            { UID: "5754", DiscRef: "SF124-01", Artist: "ABBA", Title: "Dancing Queen", Key:"C", Length:"3:04"},
            { UID: "8787", DiscRef: "SF123-03", Artist: "ABC", Title: "The Look of Love pt1", Key:"D", Length:"4:19"},
            { UID: "123475", DiscRef: "SF128-09", Artist: "Spice Girls", Title: "Stop", Key:"B", Length:"3:38"}],
        filterValue: '',
        apiRequestSent: true,
        sortKey1: "Artist",
        sortKey2 : "Title",
        selectedSong: {
            UID: "", 
            DiscRef: "", 
            Artist: "", 
            Title: "", 
            Key: "", 
            Length: ""
        },
        singerName: '',
        singerNameValid: false,
        singerNameTouched: false,
        showRequestSlip: false,
        loading: false,
        sendingRequest: false,
        requestSuccess: false,
        successNotificationTimeOut: 0
    }

    searchRequestHandler() {
        axios.post('/find-songs', this.state.searchParams )
        .then( res => {
            if ( res.status === 200 ) {
                const searchResults = res.data.sort( (a, b) => {
                    if ( a[ this.state.sortKey1 ] < b[ this.state.sortKey1 ] ) {
                        return -1;
                        }

                        if ( a[ this.state.sortKey1 ] > b[ this.state.sortKey1 ] ) {
                        return 1;
                        }

                        // If it's got this far the now sort by the second key
                        if ( a[ this.state.sortKey2 ] < b[ this.state.sortKey2 ] ) {
                        return -1;
                        }

                        if ( a[ this.state.sortKey2 ] > b[ this.state.sortKey2 ] ) {
                        return 1;
                        }
                        
                        return 0;
                });

                this.setState( {
                    searchResults: searchResults,
                    filteredResults: searchResults,
                    apiRequestSent: true
                } );
            }
        })
        .catch( err => console.log( err ));
    }

    componentDidMount() {

        if ( this.state.apiRequestSent ) {
            return null;
        }

        const searchParams = { ...this.state.searchParams };
        const search = this.props.location.search.replace('?', '').split('&');
        for ( let params of search ) {
            let data = params.split('=');
            searchParams[ data[0] ] = decodeURIComponent( data[1] );
        }
        let sortKey1 = "Artist";
        let sortKey2 = "Title"
        if ( searchParams.searchby === "title" ) {
            sortKey1 = "Title";
            sortKey2 = "Artist";
        }

        this.setState( { 
            searchParams: searchParams,
            sortKey1: sortKey1,
            sortKey2: sortKey2
        });

        // this.searchRequestHandler();
          
    }

    filterHandler = ( event ) => {
        event.preventDefault();

        const value = event.target.value.toLowerCase();

        this.setState( { filterValue: value } );

        const newFilteredResults = this.state.searchResults.filter( songDetails => {
            if ( songDetails.Artist.toLowerCase().includes( value ) || 
                    songDetails.Title.toLowerCase().includes( value ) ) {
                return songDetails;
            }

            return null;
        });
        this.setState( { filteredResults: newFilteredResults });


    }

    findSongData = ( id ) => {
        for( let songData of this.state.searchResults ) {
            if ( songData.UID === id ) {
                return songData;
            }
        }
    }

    rowClickHandler = ( id ) => {
        
        const selectedSong = this.findSongData( id );

        this.setState( { 
            selectedSong: selectedSong,
            showRequestSlip: true
        });

        console.log( 'Selected Song', selectedSong );

        
    }

    singerNameHandler = ( event ) => {
        const name = event.target.value;
       
        let singerNameValid = true;

        if ( name.length < 3 ) {
            singerNameValid = false;
        }

        if ( name.length > 30 ) {
            singerNameValid = false;
        }

        this.setState({ 
            singerName: name,
            singerNameTouched: true,
            singerNameValid: singerNameValid
        });

    }

    clickBackHandler = ( event ) => {
        event.preventDefault();

        this.setState({ showRequestSlip: false });
    }

    clickSubmitHandler = ( event ) => {
        event.preventDefault();

        if( !this.state.singerNameValid ) {
            return null;
        }

        this.setState({ 
            showRequestSlip: false,
            sendingRequest: true
         });

         // dummy function to fake api response
         setTimeout( () => {
            this.setState({ sendingRequest: false, });
            this.requestSuccesshandler();
         }, 5000);

        // do api stuff here
    }

    requestSuccesshandler(){    
        this.setState({ requestSuccess: true, });

        let timeleft = 10;
        this.setState( { successNotificationTimeOut: timeleft } );

        let downloadTimer = setInterval( () => {
            timeleft--;
            this.setState( { successNotificationTimeOut: timeleft} );

            if ( timeleft <= 0 ) {
                clearInterval(downloadTimer);
                this.props.history.push("/");
            }
        },1000);

        // setTimeout( () => {
        //     // redirect to home after 10 seconds
            
        //     this.setState({ requestSuccess: false });
            
        //         this.props.history.push("/");
        //  }, 10000);
    }

    render(){

        let searchResults = (
            <Modal show={ true }>
                <Spinner />
            </Modal>
        );

        if ( !this.state.loading ) {
            searchResults = (
                <Aux>
                    <Input
                        elementType="input"
                        value={ this.state.filterValue }
                        elementConfig={ {
                            type: 'text',
                            placeholder: 'Filter'
                        }}
                        changed={ ( event ) => this.filterHandler( event ) }/>
                    <List 
                        listData={ this.state.filteredResults }
                        sortedBy={ this.state.sortKey1 }
                        clicked={ this.rowClickHandler }/>
                </Aux>    
            ); 
        }

        return (
            <div className={ classes.SearchResults }>
                <RequestSlip 
                    show={ this.state.showRequestSlip }
                    value={ this.state.singerName }
                    songData={ this.state.selectedSong }
                    elementConfig={ {
                        type: 'text',
                        placeholder: 'Enter between 3 and 30 characters'
                    }}
                    shouldValidate={ true }
                    touched={ this.state.singerNameTouched }
                    invalid={ !this.state.singerNameValid }
                    changed={ ( event ) => this.singerNameHandler( event )}
                    clickBack={ ( event ) => this.clickBackHandler( event ) }
                    clickSubmit={ ( event ) => this.clickSubmitHandler( event ) }/>
                <Modal show={ this.state.sendingRequest }>
                    <h1>Submitting Request...</h1>
                    <Spinner />
                </Modal>
                <RequestSuccess 
                    show={ this.state.requestSuccess }
                    songData={ this.state.selectedSong }
                    singer={ this.state.singerName }
                    timer={ this.state.successNotificationTimeOut }/>

                <h1>Search Results</h1>
                { searchResults }
            </div>
        );
    }
}

export default errorHandler( SearchResults, axios );