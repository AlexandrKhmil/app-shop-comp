import React, { useState } from 'react';
import { connect } from 'react-redux';

const CheckoutForm = ({ isLoading }) => {
  const [city, setCity] = useState('');
  return (
    <form>
      <div className="form-group">
        <label htmlFor="city">Город:</label>
        <input
          className="form-control"
          type="text" 
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)} />
      </div>
      <div className="form-group">
        <button
          className="btn btn-primary d-flex 
          justify-content-between align-items-center"
          disabled={isLoading} >
          {isLoading && 
            <span 
              className="spinner-border spinner-border-sm mr-2"
              role="status"
              aria-hidden="true">
            </span>
          }
          {!isLoading ? 'Оформить заказ' : 'Loading'}
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  isLoading: false,
});

const mapDispatchToProps = (state) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

/*
  ФИО
  Город
  Мобильный телефон
  Электронная почта
*/

/*
  Самовывоз или курьер
  Оплата картой или при получении
*/