import React from 'react';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './RequestSlip.css';



const requestSlip = ( props ) => (
    <form>
        <h1>Request Slip</h1>
        <div className={ classes.GridItem} >
            <div className={ [ classes.GridItem, classes.ItemA1 ].join(' ')} ><p>Your Name:</p></div>
            <div className={ [ classes.GridItem, classes.ItemB1 ].join(' ')} >
                <Input />
            </div>
            <div className={ [ classes.GridItem, classes.ItemA2 ].join(' ')} ><p>Title:</p></div>
            <div className={ [ classes.GridItem, classes.ItemB2 ].join(' ')} >
                <Input>{ props.Title }</Input>
            </div>
            <div className={ [ classes.GridItem, classes.ItemA3 ].join(' ')} ><p>Artist:</p></div>
            <div className={ [ classes.GridItem, classes.ItemB3 ].join(' ')} >
                <Input>{ props.Artist }</Input>
            </div>
            <div className={ [ classes.GridItem, classes.ItemA4 ].join(' ')} ><p>Disc Ref:</p></div>
            <div className={ [ classes.GridItem, classes.ItemB4 ].join(' ')} >
                <Input>{ props.DiscRef }</Input>
            </div>
            <div className={ [ classes.GridItem, classes.ItemC4 ].join(' ')} ><p>Length:</p></div>
            <div className={ [ classes.GridItem, classes.ItemD4 ].join(' ')} >
                <Input>{ props.Length }</Input>
            </div>
            <div className={ [ classes.GridItem, classes.ItemE4 ].join(' ')} ><p>Key:</p></div>
            <div className={ [ classes.GridItem, classes.ItemF4 ].join(' ')} >
                <Input>{ props.Key }</Input>
            </div>
            <div className={ classes.CenterButtons}>
                <Button />
                <Button />
            </div>
        </div>
    </form>
);

export default requestSlip;