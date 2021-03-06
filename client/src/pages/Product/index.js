import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-markdown';
import { selectedGet } from '../../actions/selected';
import InfoTable from '../../components/InfoTable';
import Rating from '../../components/Rating';
import ReviewList from '../../components/ReviewList';
import ReviewForm from '../../components/ReviewForm';
import { dateFormat } from '../../functions';
import { cartAddProduct } from '../../actions/cart';
import styles from './styles.module.css';

const Product = ({ 
  link, 
  isLoading, 
  isLoaded, 
  selectedGet, 
  product, 
  tableData,
  cartAddProduct 
}) => { 
  useEffect(() => {  
    if ((!isLoading && !isLoaded) || ((product.link !== link) && !isLoading)) {
      selectedGet({ link });
    } 
  }, [product.link, link, isLoading, isLoaded, selectedGet]);

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 mb-3">
            <div className="card card-body border-primary ">
              <img className={`mb-3 ${styles.img}`} src={product.img_url} alt="Product" />
              <Rating link={link} />
            </div> 
          </div>

          <div className="col-lg-7 mb-3">
            <h1 className="mb-3">{product.title}</h1>
            <div className="card card-body border-primary">
              <InfoTable data={tableData}/>
              <button 
                className={styles.btn}
                onClick={() => cartAddProduct(product.id)}>
                <span>
                  Add to Cart 
                </span>
                <img className={styles.plus} src={require('../../static/plus.svg')} alt="Cart Plus" />
              </button>
            </div>
          </div>
          
          <div className="col-12 mb-3">
            <div className="card card-body border-primary"> 
              <Markdown source={product.description} />
            </div>
          </div>

          <div className="col-12 mb-3">
            <div className="card card-body border-primary"> 
              <h3>Оставить отзыв:</h3>
              <ReviewForm />
            </div>
          </div>

          <div className="col-12 mb-3">
            <h3>Отзывы:</h3>
            <ReviewList />
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state, props) => {
  const product = state.selected.data;
  let tableData = {
    "Категория": product.category,
    "Цена": `${product.price} ₴`,
    "Добавлен": dateFormat(product.create_time),
  };
  if (product.tag_list && product.tag_list.length > 0) {
    tableData['Тэги'] = product.tag_list.join(', ');
  }
  return {
    product,
    tableData,
    link: props.match.params.link, 
    isLoading: state.selected.isLoading,
    isLoaded: state.selected.isLoaded,
  }
};

const mapDispatchToProps = (dispatch) => ({
  selectedGet: (value) => dispatch(selectedGet(value)),
  cartAddProduct: (value) => dispatch(cartAddProduct(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);