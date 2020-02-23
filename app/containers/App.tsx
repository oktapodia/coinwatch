import React from 'react';
import Tray from '../modules/tray';
import Navbar from '../components/Navbar';
import Modal from '../modules/modal/containers/Modal';

const App = ({ children }) => (
  <div className="app-container">
    <Navbar />
    <div className="main-container">
      {children}
    </div>
    <Tray />
    <Modal />
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
