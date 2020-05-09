import * as sortType from '../constants/sort-type';

export const jsonRequest = ({ headers, body }) => { 
  const config = { 
    headers: { 'Content-Type': 'application/json', ...headers, } 
  };
  body = body && JSON.stringify(body);
  return { config, body };
};

export const categoryFilter = ({ category, list }) => {
  if (category) {
    list = list.filter((product) => product.category === category); 
  }
  return list;
};

export const tagFilter = ({ tagList, productList }) => {
  const activeTagList = Object.values(tagList)
    .filter((tag) => tag.isActive)
    .map((tag) => tag.tag);
  if (activeTagList.length > 0) {
    productList = productList.filter((product) => { 
      return product.tag_list.length > 0 
        && product.tag_list.some((tag) => tagList.indexOf(tag) >= 0);
    });
  }
  return productList;
};

export const sortProduct = ({ type, list }) => {
  switch (type) {
    case sortType.PRICE_ASC: {
      return list.sort((a, b) => a.price - b.price);
    }
    case sortType.PRICE_DESC: {
      return list.sort((a, b) => b.price - a.price);
    }
    case sortType.DATE_ASC: {
      return list.sort((a, b) => a.create_time - b.create_time);
    }
    case sortType.DATE_DESC: {
      return list.sort((a, b) => b.create_time - a.create_time);
    }
    default: {
      return list;
    }
  }
}; 