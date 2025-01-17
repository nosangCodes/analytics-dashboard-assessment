import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dash from "./pages/dash";
import Geographic from "./pages/geographic";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dash />} />
      <Route path="geo" element={<Geographic />} />
    </Routes>
  );
}

export default App;
