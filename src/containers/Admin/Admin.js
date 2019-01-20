import React, { Component } from 'react';
import classes from './Admin.css';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';

class Admin extends Component {

    state = {
        showSpinner: false,
        databaseLocations: [ "/path/path/path", "path/path"],
        databaseEntries: 100,
        ipAddress: "10.19.11.6"
    }

    componentWillMount(){
        // api call to get the admin database
    }

    render() {

        let databasePaths = null;
        let i = -1;
        if ( this.state.databaseLocations.length > 0 ) {
            databasePaths = this.state.databaseLocations.map( path => {
                i++;
                return ( 
                    <div
                        key={i} 
                        className={ classes.PathRow }>
                        <div className={ classes.ReadOnlyBox }>{ path }</div>
                        <Button
                            btnType="Danger">X</Button>
                    </div>
                );
            });
        }

        return (
            <div className={ classes.Admin }>
                <Modal show={ this.state.showSpinner }>
                    <Spinner />
                </Modal>
                <h1>Admin</h1>
                <div className={ classes.Box }>
                    <Button
                        btnType="Success">Clear Requests</Button>
                    <Button
                        btnType="Success">Reload Database</Button>
                </div>
                <div className={ classes.Box }>
                    <h2>Database Location(s):</h2>
                    { databasePaths }
                    <Button
                        btnType="Success">Add</Button>
                </div>
                <div className={ classes.Box }>
                    <div style={ { display: "flex" }}>
                        <div><h2>IP Address</h2></div>
                        <div className={ classes.ReadOnlyBox }>{ this.state.ipAddress }</div>
                    </div>
                    <div style={ { display: "flex" }}>
                        <div><h2>Songs in Database</h2></div>
                        <div className={ classes.ReadOnlyBox }>{ this.state.databaseEntries }</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin;