import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { orderGetList } from '../../actions/order';
import { dateTimeFormat } from '../../functions';

const UserPage = ({ isAuth, token, list, orderGetList }) => { 
  useEffect(() => {
    if (token) orderGetList({ token });
  }, [token, orderGetList])

  if (!isAuth) {
    return <Redirect to='/' />
  }

  return (
    <main>
      <div className="container">
        <h1>Ваши заказы:</h1>
        {list.map((order) => (
          <div className="card card-body mb-3 flex-row justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <h4>{order.code}</h4>
              <span><small>Сделан: {dateTimeFormat(order.create_time)}</small></span>
              <span>Стоимость: {order.total_price}</span>
              <span>
                Товары: {order.product_list.map((product, index) =>(
                  <div key={index}><small>{index + 1}. {product.title} : {product.quantity} шт.</small></div>
                ))}
              </span>
            </div>
            <div>
              Статус <span className="text-danger">'{order.status}'</span>
            </div>
          </div>  
        ))}
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.account.isAuth,
  token: state.account.token,
  list: Object.values(state.order.list),
});

const mapDispatchToProps = (dispatch) => ({
  orderGetList: (value) => dispatch(orderGetList(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
