import React from 'react';
import { connect } from 'react-redux';
import CheckoutForm from '../../components/CheckoutForm';
import CartList from '../../components/CartList';
import InfoTable from '../../components/InfoTable';

const Checkout = ({ tableData }) => {
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-5 mb-3">
            <div className="card card-body border-primary">
              <CheckoutForm />
            </div>
          </div>

          <div className="col-12 col-lg-7 mb-3">
            <div className="card card-body border-primary mb-3">
              <h2>Информация:</h2>
              <InfoTable data={tableData} />
            </div>

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

const mapStateToProps = (state) => {
  const totalPrice = Object.values(state.cart.list).reduce((prev, cartItem) => {
    const product = Object.values(state.product.list)
      .find((product) => product.id === cartItem.id)
    const price = product ? product.price : 0;
    return prev + cartItem.quantity * price;
  }, 0);

  const productsCount = Object.values(state.cart.list)
    .reduce((prev, cartItem) => {
      return prev + cartItem.quantity;
    }, 0);

  const tableData = {
    "Сумма": `${totalPrice.toFixed(2)} ₴`,
    "Всего товаров": productsCount,
    "Позиций товаров": Object.values(state.cart.list).length,
  };

  return {
    tableData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
