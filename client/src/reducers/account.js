const initialState = {
  email: null,
  token: null,
  isLoading: false,
  isAuth: true,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    default: {
      return state;
    }
  }
}