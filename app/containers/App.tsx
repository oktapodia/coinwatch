import React from 'react';
import Tray from '../modules/tray';
import Navbar from '../components/Navbar';
import Modal from '../modules/modal/containers/Modal';

const App = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Tray />
    <Modal />
  </>
);

export default App;
