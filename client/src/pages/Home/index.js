import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../containers/Sidebar';
import SearchForm from '../../components/SearchForm';
import ProductCard from '../../components/ProductCard';
import { getProductList } from '../../actions/product';
import styles from './styles.module.css';

const Home = (
  {
    productList,
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
                      onClick={() => getProductList({ offset })}
                      disabled={isLoading}>
                      <img src={require('../../static/reload.svg')} />
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
  const activeCategory = state.categories.active;
  let productList = Object.values(state.product.list)
  if (activeCategory) {
    productList = productList.filter((product) => 
      product.category === activeCategory); 
  } 
  return {
    productList,
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
