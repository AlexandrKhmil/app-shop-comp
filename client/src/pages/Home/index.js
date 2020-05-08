import React from 'react';
import { connect } from 'react-redux';
import SearchForm from '../../components/SearchForm';
import ProductCard from '../../components/ProductCard';
import styles from './styles.module.css';

const Home = (
  {
    productList,
    isLoading,
    isLoaded,
  }
) => {
  return (
    <main>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-12 col-lg-3 mb-3">
            <aside className="card card-body border-primary">
              <h2>Категории</h2>
              <p>...</p>
            </aside>
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

              <div className="col-12 col-md-4 col-xl-3 mb-3">
                <div className="card card-body border-0 h-100 d-flex justify-content-center align-items-center">
                  <button className={`btn bg-white border-primary rounded-circle d-flex justify-content-center align-items-center ${styles.reload}`}>
                    <img src={require('../../static/reload.svg')} />
                  </button> 
                  <span>Загрузить еще...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  productList: Object.values(state.product.list),
  isLoading: state.product.isLoading,
  isLoaded: state.product.isLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
