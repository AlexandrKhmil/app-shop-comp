import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../containers/Sidebar';
import SearchForm from '../../components/SearchForm';
import ProductCard from '../../components/ProductCard';
import { getProductList } from '../../actions/product';
import * as sortTypes from '../../constants/sort-type';
import styles from './styles.module.css';

const Home = (
  {
    productList,
    activeCategory, 
    isLoading,
    isLoaded,
    offset,
    getProductList,
    didLoadedAll,
  }
) => {
  return (
    <main>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-12 col-lg-3 mb-3">
            <Sidebar /> 
          </div>
          <div className="col-12 col-lg-9">
            <div className="row">
              <div className="col-12 mb-3">
                <SearchForm className="navbar bg-primary rounded" />
              </div>

              {productList && productList.map((item, index) => 
                <div className="col-6 col-md-4 col-xl-3 mb-3" key={index}>
                  <ProductCard {...item} />
                </div>
              )}

              { !didLoadedAll &&
                <div className="col-12 col-md-4 col-xl-3 mb-3">
                  <div className="card card-body border-0 h-100 d-flex justify-content-center align-items-center">
                    <button 
                      className={`btn bg-white border-primary rounded-circle d-flex justify-content-center align-items-center ${styles.reload}`}
                      onClick={() => getProductList({ offset, category: activeCategory })}
                      disabled={isLoading}>
                      <img src={require('../../static/reload.svg')} alt="Reload" />
                    </button> 
                    <span>
                      {!isLoading ? 'Загрузить еще...' : 'Идет загрузка...'}
                    </span>
                  </div>
                </div>
              } 
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {  
  let productList = Object.values(state.product.list)

  const activeCategory = state.category.active; 
  if (activeCategory) {
    productList = productList.filter((product) => 
      product.category === activeCategory); 
  }

  const activeTags = Object.values(state.tag.list)
    .filter((tag) => tag.isActive)
    .map((tag) => tag.tag);
  if (activeTags.length > 0) {
    productList = productList.filter((product) => { 
      return product.tag_list.length > 0 
        && product.tag_list.some((tag) => activeTags.indexOf(tag) >= 0);
    });
  }

  const sortType = state.product.sortType;
  switch (sortType) {
    case sortTypes.PRICE_ASC: {
      productList = productList.sort((a, b) => a.price - b.price);
      break;
    }
    case sortTypes.PRICE_DESC: {
      productList = productList.sort((a, b) => b.price - a.price);
      break;
    }
    case sortTypes.DATE_ASC: {
      productList = productList.sort((a, b) => a.create_time - b.create_time);
      break;
    }
    case sortTypes.DATE_DESC: {
      productList = productList.sort((a, b) => b.create_time - a.create_time);
      break;
    }
    default: break;
  }

  return {
    productList,
    activeCategory,
    isLoading: state.product.isLoading,
    isLoaded: state.product.isLoaded,
    offset: state.product.offset,
    didLoadedAll: state.product.didLoadedAll,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProductList: (value) => dispatch(getProductList(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
