// importing components from react-router-dom package
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// components 
import Home from "./components/Home/home";
import Nav from "./components/Nav/nav";
import Signup from "./components/Signup/signup";
import Profile from "./components/Profile/profile";
import Contact from "./components/Contact/contact";

function App() {
  return (
    <>
     <Router>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
      </Router> 
    

    </>
  );
}

export default App;
