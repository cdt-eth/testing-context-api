import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    viewer: null
  };

  logIn = name => {
    this.setState({ viewer: name });
  };

  logOut = viewer => {
    this.setState({ viewer: null });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          {this.state.viewer ? (
            <React.Fragment>
              <h1>Logged in as: {this.state.viewer}</h1>
              <button onClick={this.logOut}>Log Out</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <input placeholder="name please" ref={r => (this.inputRef = r)} />
              <button
                type="submit"
                onClick={() => {
                  this.logIn(this.inputRef.value);
                }}
              >
                {' '}
                Log In{' '}
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default App;
