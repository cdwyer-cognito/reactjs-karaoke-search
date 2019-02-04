import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Search.css';

class Search extends Component {

    constructor( props ) {
        super(props);
        this.state = {
            inputConfig: {
                type: 'text',
                placeholder: 'Enter 3 characters or more'
            },
            searchValue: '',
            searcByValue: 'both',
            inputValid: false,
            inputTouched: false,
            formIsValid: false,
            radioButtons: [ false, false, true ],
            radioButtonValues: ['artist', 'title', 'both'] 
        }

        this.textInput = React.createRef();
    }

    componentDidMount() {
        this.textInput.current.focus();
      }
       
    searchHandler = () => {

        if ( !this.state.formIsValid ){
            this.setState( { inputValid: false, inputTouched: true } )
            return null;
        }

        this.setState( { loading: true } );
        let searchByValue = '';
        let i = 0;
        for ( let bool of this.state.radioButtons ) {
            if ( bool ) {
                searchByValue = this.state.radioButtonValues[ i ];
            }
            i++;
        }

        this.props.history.push({
            pathname: '/search-results',
            search: '?searchby=' + searchByValue + '&value=' + encodeURIComponent(this.state.searchValue) + '&browse=false'
        })
    }

    inputChangedHandler( event ) {
        const value = event.target.value

        this.setState( { searchValue: value, inputTouched: true } );

        const formIsValid = value.trim().length >= 3;
        this.setState( { inputValid: formIsValid && this.state.inputTouched } );
        this.setState( { formIsValid: formIsValid } );
   
    }

    radioButtonGroupColour( index ) {
        if ( this.state.radioButtons[ index ] ) {
            return "Selected";
        }

        return null;
    }

    radioButtonGroupHandler = ( index ) => {
        let radioButtons = [false, false, false ];
        radioButtons.splice(index, 1, true);

        this.setState( { radioButtons: radioButtons } );
    }

    clearHandler = () => {
        this.setState( {
            searchValue: '',
            inputValid: false,
            inputTouched: false,
            formIsValid: false
            } );
    }

    handleKeyPress = ( event ) => {
        if( event.key === 'Enter' ){
            this.searchHandler();
        }   
    }

    render () {
        return (
            <div className={ classes.Search }>
                <div>
                    <h1>Search</h1>
                    <Input 
                        key="searchInput"
                        elementType="input"
                        elementConfig={ { ...this.state.inputConfig, onKeyPress: this.handleKeyPress } } 
                        reference={this.textInput}
                        value={ this.state.searchValue }
                        invalid={ !this.state.inputValid }
                        touched={ this.state.inputTouched }
                        shouldValidate={ true }
                        changed={ ( event ) => this.inputChangedHandler( event ) } />
                    <Button 
                        btnType={ this.radioButtonGroupColour( 0 ) } 
                        clicked={ () => this.radioButtonGroupHandler( 0 )}>By Artist</Button>
                    <Button 
                        btnType={ this.radioButtonGroupColour( 1 ) } 
                        clicked={ () => this.radioButtonGroupHandler( 1 )}>By Title</Button>
                    <Button 
                        btnType={ this.radioButtonGroupColour( 2 ) } 
                        clicked={ () => this.radioButtonGroupHandler( 2 )}>Both</Button>
                    <div>
                        <Button
                            btnType="Danger"
                            clicked={ this.clearHandler }>Clear</Button>
                        <Button
                            disabled={ !this.state.formIsValid }
                            btnType={ this.state.formIsValid ? "Success" : "Disabled" }
                            clicked={ this.searchHandler }>Submit</Button>
                    </div>
                </div>
            </div> 
        )
    }

}

export default withRouter( Search );