import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="content">
          <div className="columns">
            <main className="main">
              <header className="header">
                <nav>
                  <Link to='/'>Landing</Link>
                  <Link to='/library'>Library</Link>
                </nav>
                <h1>Bloc Jams</h1>
              </header>
              <Route exact path="/" component={Landing} />
              <Route path="/library" component={Library} />
              <Route path="/album/:slug" component={Album} />
              <footer className="footer">
                Footer goes here
              </footer>
            </main>
            <aside className="first-sidebar">First sidebar</aside>
            <aside className="second-sidebar">Right sidebar</aside>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
