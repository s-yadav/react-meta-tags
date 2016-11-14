import React from 'react';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <header className="header">
          <h3 className="text-muted">React Meta Tags</h3>
          <nav>
            <ul className="nav nav-pills pull-xs-right">
              <li className="nav-item">
                <Link className="nav-link" activeClassName="active" to="page1">Page 1</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" activeClassName="active" to="page2">Page 2</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div id="app-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App;
