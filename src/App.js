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
                  <Link class="nav-links" to='/'>Landing</Link>
                  <Link class="nav-links" to='/library'>Library</Link>
                </nav>
                <h1 id="app-title">Bloc Jams</h1>
              </header>
              <Route exact path="/" component={Landing} />
              <Route path="/library" component={Library} />
              <Route path="/album/:slug" component={Album} />
              <footer className="footer">
              </footer>
            </main>
            <aside className="first-sidebar"></aside>
            <aside className="second-sidebar"></aside>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
