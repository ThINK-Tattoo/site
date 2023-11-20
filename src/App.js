import Router from './Router';
import React, { useEffect } from 'react';
import { hotjar } from 'react-hotjar';

function App() {
  useEffect(() => {
    hotjar.initialize(3738750, 6);
  }, []);

  return (
    <Router/>
  );
}

export default App;
