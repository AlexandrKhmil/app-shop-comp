import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../containers/Sidebar';
import SearchForm from '../../components/SearchForm';
import ProductCard from '../../components/ProductCard';
import { productGetList } from '../../actions/product';
import { categoryFilter, tagFilter, sortProduct } from '../../functions';
import styles from './styles.module.css';

const Home = ({
    productList, 
    isLoading,
    offset,
    productGetList,
    didLoadedAll,
  }) => {
  return (
    <main>
      <div className="container-fluid mt-sm-5">
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
                      onClick={() => productGetList({ offset })}
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

  productList = categoryFilter({
    category: state.category.active,
    list: productList,
  })

  productList = tagFilter({
    tagList: state.tag.list,
    productList: productList,
  });

  productList = sortProduct({ 
    type: state.product.sortType, 
    list: productList,
  });

  return {
    productList,
    isLoading: state.product.isLoading,
    isLoaded: state.product.isLoaded,
    offset: state.product.offset,
    didLoadedAll: state.product.didLoadedAll,
  };
};

const mapDispatchToProps = (dispatch) => ({
  productGetList: (value) => dispatch(productGetList(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
