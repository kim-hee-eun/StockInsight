import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Detail from "./pages/Detail";
import Recommend from "./pages/Recommend";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Recommend />} />
          <Route path="/detail/:name" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
