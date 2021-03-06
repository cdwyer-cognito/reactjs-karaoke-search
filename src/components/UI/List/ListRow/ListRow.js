import React from 'react';

import classes from './ListRow.css';

import { timeString } from '../../../../utils/dateTime';

const listRow = ( props ) => {

    let topRow = (
        <div className={ classes.TopRow }>
            <div className={ classes.TopRowLeft } ><strong>Artist:  </strong>{ props.songData.Artist}</div>
            <div className={ classes.TopRowRight } ><strong>Title:  </strong>{ props.songData.Title}</div>
        </div>
    );

    let bottomRow = (
        <div className={ classes.BottomRow }>
            <div className={ classes.BottomRowLeft }><strong>Ref:  </strong>{ props.songData.DiscRef }</div>
            <div className={ classes.BottomRowRight }>
                <div className={ classes.BottomRowRightA }><strong>Key:  </strong>{ props.songData.Key }</div>
                <div className={ classes.BottomRowRightB}><strong>Length:  </strong>{ props.songData.Length }</div>
            </div>
        </div>
    );

    if ( props.sortedBy === "Title" ) {
        topRow = (
            <div className={ classes.TopRow }>
                <div className={ classes.TopRowLeft } ><strong>Title:  </strong>{ props.songData.Title}</div>
                <div className={ classes.TopRowRight }><strong>Artist:  </strong>{ props.songData.Artist}</div>
            </div>
        );
    }

    if ( props.listType ) {
        topRow = (
            <div className={ classes.TopRow }>
                <div className={ classes.TopRowLeft } ><strong>{ props.listType === "completed" ? timeString( props.songData.CompletedDateTime ) : timeString( props.songData.DateTime ) }</strong></div>
                <div className={ classes.TopRowRight } ><strong>Singer:  </strong>{ props.songData.Singer}</div>
            </div>
        );

        bottomRow = (
            <div className={ classes.BottomRow }>
                <div className={ classes.BottomRowLeft }><strong>Ref/Title:  </strong>{ props.songData.DiscRef } { props.songData.Title }</div>
                <div className={ classes.BottomRowRight }>
                    <div className={ classes.BottomRowRightA }><strong>Artist:  </strong>{ props.songData.Artist }</div>
                    <div className={ classes.BottomRowRightB}><strong>Length:  </strong>{ props.songData.Length }</div>
                </div>
            </div>
        );
    }
    
    return (
        <li className={ classes.ListRow } onClick={ props.clicked }>
            { topRow }
            { bottomRow }
        </li>
    );
};

export default listRow;