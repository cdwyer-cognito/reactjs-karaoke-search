import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../components/UI/Input/Input';
import List from '../../components/UI/List/List';
import RequestSlip from '../../components/RequestSlip/RequestSlip';
import RequestSuccess from '../../components/RequestSuccess/RequestSuccess';
import guid from '../../utils/guid';
import Button from '../../components/UI/Button/Button';

import axios from '../../axios-search';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './SearchResults.css';

import mic from '../../assets/images/micorphone.png';

class SearchResults extends Component {

    constructor( props ) {
        super( props );
        
        this.state = {
            searchParams: {
                searchby: '',
                searchvalue: '',
                browse: false
            },
            searchResults: [],
            searchResultsCount: 0,
            filteredResults: [],
            filteredResultsCount: 0,
            filterValue: '',
            apiRequestSent: false,
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
            requestId: null,
            singerNameValid: false,
            singerNameTouched: false,
            showRequestSlip: false,
            loading: true,
            sendingRequest: false,
            requestSuccess: false,
            successNotificationTimeOut: 0,
            showErrorModal: false,
            errorMessage: "",
            statusMessage: "Searching for matches..."
        }

        this.singerNameInput = React.createRef();
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

        this.searchRequestHandler();
          
    }

    componentDidUpdate(){
        if ( this.state.showRequestSlip ) {
          this.singerNameInput.current.focus();
        }
      }

    searchRequestHandler() {
        const errorMessage = (
            <div style={ { textAlign: "center"} }>
                <h3>Failed to connect to server</h3>
                <br/>
                <h4>Please try again</h4>
                <p>If problem persists please contact the DJ</p>
            </div>
        );

        axios.get('/find-songs' + this.props.location.search )
        .then( res => {
            this.setState( {
                statusMessage: "Sorting results..."
            } );
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
                    searchResultsCount: searchResults.length,
                    filteredResults: searchResults,
                    filteredResultsCount: searchResults.length,
                    apiRequestSent: true,
                    loading: false,
                    statusMessage: "Searching for matches..."
                } );
            } else {
                this.setState( { 
                    loading: false,
                    showErrorModal: true,
                    errorMessage: errorMessage
                });
            }
        })
        .catch( err => {
            console.log( err )
            
            this.setState( { 
                loading: false,
                showErrorModal: true,
                errorMessage: errorMessage
            });
        });
    }

    filterHandler = ( event ) => {
        event.preventDefault();

        const value = event.target.value.toLowerCase();
        let newFilteredResults;

        this.setState( { filterValue: value} );

        if ( value.length === 0 ) {
            newFilteredResults = [ ...this.state.searchResults ];
        } else {

            newFilteredResults = this.state.searchResults.filter( songDetails => {
                if ( songDetails.Artist.toLowerCase().includes( value ) || 
                        songDetails.Title.toLowerCase().includes( value ) ) {
                    return songDetails;
                }

                return null;
            });
        }

        this.setState( { filteredResults: newFilteredResults, filteredResultsCount: newFilteredResults.length });

    }

    clearFilerHandler = () => {
        this.setState( { 
            filteredResults: [ ...this.state.searchResults ], 
            filterValue: "",
            filteredResultsCount: this.state.searchResultsCount });
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
        const requestId = guid();

        this.setState( { 
            selectedSong: selectedSong,
            showRequestSlip: true,
            requestId: requestId
        });
     
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

        this.setState({ 
            showRequestSlip: false,
            singerNameTouched: false,
            singerName: "",
            singerNameValid: false
         });
    }

    clickSubmitHandler = ( event ) => {
        event.preventDefault();
       
        if( !this.state.singerNameValid ) {
            return null;
        }

        const body = {
            ...this.state.selectedSong,
            RequestID: this.state.requestId,
            Singer: this.state.singerName,
            State: "pending",
            CompletedDateTime: 0
        }

        this.setState({ 
            showRequestSlip: false,
            sendingRequest: true
        });

        const errorMessage = (
            <div style={ { textAlign: "center"} }>
                <h3>Failed to Submit Request</h3>
                <br/>
                <h4>Please try again</h4>
                <p>If problem persists please contact the DJ</p>
            </div>
        );

        axios.post('/new-request', body )
            .then( res => {

                this.setState({ sendingRequest: false });   
                if ( res.status === 201 ) {
                    this.requestSuccesshandler();
                } else {
                    this.setState({ showErrorModal: true, errorMessage: errorMessage });
                }   
            })
            .catch( err => {
                this.setState({ showErrorModal: true, errorMessage: errorMessage });   
            });
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
    }

    errorModalCloseHandler = () => {
        this.setState({ 
            showErrorModal: false,
            errorMessage: ""
         }); 
    }

    handleKeyPress = ( event ) => {
        if( event.key === 'Enter' ){
            this.clickSubmitHandler( event );
        }   
    }

    render(){

        let searchResults = (
            <Modal show={ true }>
                <Spinner />
                <p>{ this.state.statusMessage }</p>
            </Modal>
        );

        const list = (
            <List
                id="resultsList" 
                listData={ this.state.filteredResults }
                sortedBy={ this.state.sortKey1 }
                clicked={ this.rowClickHandler }/>
        );

        if ( !this.state.loading ) {
            searchResults = (
                <Aux>
                    <div className={ classes.ListHeader}>
                    <Input
                        elementType="input"
                        value={ this.state.filterValue }
                        elementConfig={ {
                            type: 'text',
                            placeholder: 'Filter'
                        }}
                        changed={ ( event ) => this.filterHandler( event ) }/>
                    <Button
                        btnType={ this.state.filterValue.length < 1 ? "Disabled" : "Danger" }
                        disabled={ this.state.filterValue.length < 1 }
                        clicked={ this.clearFilerHandler }>X</Button>
                        <p>{this.state.filteredResultsCount}/{this.state.searchResultsCount}</p>
                    </div>
                    { list }
                </Aux>    
            ); 
        }

        return (
            <div className={ classes.SearchResults }>
                <RequestSlip 
                    show={ this.state.showRequestSlip }
                    value={ this.state.singerName }
                    reference={ this.singerNameInput }
                    songData={ this.state.selectedSong }
                    elementConfig={ {
                        type: 'text',
                        placeholder: 'Enter between 3 and 30 characters',
                        onKeyPress: this.handleKeyPress,
                        autoFocus: this.showRequestSlip
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
                <Modal
                    show={ this.state.showErrorModal }
                    modalClosed={ this.errorModalCloseHandler }>
                    { this.state.errorMessage }
                </Modal>    
                <RequestSuccess 
                    show={ this.state.requestSuccess }
                    songData={ this.state.selectedSong }
                    singer={ this.state.singerName }
                    timer={ this.state.successNotificationTimeOut }/>

                <div className={ classes.SearchHeader} >
                    <h1>Search Results</h1>
                    <div className={ classes.SearchHeaderRight }>
                        <img className={ classes.Mic } src={ mic } alt='Mic'/>
                        <p>Select a song to submit a request</p>
                    </div>
                </div>
                { searchResults }
            </div>
        );
    }
}

export default errorHandler( SearchResults, axios );