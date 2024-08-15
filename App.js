import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Items from './src/components/Items';
const App = () => (
  <Provider store={store}>
    <Items />
  </Provider>
);

export default App;
