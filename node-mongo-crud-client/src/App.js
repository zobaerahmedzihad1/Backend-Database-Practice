import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser/AddUser";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import UbdateUser from "./components/UbdataUser/UbdateUser";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<AddUser/>} />
        <Route path="/ubdate/:id" element={<UbdateUser/>} />
      </Routes>
    </div>
  );
}

export default App;
