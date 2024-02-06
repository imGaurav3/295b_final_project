import React, { PureComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main";
import ScrollingContent from "./components/User/User";
import CardComponent from "./components/User/Card"

class App extends PureComponent {
  render() {
    return (
      <Router>
        <div>
          {/* App Component Has a Child Component called Main */}
            <Main/>    
        </div>
      </Router>
    );
  }
}
export default App;
