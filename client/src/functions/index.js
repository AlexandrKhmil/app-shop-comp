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
        && product.tag_list.some((tag) => activeTagList.indexOf(tag) >= 0);
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

export const dateFormat = (date) => {
  let result = '';
  if (date) {
    const arr = date.split('T')[0].split('-');
    result = `${arr[2]}-${arr[1]}-${arr[0]}`;
  }
  return result;
};

export const dateTimeFormat = (date) => {
  let result = '';
  if (date) {
    const arr = date.split('T')[0].split('-');
    const arr2 = date.split('T')[1].split('Z')[0].split(':')
    result = `${arr2[0]}:${arr2[1]} ${arr[2]}-${arr[1]}-${arr[0]}`;
  }
  return result;
}

export const ratingNormalization = (rating) => {
  let normalizedRating = rating / 5 * 500
  return Array(5).fill(0).map(() => {
    let rating = normalizedRating >= 100 ? 100 : normalizedRating
    normalizedRating = normalizedRating >= 100 ? normalizedRating - 100 : 0
    return rating
  })
};