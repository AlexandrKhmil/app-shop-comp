import React from 'react';
import { connect } from 'react-redux';
import SearchForm from '../../components/SearchForm';
import ProductCard from '../../components/ProductCard';

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
          <div className="col-3">
            <aside className="card card-body border-primary">
              <h2>Категории</h2>
              <p>...</p>
            </aside>
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col-12 mb-3">
                <SearchForm className="navbar bg-primary" />
              </div>
              {productList && productList.map((item, index) => 
                <div className="col-3 mb-3" key={index}>
                  <ProductCard {...item} />
                </div>
              )}
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
