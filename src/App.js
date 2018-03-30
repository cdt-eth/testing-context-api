import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// N O T E S
// share props & state with non-direct children or parent
// allows us to inject data anywhere in the app

// ------------------------------------------------------

// 1) state goes in Provider
const MyContext = React.createContext();

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

  // 2) we return a MyContext.Provider that takes 1 prop called 'value'
  // 3) what's in the Provider value is what we're passing down
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

// 6) a MyContext.Consumer is where we access the now-everywhere-accessible data
// 7) the child of Consumer will always be a function
// 8) Consumer takes in value object provided by Provider
// 9) destructure the props of value and no need for "this" in Consumer
// 10) now with a root Provider we can add Consumers anywhere
class LoginForm extends Component {
  state = {};
  render() {
    return (
      <MyContext.Consumer>
        {value => {
          const { viewer, age, logIn, logOut } = value;

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

// 4) we wrap entire app in Provider
// 5) any child in Provider now has access to data/values that are provided
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
