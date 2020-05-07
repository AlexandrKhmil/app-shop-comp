import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [search, setSearch] = useState('');
  const onSumbit = (e) => {
    e.preventDefault();
  }

  return (
    <header>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <NavLink className="navbar-brand" to="/">Brand</NavLink>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
          </ul>
          <form 
            className="form-inline my-2 my-lg-0"
            onSubmit={onSumbit}>
            <input 
              className="form-control mr-sm-2" 
              type="text" 
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)} />
            <button
              className="btn btn-secondary my-2 my-sm-0"
              type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;