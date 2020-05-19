import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { modalCartClose } from '../../actions/modal';
import styles from './styles.module.css';

const CartFooter = ({ totalPrice, modalCartClose }) => (
  <div>
    <div className={`border-bottom d-flex justify-content-between align-items-center px-3 mb-3 ${styles.row}`}>
      <span>Total price:</span>
      <span>{totalPrice.toFixed(2)} ₴</span>
    </div>
    <NavLink
      className="btn btn-primary btn-lg btn-block"
      onClick={modalCartClose}
      to="/checkout">
      Go to Checkout
    </NavLink>
  </div> 
);

const mapStateToProps = (state) => {
  const totalPrice = Object.values(state.cart.list).reduce((prev, cartItem) => {
    const product = Object.values(state.product.list)
      .find((product) => product.id === cartItem.id)
    const price = product ? product.price : 0;
    return prev + cartItem.quantity * price;
  }, 0);
  return {
    totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => ({
  modalCartClose: () => dispatch(modalCartClose()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartFooter);
