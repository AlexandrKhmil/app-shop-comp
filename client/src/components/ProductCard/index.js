import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { cartAddProduct } from '../../actions/cart'
import styles from './styles.module.css';

const ProductCart = ({ 
    id,
    title, 
    img_url, 
    link, 
    price, 
    category, 
    rate, 
    vote_count, 
    review_count, 
    tag_list,
    cartAddProduct,
  }) => (
  <div className="card card-body h-100"> 
    <div className="mb-2" style={{ minHeight: '24px' }}>
      {tag_list.map((tag, index) => 
        <span className="badge badge-primary mr-1" key={index}>{tag}</span>
      )}
    </div>

    <NavLink className="d-flex justify-content-center" to={`/product/${link}`}>
      <img className={styles.img} src={img_url} alt="Product Card" />
    </NavLink>
    <NavLink to={`/product/${link}`}>
      <h5>{title}</h5>
    </NavLink>

    <div className="d-flex text-muted">
      <small>
        <span>Категория: </span>
        <span>{category}</span>
      </small>
    </div>

    <div className="d-flex text-muted">
      <small>
        <span>Рейтинг: </span>
        <span>
          {rate 
            ? `${parseInt(rate).toFixed(2)} 
                (${vote_count} голос${vote_count > 1 ? 'а' : ''})` 
            : 'Нет голосов'
          }
        </span>
      </small>
    </div>

    <div className="d-flex text-muted">
      <small>
        <span>Отзывов: </span>
        <span>
          {review_count}
        </span>
      </small>
    </div>

    <div>{price} ₴</div>

    <button 
      className={`btn btn-primary d-flex justify-content-center p-1 mt-auto ${styles.btn}`}
      onClick={() => cartAddProduct(id)}>
      Добавить 
      <img className="ml-2" src={require('../../static/shopping-cart.svg')} alt="Cart" />
    </button>
  </div>
);

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  cartAddProduct: (value) => dispatch(cartAddProduct(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCart);