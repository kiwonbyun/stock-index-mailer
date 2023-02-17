import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div class="loading-container">
      <div class="loading"></div>
      <div id="loading-text">SENDING..</div>
    </div>
  );
};

export default Loader;
