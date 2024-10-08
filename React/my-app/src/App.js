import React from 'react';
import Home from './pages/Home.js';
import Query_forms from './pages/Query_forms.js';
import Footer from './components/Footer.js';
import F1 from './pages/F1.js';
import F2 from './pages/F2.js';
import F3 from './pages/F3.js';
import './App.css';
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
  componentDidMount() {
    document.title = "SpeedSearch";
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className='App-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/query_forms' element={<Query_forms />} />
            <Route path='/F1' element={<F1 />} />
            <Route path='/F2' element={<F2 />} />
            <Route path='/F3' element={<F3 />} />
          </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;