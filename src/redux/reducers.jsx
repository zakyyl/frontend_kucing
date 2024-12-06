const initialState = {
    editSuccess: false,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EDIT_SUCCESS':
        return {
          ...state,
          editSuccess: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;