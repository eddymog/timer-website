import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Timer from './components/Timer';
import { Container } from 'reactstrap';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <Timer />
      </header> */}
      <Navigation />
      <Container>
        <Timer />
      </Container>
    </div>
  );
}

export default App;
