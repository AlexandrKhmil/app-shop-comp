export const ACCOUNT_AUTH = '/api/account/auth';
export const ACCOUNT_LOGIN = '/api/account/login';
export const ACCOUNT_REGISTRATION = '/api/account/registration';

export const CATEGORY_LIST = '/api/product/categories';
export const TAG_LIST = '/api/product/tags';
export const PRODUCT_LIST = '/api/product/list';

export const PRODUCT_INFO = (link) => `/api/product/${link}/info`;

export const REVIEW_GET = (link) => `/api/product/${link}/review/list`;
export const REVIEW_ADD = (link) => `/api/product/${link}/review`;

export const RATE_ADD = (link) => `/api/product/${link}/rate`;
export const RATE_GET = (link) => `/api/product/${link}/rate/value`;