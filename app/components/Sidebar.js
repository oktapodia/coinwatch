// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <nav className="sidebar">
        <div className="title">
          <h1>Coin Watch</h1>
        </div>
        <div className="content">
          <Link to="/settings"><span className="glyphicon glyphicon-cog" aria-hidden="true" /></Link>
        </div>
      </nav>
    );
  }
}

export default Sidebar;
