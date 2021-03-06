import React, { Component } from 'react';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Ticker from '../../components/Ticker/Ticker';
import axios from '../../axios-search';
import errorhandler from '../withErrorHandler/withErrorHandler';

class Layout extends Component {

    state = {
        showSideDrawer: false,
        showTicker: true,
        refreshTimer: 180,
        tickerValue: []
    }

    componentDidMount() {
        this.getRequestUpdates();
        let timeleft = this.state.refreshTimer ;

        this.poll = setInterval( () => {
            timeleft--;

            if ( timeleft <= 0 ) {
                this.getRequestUpdates();
                timeleft = this.state.refreshTimer ;
            }
        },1000);
    }

    componentWillUnmount() {
        clearInterval( this.poll );
        this.unmounted = true;
    }

    getRequestUpdates() {
        axios.get('/submitted-requests')
            .then( res => {
                if (this.unmounted) return;
                const requests = res.data.map( req =>{
                    return req.Title + " in the style of " + req.Artist; 
                });
                this.setState( { 
                    tickerValue: this.shuffle( requests )
                });
            })
            .catch( err => console.log( err ) );
      
    }

    shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false} )
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render (){ 
        let ticker = null;

        // Remove ticker if in djMode or there are no requests
        if ( !this.props.djMode && this.state.tickerValue.length > 2 ) {
            ticker =<Ticker 
                string={ this.state.tickerValue.join( ' -♦- ' ) } 
                scrollSpeed ={ this.state.tickerValue.length * 3 }/>;
        }

        return (
            <React.Fragment>
                <Toolbar 
                    drawerToggleClicked={ this.sideDrawerToggleHandler }
                    djMode={ this.props.djMode }
                    clicked={ this.props.clicked }/>
                <SideDrawer 
                    djMode={ this.props.djMode }
                    closed={ this.sideDrawerClosedHandler } 
                    open={ this.state.showSideDrawer }/>
                <main className={ classes.Content }>
                    { this.props.children }
                </main>
                {ticker}
            </React.Fragment>
        )
    }
}

export default errorhandler( Layout, axios );