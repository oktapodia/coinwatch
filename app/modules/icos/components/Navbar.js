// @flow
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="tabs">
          <NavLink to="/icos/live" className="tab">Live</NavLink>
          <NavLink to="/icos/upcoming" className="tab">Upcoming</NavLink>
          <NavLink to="/icos/finished" className="tab">Finished</NavLink>
        </div>
      </div>
    );
  }
}

export default Navbar;
