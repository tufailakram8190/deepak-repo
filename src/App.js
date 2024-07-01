// App.js
import React from 'react';
import { GlobalProvider } from './GlobalState';
import AppRouter from './AppRouter';

const App = () => {
  return (
    <GlobalProvider>
      <div className="App">
        <AppRouter />
      </div>
    </GlobalProvider>
  );
};

export default App;
