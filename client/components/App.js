import React from 'react';
import Header from './Header';

const App = props => (
  <div className="container">
    <Header />
    <div className="content">{props.children}</div>
  </div>
);

export default App;
