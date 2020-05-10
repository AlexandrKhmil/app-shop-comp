import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { cartClearProducrt } from '../../actions/cart';
import styles from './styles.module.css';

const CartList = ({ list, cartClearProducrt }) => {
  if (list.length === 0) {
    return (
      <div className={styles.cartBody}>
        Ваша корзина пуста
      </div>
    );
  }

  return (
    <div className={styles.cartBody}>
      {list.map((product) => 
        <div 
          className="card card-body flex-row align-items-start mb-3"
          key={product.id}>
          <button 
            className={`btn btn-danger d-flex justify-content-center align-items-center p-1 ${styles.remove}`}
            onClick={() => cartClearProducrt(product.id)}>
            &times;
          </button>
          <NavLink 
            className="d-flex justify-content-center align-items-center" 
            to={product.link}>
            <img 
              className={styles.img} 
              src={product.img_url} 
              alt="Cart Product" />
          </NavLink> 
          <div className="ml-3 mr-4">
            <NavLink to={product.link}>
              <h5>{product.title}</h5>
            </NavLink>
            <div>
              <span>{product.price} ₴</span>
              <span> * </span>
              <span>{product.quantity} шт.</span>
              <span> = </span>
              <span>{(product.price * product.quantity).toFixed(2)} ₴</span>
            </div>
          </div>  
        </div>
      )} 
    </div>
  );
};

const mapStateToProps = (state) => {
  const products = Object.values(state.product.list);
  const list = Object.values(state.cart.list).map((cartItem) => {
    return {
      ...products.find((product) => product.id === cartItem.id),
      quantity: cartItem.quantity, 
    };
  });
  return { list, };
};

const mapDispatchToProps = (dispatch) => ({
  cartClearProducrt: (value) => dispatch(cartClearProducrt(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
