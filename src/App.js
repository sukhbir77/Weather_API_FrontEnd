import './App.css';
import {Routes, Route} from "react-router-dom"
import Homepage from './pages/homepage';
import Navbar from './components/navbar';
import Register from './pages/register';
import Login from "./pages/login"

function App() {
  return (
    <div style={{backgroundImage: `url("https://images6.alphacoders.com/568/568500.jpg")`, backgroundSize: "cover", height: "100vh"}} >
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
