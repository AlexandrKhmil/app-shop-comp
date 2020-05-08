import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  positions, 
  transitions,
  Provider as AlertProvider 
} from 'react-alert';
import Alert from './containers/Alert';
import AlertTemplate from './components/AlertTemplate';
import Header from './containers/Header';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Modal from './containers/Modal';
import Login from './components/Login';
import Registration from './components/Registration';
import CartList from './components/CartList';
import CartFooter from './components/CartFooter';
import { authUser } from './actions/account';
import { getProductList } from './actions/product';
import { 
  modalLoginClose, 
  modalRegClose, 
  modalCartClose 
} from './actions/modal';

const App = (
  { 
    token,
    isAuth,
    authUser,
    isLoading,
    isLoaded,
    getProductList,
    modalLoginIsOpen, 
    modalLoginClose,
    modalRegIsOpen,
    modalRegClose,
    modalCartIsOpen,
    modalCartClose,
  }
) => {
  useEffect(() => {
    if(token && !isAuth) authUser(token);
  }, [token, isAuth, authUser]);
  useEffect(() => {
    if(!isLoaded && !isLoading) getProductList();
  }, [isLoading, isLoaded, getProductList]);

  const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    transition: transitions.FADE,
    containerStyle: {
      zIndex: 1070,
    },
  };

  return (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Router>
        <Header />
        <Alert />
        <Modal 
          className="w-100"
          isOpen={modalLoginIsOpen} 
          close={modalLoginClose} 
          title="Login">
          <Login />
        </Modal>
        <Modal 
          className="w-100"
          isOpen={modalRegIsOpen} 
          close={modalRegClose} 
          title="Registration">
          <Registration />
        </Modal>
        <Modal 
          className="h-100 m-0 ml-auto"
          classNameContent="h-100"
          classNameBody="overflow-auto"
          isOpen={modalCartIsOpen}
          close={modalCartClose}
          title="Cart"
          Footer={CartFooter}>
          <CartList />
        </Modal>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </Router>
    </AlertProvider>
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
  isAuth: state.account.isAuth,
  isLoading: state.product.isLoading,
  isLoaded: state.product.isLoaded,
  modalLoginIsOpen: state.modal.login.isOpen,
  modalRegIsOpen: state.modal.registration.isOpen,
  modalCartIsOpen: state.modal.cart.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  authUser: (value) => authUser(value)(dispatch),
  getProductList: (value) => getProductList(value)(dispatch),
  modalLoginClose: () => dispatch(modalLoginClose()),
  modalRegClose: () => dispatch(modalRegClose()),
  modalCartClose: () => dispatch(modalCartClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);