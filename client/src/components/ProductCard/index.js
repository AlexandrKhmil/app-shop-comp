import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

const ProductCart = ({ title, img_url, link }) => (
  <div className="card card-body border-primary mb-3"> 
    <img className={styles.img} src={img_url} alt="Product Card" />
    <NavLink to={`/product/${link}`}>
      <h4>{title}</h4>
    </NavLink>
  </div>
);

export default ProductCart;