import React, { Component } from 'react';
import classes from './Admin.css';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-search';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Button from '../../components/UI/Button/Button';

class Admin extends Component {

    state = {
        showSpinner: false,
        showSuccessModal: false,
        successMessage: "",
        databaseEntries: 0,
        vdjDatabasePaths: []
    }

    componentDidMount(){
        this.postAdminCall({
            loadAdmin: true
        } );
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    postAdminCall = ( body ) => {
        axios.post('/admin-task', body)
            .then( res => {
                if (this.unmounted) return;
                let successMessage = "";
                let showSuccessModal = false;
                if ( res.status === 200 && body.reloadDatabase ) {
                    successMessage = "Successfully reloaded karaoke songs database";
                    showSuccessModal = true;
                }

                if ( res.status === 200 && body.clearRequests ) {
                    successMessage = "Successfully deleted entries from the requests database";
                    showSuccessModal = true;
                }

                if ( res.status === 200 && body.loadAdmin ){
                    this.setState({
                        databaseEntries: res.data.songCount,
                        vdjDatabasePaths: res.data.vdjDbPaths
                    });
                }

                this.setState( { 
                    successMessage: successMessage,
                    showSuccessModal: showSuccessModal 
                } );
            })
            .catch(err => console.log( err ));
    }

    clearRequestsHandler = () => {
        this.postAdminCall({
            clearRequests: true
        });
    }

    reloadDatabasesHandler = () => {
        this.postAdminCall({
            reloadDatabase: true
        });
    }

    closeModalhandler = () => {
        this.setState( { 
            showSuccessModal: false, successMessage: "" 
        } );

        this.postAdminCall({
            loadAdmin: true
        } );
    }

    render() {

        let vdjFilepaths = null;

        if ( this.state.vdjDatabasePaths.length > 0 ) {
            vdjFilepaths = this.state.vdjDatabasePaths.map( (obj, index ) => {
                return (
                    <div key={index} className={ classes.FilepathBox }>
                        <div className={ classes.ReadOnlyBox }>{obj.filepath}</div>
                        <div className={ classes.FilepathStatus }>{ obj.connected ? "Connected" : "Disconnected"}</div>
                    </div>
                )
            });
        }

        return (
            <div className={ classes.Admin }>
                <Modal 
                    show={ this.state.showSuccessModal }
                    modalClosed={ this.closeModalhandler }>
                    <p>{ this.state.successMessage }</p>
                </Modal>
                <Modal show={ this.state.showSpinner }>
                    <Spinner />
                </Modal>
                <h1>Admin</h1>
                <div className={ classes.Box } style={{textAlign: "left"}}>
                    <div>Total Searchable Karaoke Songs in Database: { this.state.databaseEntries }</div>
                </div>
                <div className={ classes.Box } style={{textAlign: "left"}}>
                    <div><h2>VirtualDJ Database Filepaths</h2></div>
                    <div>
                        { vdjFilepaths }
                    </div>
                    <p>NOTE: Reloading the Database will only load from Connected Databases</p>
                    <p>You can add new VDJ database files by adding them to the paths file</p>
                </div>
                <div className={ classes.Box }>
                    <Button
                        clicked={ this.clearRequestsHandler }
                        btnType="Success">Clear Requests</Button>
                    <Button
                        clicked={ this.reloadDatabasesHandler }
                        btnType="Success">Reload Database</Button>
                </div>
            </div>
        )
    }
}

export default errorHandler( Admin, axios );