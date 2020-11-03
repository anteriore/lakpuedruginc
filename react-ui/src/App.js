import React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'

import Main from './navigation/';
import { store, persistor } from './redux/store'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="App">
            <Main/>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    
  );
}

export default App;
