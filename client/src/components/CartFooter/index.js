import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';

const CartFooter = ({ totalPrice }) => (
  <div>
    <div className={`border-bottom d-flex justify-content-between align-items-center px-3 mb-3 ${styles.row}`}>
      <span>Total price:</span>
      <span>{totalPrice.toFixed(2)} ₴</span>
    </div>
    <button
      className="btn btn-primary btn-lg btn-block">
      Place order
    </button>
  </div> 
);

const mapStateToProps = (state) => {
  const totalPrice = Object.values(state.cart.list)
    .reduce((prev, cartItem) => {
      const price = Object.values(state.product.list)
        .find((product) => product.id === cartItem.id).price;
      return prev + cartItem.quantity * price;
    }, 0);
  return {
    totalPrice,
  };
};

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CartFooter);
