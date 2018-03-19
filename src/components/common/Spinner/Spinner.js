import React from 'react';
import './Spinner.scss';

const Spinner = (props) => {
  let cn = "sk-circle " + props.color + "-circle";
  let size = props.size + "px";
  return(
    <div
      className={cn}
      style={{width: size, height: size}}
      >
      <div className="sk-circle1 sk-child"></div>
      <div className="sk-circle2 sk-child"></div>
      <div className="sk-circle3 sk-child"></div>
      <div className="sk-circle4 sk-child"></div>
      <div className="sk-circle5 sk-child"></div>
      <div className="sk-circle6 sk-child"></div>
      <div className="sk-circle7 sk-child"></div>
      <div className="sk-circle8 sk-child"></div>
      <div className="sk-circle9 sk-child"></div>
      <div className="sk-circle10 sk-child"></div>
      <div className="sk-circle11 sk-child"></div>
      <div className="sk-circle12 sk-child"></div>
    </div>
  );
}

export default Spinner;
