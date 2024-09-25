import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Searchbar from "./components/Searchbar.js";
import Footer from "./components/Footer.js";
import F1 from "./pages/F1.js";

function AppLayout({ children }) {
  const location = useLocation();
  
  // Define paths where you don't want the Navbar or Footer to appear
  const hideNavbarFooterPaths = ["/f1"];
  const currentPath = location.pathname.replace(/\/$/, "");

  return (
    <div className="App">
      {/* Conditionally render Navbar and Footer */}
      {!hideNavbarFooterPaths.includes(currentPath) && <Navbar />}
      
      {children}  {/* This will render the Routes */}
      
      {!hideNavbarFooterPaths.includes(currentPath) && <Footer />}
    </div>
  );
}


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
      <Router>
        <AppLayout>  {/* Wrap Routes with AppLayout for conditional rendering */}
          <Routes>
            <Route path="/" element={
              <>
                <Searchbar />
                <header className="App-header">
                  <p>{this.state.apiResponse}</p>
                </header>
              </>
            } />
            
            <Route path="/f1" element={<F1 />} />  {/* Define the F1 route */}
          </Routes>
        </AppLayout>
      </Router>
  );
}
}
export default App;