import React from "react";
import Navbar from "./components/Navbar.js";
import Searchbar from "./components/Searchbar.js";
import Footer from "./components/Footer.js";

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
  render() {
    return (
      <div className="App">
        <Navbar />
        <Searchbar />
        <Footer />
        <header className="App-header">
          <p>{this.state.apiResponse}</p>
        </header>
      </div>
    );
  }
}
export default App;