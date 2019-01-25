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
        databaseEntries: 100,
        ipAddress: "10.19.11.6"
    }

    componentWillMount(){

    }

    postAdminCall = ( body ) => {
        axios.post('/admin-task', body)
            .then( res => {
                let successMessage = "";
                if ( res.status === 200 && body.reloadDatabase ) {
                    successMessage = "Successfull reloaded karaoke songs database";
                }

                if ( res.status === 200 && body.clearRequests ) {
                    successMessage = "Successfull deleted entries from the requests database";
                }

                this.setState( { 
                    successMessage: successMessage,
                    showSuccessModal: true 
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
    }

    render() {

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
                <div className={ classes.Box }>
                    <Button
                        clicked={ this.clearRequestsHandler }
                        btnType="Success">Clear Requests</Button>
                    <Button
                        clicked={ this.reloadDatabasesHandler }
                        btnType="Success">Reload Database</Button>
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

export default errorHandler( Admin, axios );