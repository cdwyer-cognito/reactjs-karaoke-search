import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../components/UI/Input/Input';
import List from '../../components/UI/List/List';
//import RequestSlip from '../../components/RequestSlip/RequestSlip';

import axios from '../../axios-search';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './SearchResults.css';

class SearchResults extends Component {

    state = {
        inputConfig: {
            type: 'text',
            placeholder: 'Filter'
        },
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
        selectedSong: {},
        showRequestSlip: false,
        loading: false
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
        .catch( err => {
            // TBD - error handeling in the UI

        });
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

    findSondData = ( id ) => {
        for( let songData of this.state.searchResults ) {
            if ( songData.UID === id ) {
                return songData;
            }
        }
    }

    rowClickHandler = ( id ) => {
        
        const selectedSong = this.findSondData( id );

        this.setState( { 
            selectedSong: selectedSong,
            showRequestSlip: true
        });

        console.log( 'Selected Song', selectedSong );

        
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
                        elementConfig={ this.state.inputConfig }
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
                <h1>Search Results</h1>
                { searchResults }
            </div>
        );
    }
}

export default errorHandler( SearchResults, axios );