import React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import Main from './navigation/';
import { store } from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Main/>
        </div>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
