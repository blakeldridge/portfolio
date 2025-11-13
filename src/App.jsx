import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

import Home from "./pages/home";
import Projects from "./pages/projects";
import Gymnastics from "./pages/gymnastics";
import Resume from "./pages/resume";
import Contact from "./pages/contact";
import Squares from "./components/Squares";

function App() {

  return (
    <Router>  
      <div>
        <Squares 
          speed={0.75} 
          squareSize={50}
          direction='up' // up, down, left, right, diagonal
          borderColor='#eaeaea'
          hoverFillColor='#3357cd'
          className="w-full h-full fixed -z-1"
        />
        <Navbar />

        {/* Routes */}
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gymnastics" element={<Gymnastics />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
