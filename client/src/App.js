import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './containers/Header';
import Home from './pages/Home';
import Modal from './containers/Modal';
import Login from './components/Login';
import Registration from './components/Registration';
import { modalLoginClose, modalRegClose } from './actions/modal';

const App = (
  { 
    modalLoginIsOpen, 
    modalLoginClose,
    modalRegIsOpen,
    modalRegClose,
  }) => {
  return (
    <Router>
      <Header />
      <Modal 
        isOpen={modalLoginIsOpen} 
        close={modalLoginClose} 
        title={'Login'}>
        <Login />
      </Modal>
      <Modal 
        isOpen={modalRegIsOpen} 
        close={modalRegClose} 
        title={'Registration'}>
        <Registration />
      </Modal>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  modalLoginIsOpen: state.modal.login.isOpen,
  modalRegIsOpen: state.modal.registration.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  modalLoginClose: () => dispatch(modalLoginClose()),
  modalRegClose: () => dispatch(modalRegClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);