import React from 'react';
import './App.css';
import Main from './components/Main';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <div className="Content">
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
