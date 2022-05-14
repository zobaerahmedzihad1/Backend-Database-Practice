import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser/AddUser";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<AddUser/>} />
      </Routes>
    </div>
  );
}

export default App;
