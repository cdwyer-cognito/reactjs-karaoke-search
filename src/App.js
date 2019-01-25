import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';
import axios from './axios-search';
import errorHandler from './hoc/withErrorHandler/withErrorHandler';

import Layout from './hoc/Layout/Layout';
import Search from './containers/Search/Search';
import Browse from './containers/Browse/Browse';
import Home from './containers/Home/Home';
import SearchResults from './containers/SearchResults/SearchResults';
import Requests from './containers/Requests/Requests';
import Admin from './containers/Admin/Admin';
import Login from './components/Login/Login';

import { sha256 } from './utils/sha256';

class App extends Component {

  state = {
    djMode: false,
    clicks: 0,
    showLogin: false,
    passwordString: ""
  }

  logInHandler = ( ) => {

    const password = this.state.passwordString;

    if ( password.length <= 0 ) {
      return null;
    }
    
    this.setState( {
      showLogin: false,
      passwordString: ""
    })

    const hash = sha256( password );

    axios.post('/admin-task', {
      login: true,
      value: hash
    })
      .then( res => {
        if ( res.status === 200 ) {
          this.setState( { 
            djMode: true,
          });
        }
      })
      .catch( err => console.log( err ));
  }

  logOutHandler = ( ) => {
    this.setState( { 
      djMode: false, 
      showLogin: false,
      passwordString: ""
    } );
  }

  clickedCancelHandler = () => {
    this.setState( { 
      showLogin: false, 
      passwordString: "" 
    } );
  }

  passwordOnChangeHandler = ( event ) => {
    this.setState({passwordString: event.target.value })
  }

  logoClickHandler = () => {
    const clicks = this.state.clicks;

    if ( clicks >= 8 ) {
      this.setState( { 
        showLogin: true, 
        clicks: 0,
        passwordString: ""
      });
      clearTimeout( this.debounce );
    } else {
      this.setState( { clicks: clicks + 1 });
    }

    if ( clicks === 0 ) {
      this.debounce = setTimeout( ()=>{
        this.setState( { clicks: 0 });
      }, 3000 );
    }
  }

  handleKeyPress = ( event ) => {
    if( event.key === 'Enter' ){
        this.logInHandler();
    }   
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
        <Login 
          show={ this.state.showLogin }
          onKeyPress={ this.handleKeyPress }
          changed={ (event) => this.passwordOnChangeHandler(event) }
          value={ this.state.passwordString }
          clickedCancel={ this.clickedCancelHandler }
          clickedLogOut={ this.logOutHandler }
          clickedLogIn={ this.logInHandler }
          djMode={ this.state.djMode } />
        <Layout 
          djMode={ this.state.djMode }
          clicked={ this.logoClickHandler } >
          { routes }
        </Layout>
      </div>
    );
  }
}

export default errorHandler( withRouter( App ), axios);
