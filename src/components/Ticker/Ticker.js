import React from 'react';
import classes from './Ticker.css';

const ticker = ( props ) => {

  const stringLength = props.string.length;
  const scrollSpeed = Math.ceil( stringLength / 20) * 3;

  const style = {
    animationDuration: scrollSpeed + 's'
  }
  
  
  return (
    <div className={ classes.Ticker }>
        <p className={ classes.Marquee } style={ style }>
          <span>Requested: { props.string }</span>
        </p>
    </div>
  );

};

export default ticker