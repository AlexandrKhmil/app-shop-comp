import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-markdown';
import { selectedGet } from '../../actions/selected';
import InfoTable from '../../components/InfoTable';
import { dateFormat } from '../../functions/index';
import styles from './styles.module.css';

const Product = ({ link, isLoading, isLoaded, selectedGet, product }) => { 
  useEffect(() => {  
    if ((!isLoading && !isLoaded) || ((product.link !== link) && !isLoading)) {
      selectedGet({ link });
    } 
  }, [product.link, link, isLoading, isLoaded, selectedGet]);

  let tableData = {
    "Категория": product.category,
    "Цена": `${product.price} ₴`,
    "Добавлен": dateFormat(product.create_time),
  };

  if (product.tag_list && product.tag_list.length > 0) {
    tableData['Тэги'] = product.tag_list.join(', ');
  }

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-md-5 mb-3">
            <div className="card card-body border-primary ">
              <img className={styles.img} src={product.img_url} alt="Product" />
            </div> 
          </div>

          <div className="col-md-7 mb-3">
            <h1 className="mb-3">{product.title}</h1>
            <div className="card card-body border-primary">
              <InfoTable data={tableData}/>
            </div>
          </div>
          
          <div className="col-12 mb-3">
            <div className="card card-body border-primary"> 
              <Markdown source={product.description} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state, props) => ({ 
  link: props.match.params.link, 
  isLoading: state.selected.isLoading,
  isLoaded: state.selected.isLoaded,
  product: state.selected.data,
});

const mapDispatchToProps = (dispatch) => ({
  selectedGet: (value) => dispatch(selectedGet(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);


/*

{product.category}
              {product.price}
              {product.create_time}
              {product.rate || 'Нет Голосов'}
              {product.votes}
              {product.review_count}
              {product.tag_list}
              {product.review_list || ''}
              */