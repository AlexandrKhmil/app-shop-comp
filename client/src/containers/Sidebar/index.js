import React from 'react';
import { connect } from 'react-redux';
import { categorySetActive } from '../../actions/category';
import { tagSetActive } from '../../actions/tag'; 
import { productSetSort } from '../../actions/product';
import * as sortTypes from '../../constants/sort-type';

const Sidebar = ({ 
    categoriesList, 
    active, 
    categorySetActive, 
    tagList, 
    tagSetActive,
    productSetSort, 
    activeSortType, 
  }) => {
  return (
    <aside>
      <div className="card card-body border-primary mb-3">
        <h3 className="border-bottom border-light pb-2 mb-3">
          Сортировать по:
        </h3>
        <div className="d-flex flex-column align-items-start"> 
          <button
            className={`btn mb-2 ${activeSortType === sortTypes.DATE_DESC ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => productSetSort(sortTypes.DATE_DESC)}>
            Сперва новые
          </button>
          <button
            className={`btn mb-2 ${activeSortType === sortTypes.DATE_ASC ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => productSetSort(sortTypes.DATE_ASC)}>
            Сперва старые
          </button>
          <button
            className={`btn mb-2 ${activeSortType === sortTypes.PRICE_ASC ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => productSetSort(sortTypes.PRICE_ASC)}>
            Сперва дешевые
          </button>
          <button
            className={`btn mb-2  ${activeSortType === sortTypes.PRICE_DESC ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => productSetSort(sortTypes.PRICE_DESC)}>
            Сперва дорогие
          </button>
        </div>
      </div>

      <div className="card card-body border-primary mb-3">
        <h3 className="border-bottom border-light pb-2 mb-3">Категории</h3>
        <div className="d-flex flex-column align-items-start"> 
          {categoriesList.map((category, index) =>
            <button 
              className={`btn mb-2 ${active !== category ? 'btn-outline-primary' : 'btn-primary'}`}
              onClick={() => categorySetActive(category)}
              key={index}>
              {category}
            </button>
          )}
        </div>
      </div>
     
      <div className="card card-body border-primary mb-3">
        <h3 className="border-bottom border-light pb-2 mb-3">Тэги</h3>
        <div className="d-flex flex-column align-items-start"> 
          {tagList.map((tag, index) =>
            <button 
              className={`btn mb-2 ${!tag.isActive ? 'btn-outline-primary' : 'btn-primary'}`}
              onClick={() => tagSetActive(tag.tag)}
              key={index}>
              {tag.tag}
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

const mapStateToProps = (state) => ({
  categoriesList: Object.values(state.category.list),
  tagList: Object.values(state.tag.list),
  active: state.category.active,
  activeSortType: state.product.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  categorySetActive: (value) => dispatch(categorySetActive(value)),
  tagSetActive: (value) => dispatch(tagSetActive(value)),
  productSetSort: (value) => dispatch(productSetSort(value)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
