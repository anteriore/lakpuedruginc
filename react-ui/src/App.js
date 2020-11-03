import React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import Main from './navigation/';
import { store } from './redux/store'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Main/>
        </div>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
