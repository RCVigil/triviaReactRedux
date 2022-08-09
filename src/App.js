import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Feedback from './components/Feedback';
import Game from './components/Game';
import Login from './components/Login';
import Settings from './components/Settings';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ #VQV!</p>
      </header> */}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
