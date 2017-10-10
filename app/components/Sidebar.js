// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <nav className="sidebar">
        <div className="text-left">
          Coin Watch
        </div>
        <div className="text-right">
          <Link to="/settings"><span className="glyphicon glyphicon-cog" aria-hidden="true" /></Link>
        </div>
      </nav>
    );
  }
}

export default Sidebar;
