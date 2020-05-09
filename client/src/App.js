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
import Modal from './containers/Modal';
import Login from './components/Login';
import Registration from './components/Registration';
import CartList from './components/CartList';
import CartFooter from './components/CartFooter';
import { authUser } from './actions/account';
import { categoryGetList } from './actions/category';
import { tagGetList } from './actions/tag';
import { productGetList } from './actions/product';
import { 
  modalLoginClose, 
  modalRegClose, 
  modalCartClose 
} from './actions/modal';

import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Product from './pages/Product';

const App = ({ 
    accountToken,
    accountIsAuth,
    accountAuth,

    categoryIsLoading,
    categoryIsLoaded,
    categoryGetList,

    tagIsLoading,
    tagIsLoaded,
    tagGetList,
    
    productIsLoading,
    productIsLoaded,
    productGetList,

    modalLoginIsOpen, 
    modalLoginClose,
    modalRegIsOpen,
    modalRegClose,
    modalCartIsOpen,
    modalCartClose,
  }) => {
  useEffect(() => {
    if(accountToken && !accountIsAuth) accountAuth(accountToken);
  }, [accountToken, accountIsAuth, accountAuth]);
  useEffect(() => {
    if(!categoryIsLoading && !categoryIsLoaded) categoryGetList();
  }, [categoryIsLoading, categoryIsLoaded, categoryGetList]);
  useEffect(() => {
    if(!tagIsLoading && !tagIsLoaded) tagGetList();
  }, [tagIsLoading, tagIsLoaded, tagGetList]);
  useEffect(() => {
    if(!productIsLoading && !productIsLoaded) productGetList();
  }, [productIsLoading, productIsLoaded, productGetList]);

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
          <Route path="/product/:link" component={Product} />
        </Switch>
      </Router>
    </AlertProvider>
  );
};

const mapStateToProps = (state) => ({
  accountToken: state.account.token,
  accountIsAuth: state.account.isAuth,

  categoryIsLoading: state.category.isLoading,
  categoryIsLoaded: state.category.isLoaded,

  tagIsLoading: state.tag.isLoading,
  tagIsLoaded: state.tag.isLoaded,

  productIsLoading: state.product.isLoading,
  productIsLoaded: state.product.isLoaded,

  modalLoginIsOpen: state.modal.login.isOpen,
  modalRegIsOpen: state.modal.registration.isOpen,
  modalCartIsOpen: state.modal.cart.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  accountAuth: (value) => dispatch(authUser(value)), 
  categoryGetList: () => dispatch(categoryGetList()),
  tagGetList: () => dispatch(tagGetList()),
  productGetList: (value) => dispatch(productGetList(value)),
  modalLoginClose: () => dispatch(modalLoginClose()),
  modalRegClose: () => dispatch(modalRegClose()),
  modalCartClose: () => dispatch(modalCartClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);