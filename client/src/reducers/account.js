const initialState = {
  todos: [
    { head: 'Todo one', text: 'Lorem ipsum dolor sit amet', },
    { head: 'Todo two', text: 'Lorem ipsum dolor sit amet', },
  ]
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case "ADD_TODO": {
      return {
        ...state,
        todos: [...state.todos, payload],
      }
    }
    case "CHANGE_TODO": {
      return {
        ...state,
        todos: state.todos.map((todo, index) => {
          return index === payload.id ? {...todo, text: payload.text} : todo;
        })
      }
    }
    default: {
      return state;
    }
  }
}