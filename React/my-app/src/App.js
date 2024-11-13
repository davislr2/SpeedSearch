import React from 'react';
import Home from './pages/Home.js';
import Query_forms from './pages/Query_forms.js';
import Footer from './components/Footer.js';
import F1 from './pages/F1.js';
import F2 from './pages/F2.js';
import F3 from './pages/F3.js';
import GrandPrix from './pages/grandPrix.js'
import CountryDetails from './pages/CountryDetails.js'
import Season from './pages/Season.js';
import Driver from './pages/Driver.js'
import DriverDetails from './pages/DriverDetails.js';
import Constructor from './pages/Constructor.js';
import ConstructorDetails from './pages/ConstructorDetails.js';
import Circuit from './pages/Circuit.js'
import CircuitDetails from './pages/CircuitDetails.js'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: ""
    };
  }


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
            <Route path='/:level/Seasons/:year' element={<Season />} />
            <Route path='/:level/grandPrix/:year' element={<GrandPrix />} />
            <Route path='/F1/grandPrix/:year/:country' element={<CountryDetails />} />
            <Route path='/:level/drivers' element={<Driver />} />
            <Route path='/:level/drivers/:name' element={<DriverDetails />} />
            <Route path='/:level/constructors' element={<Constructor />} />
            <Route path='/:level/constructors/:name' element={<ConstructorDetails />} /> 
            <Route path='/:level/circuits' element={<Circuit />} />
            <Route path='/:level/circuits/:name' element={<CircuitDetails />} /> 
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