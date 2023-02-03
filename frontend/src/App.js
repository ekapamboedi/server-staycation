import React from 'react';
import LandingPage from "pages/LandingPage";
import "assets/scss/style.scss";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return <div className="App">
    
      <Router> 
       <Routes>
        <Route path="/" component = {LandingPage}></Route>
       </Routes> 
      </Router>
    </div>;
}
// console.log(LandingPage);

export default App;
