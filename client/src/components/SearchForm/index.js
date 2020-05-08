import React, { useState } from 'react';
import { connect } from 'react-redux';

const SearchForm = ({ className }) => {
  const [name, setName] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form 
      className={`form-inline ${className}`}
      onSubmit={onSubmit}>
      <input 
        className="form-control flex-grow-1 mr-3"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name..." />
      <button
        className="btn btn-secondary"
        type="submit">
        Search
      </button>
    </form>
  )
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
