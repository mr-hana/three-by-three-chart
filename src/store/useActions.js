import React from 'react';

const useActions = (initialState, reducers, dispathcers) => {
  const [state, dispatch] = React.useReducer(reducers, initialState);
  const actions = dispathcers(dispatch);
  return [state, actions];
}

export default useActions;