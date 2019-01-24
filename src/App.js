import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';

import Layout from './hoc/Layout/Layout';
import Search from './containers/Search/Search';
import Browse from './containers/Browse/Browse';
import Home from './containers/Home/Home';
import SearchResults from './containers/SearchResults/SearchResults';
import Requests from './containers/Requests/Requests';
import Admin from './containers/Admin/Admin';

class App extends Component {

  state = {
    djMode: true
  }

  djModeHandler = ( bool ) => {
    this.setState( { djMode: bool } );
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/search" component={ Search }/>
        <Route path="/browse/by-artist" render={ ( props ) => ( 
          <Browse 
            browseBy="artist"
            {...props }/>)}/>
        <Route path="/browse/by-title" render={ ( props ) => ( 
          <Browse 
            browseBy="title"
            {...props }/>)}/>
        <Route path="/search-results" component={ SearchResults } />
        <Route path="/" component={ Home } />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.state.djMode ) {
      routes = (
        <Switch>
          <Route path="/requests" component={ Requests }/>  
          <Route path="/search" component={ Search }/>
          <Route path="/browse/by-artist" render={ ( props ) => ( 
            <Browse 
              browseBy="artist"
              {...props }/>)}/>
          <Route path="/browse/by-title" render={ ( props ) => ( 
            <Browse 
              browseBy="title"
              {...props }/>)}/>
          <Route path="/search-results" component={ SearchResults } />
          <Route path="/admin" component={ Admin } />
          <Route path="/" component={ Home } />
        </Switch>
      );

    }

    return (
      <div className="App">
        <Layout 
          djMode={ this.state.djMode } >
          { routes }
        </Layout>
      </div>
    );
  }
}

export default withRouter( App );
