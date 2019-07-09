import React from 'react';
import PropTypes from 'prop-types';
import useActions from './useActions';
import { initialState, reducers, dispatchers, getters } from '../modules';

export const Store = React.createContext();
export const StoreProvider = props => {
  const [state, actions] = useActions(initialState, reducers, dispatchers);
  const storeGetters = getters(state);
  const value = { state, actions, getters: storeGetters };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.object.isRequired
};
