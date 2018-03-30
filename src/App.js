import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const MyContext = React.createContext();

//an indirect passing of data through the Context component
class Provider extends Component {
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
      <MyContext.Provider
        value={{
          viewer: this.state.viewer,
          logIn: this.logIn,
          logOut: this.logOut
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

const Nav = () => <LoginForm />;

class LoginForm extends Component {
  state = {};
  render() {
    return (
      <MyContext.Consumer>
        {value => {
          const { viewer, logIn, logOut } = value;
          return viewer ? (
            <React.Fragment>
              <h1>Logged in as: {viewer}</h1>
              <button onClick={logOut}>Log Out</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <input placeholder="name please" ref={r => (this.inputRef = r)} />
              <button
                type="submit"
                onClick={() => {
                  logIn(this.inputRef.value);
                }}
              >
                {' '}
                Log In{' '}
              </button>
            </React.Fragment>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <MyContext.Consumer>
              {({ viewer }) => <h1 className="App-title">{viewer ? `Welcome ${viewer}!` : `Please login!`}</h1>}
            </MyContext.Consumer>
          </header>
          <div className="App-intro">
            <Nav />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
