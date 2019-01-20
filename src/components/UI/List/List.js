import React from 'react';

import ListRow from './ListRow/ListRow';
import classes from './List.css';

const list = ( props ) => {

    let rowItem = (
        <div style={ { textAlign: "center" } }>There are no results to show</div>
    )

    if ( props.listData.length > 0 ) {
        rowItem = props.listData.map( songData => {
            return (
                <ListRow
                    key={ props.listType ? songData.RequestID : songData.UID }
                    songData={ songData }
                    sortedBy={ props.sortedBy }
                    listType={ props.listType }
                    clicked={ () => props.clicked( props.listType ? songData.RequestID : songData.UID )}/>
            );
        });
    }


    return (
        <div className={ classes.List } >
            <ul>
                { rowItem }
            </ul>
        </div>
    );

}

export default list;