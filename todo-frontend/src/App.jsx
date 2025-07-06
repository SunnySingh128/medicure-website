import './App.css'
import Signup from "./signup";
import Login from "./login";
import Send from "./sendmail"
import Dash from "./dashboard"
import Robo from "./floating"
import About from "./about"
import Ser from "./services"
import Con from "./contact"
import Chat from "./chatbot"
import Meter from "./meter"
import UserPro from "./userpro"
import First from "./firstpage"
import Sec from "./second.jsx"
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />} />
      <Route path="/sendmail" element={<Send/>} />
      <Route path="/dashboard" element={<Dash/>} />
      <Route path="/floating" element={<Robo/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/services" element={<Ser/>} />
      <Route path="/contact" element={<Con/>} />
      <Route path="/chatbot" element={<Chat/>} />
      <Route path="/meter" element={<Meter/>} />
      <Route path="/userpro" element={<UserPro/>} />
      <Route path="/firstpage" element={<First/>} />
      <Route path="/dietplan/:condition" element={<Sec/>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    </>
  )
}

export default App
 