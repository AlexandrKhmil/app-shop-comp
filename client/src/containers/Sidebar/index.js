import React from 'react';
import { connect } from 'react-redux';
import { categoriesSetActive } from '../../actions/categories';

const Sidebar = ({ list, active, categoriesSetActive }) => {
  return (
    <aside className="card card-body border-primary">
      <h3 className="border-bottom border-light pb-2 mb-3">Категории</h3>
      <div className="d-flex flex-column align-items-start"> 
        {list.map((category, index) =>
          <button 
            className={`btn mb-2 ${active !== category ? 'btn-outline-primary' : 'btn-primary'}`}
            onClick={() => categoriesSetActive(category)}
            key={index}>
            {category}
          </button>
        )}
      </div>
    </aside>
  );
};

const mapStateToProps = (state) => ({
  list: Object.values(state.categories.list),
  active: state.categories.active,
});

const mapDispatchToProps = (dispatch) => ({
  categoriesSetActive: (value) => dispatch(categoriesSetActive(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
