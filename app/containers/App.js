// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import Tray from '../modules/tray';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import '../styles/index.scss';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div className="app-container">
        <Navbar />
        <div className="main-container">
          {this.props.children}
        </div>
        <footer>
          Footer
          <Tray />
        </footer>
      </div>
    );
  }
}
