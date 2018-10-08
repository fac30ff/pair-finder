import React, { Component } from 'react';
import { Provider } from 'react-redux'
import 'typeface-roboto';
import createRootStore from './redux/redux';

import Main from './components/Main'

class App extends Component {
  constructor(props) {
    super(props);
    this.store = createRootStore();
  }
  
  render() {
    return (
      <Provider store={this.store}>
        <Main />
      </Provider >
    );
  }
}

export default App;
