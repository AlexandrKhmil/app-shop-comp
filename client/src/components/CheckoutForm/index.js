import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { messageShow } from '../../actions/message';
import { orderAdd } from '../../actions/order';
import { modalLoginOpen } from '../../actions/modal';
import * as msgType from '../../constants/message-type';

const CheckoutForm = ({ 
  isLoading, 
  userEmail, 
  isEmpty, 
  orderAdd,
  token,
  cart,
  isAuth,
  modalLoginOpen
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const allFilled = Boolean(email && phone && city);

  useEffect(() =>{
    if (userEmail) setEmail(userEmail);
  }, [userEmail]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!allFilled) {
      return messageShow({ type: msgType.MESSAGE_ERROR, text: 'Заполните все поля!' });
    }
    if (isEmpty) {
      return messageShow({ type: msgType.MESSAGE_ERROR, text: 'Ваша корзина пуста!' });
    }
    orderAdd({ token, cart });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          className="form-control"
          type="email" 
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          disabled={true} />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          className="form-control"
          type="phone" 
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="city">Адрес:</label>
        <input
          className="form-control"
          type="text" 
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)} />
      </div>
      <div className="form-group mb-0">
        <button
          className="btn btn-primary d-flex justify-content-between align-items-center"
          disabled={isLoading || isEmpty || !isAuth} >
          {isLoading && 
            <span 
              className="spinner-border spinner-border-sm mr-2"
              role="status"
              aria-hidden="true">
            </span>
          }
          {!isLoading ? 'Оформить заказ' : 'Loading'}
        </button>

        {!isAuth && (
          <div className="d-flex align-items-center flex-wrap mt-3">
            <span className="mr-1">Для того чтобы сделать заказ</span> 
            <button 
              className="btn btn-link p-0" 
              onClick={modalLoginOpen}>
                войдите в систему
            </button>.
          </div>
        )}
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.account.isAuth,
  token: state.account.token,
  isLoading: false,
  userEmail: state.account.email,
  isEmpty: Object.values(state.cart.list).length === 0,
  cart: Object.values(state.cart.list)
    .map((cartItem) => ({ 
      product_id: cartItem.id, 
      quantity: cartItem.quantity 
    })),
});

const mapDispatchToProps = (dispatch) => ({
  orderAdd: (value) => dispatch(orderAdd(value)),
  modalLoginOpen: (value) => dispatch(modalLoginOpen(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
