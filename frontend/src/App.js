import React, { PureComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main";
import Layout from './components/Layout/Layout'; // Import the Layout component


class App extends PureComponent {
  render() {
    return (
      <Router>
        <Layout> {/* Wrap Main component with Layout */}
          <Main/>
        </Layout>
      </Router>
    );
  }
}
export default App;
