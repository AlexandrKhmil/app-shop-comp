import React from 'react';
import CheckoutForm from '../../components/CheckoutForm';
import CartList from '../../components/CartList';

const Checkout = () => {
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card card-body border-primary">
              <CheckoutForm />
            </div>
          </div>

          <div className="col-8">
            <div className="card card-body border-primary">
              <h2>Корзина:</h2>
              <CartList />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
