import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div className="loading-container">
      <div className="loading"></div>
      <div id="loading-text">SENDING..</div>
    </div>
  );
};

export default Loader;
