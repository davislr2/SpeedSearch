import React from 'react';
import Home from './pages/Home.js';
import Query_forms from './pages/Query_forms.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
/*
class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
    }

callAPI() {
    fetch("http://127.0.0.1:5000/example")
        .then((res) => res.text())
        .then((res) => this.setState({ apiResponse: res }))
        .catch((err) => console.error("API fetch error: ", err));
  };

  componentDidMount() {
    this.callAPI();
}
*/
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/query_forms' element={<Query_forms />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;