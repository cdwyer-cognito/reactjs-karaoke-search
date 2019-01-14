import React from 'react';

import classes from './ListRow.css';

const listRow = ( props ) => {

    let topRow = (
        <div className={ classes.TopRow }>
            <div className={ classes.TopRowLeft } ><strong>Artist:  </strong>{ props.songData.Artist}</div>
            <div className={ classes.TopRowRight } ><strong>Title:  </strong>{ props.songData.Title}</div>
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
    
    return (
        <li className={ classes.ListRow } onClick={ props.clicked }>
            { topRow }
            <div className={ classes.BottomRow }>
                <div className={ classes.BottomRowLeft }><strong>DiscRef:  </strong>{ props.songData.DiscRef }</div>
                <div className={ classes.BottomRowCenter }><strong>Key:  </strong>{ props.songData.Key }</div>
                <div className={ classes.BottomRowRight }><strong>Length:  </strong>{ props.songData.Length }</div>
            </div>
        </li>
    );
};

export default listRow;