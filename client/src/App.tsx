import React from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Spagizo from "./pages/sphagizo/sphagizo"
import EditPage from "./pages/Editpage"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import Resizer from "./components/Size"
import CroppingPage from "./components/Croppingpage"
function App() {
 
  const check=async()=>{
    try{
       axios.get("http://localhost:2000/auth/google");
    } catch(err){
      alert(err)
    }
  }
  
  
  const resizerFunc =(left:Number,top:Number, height:Number,width:Number)=>{
    
  }
  
  return (
    <div
      className="App bg-[#f4f4f4]  h-full w-full  md">
      <Router > <Routes>
      
      <Route path="sp" element={<Spagizo/>}></Route>
      <Route path="/crop"element={<CroppingPage/>}></Route>
      
      <Route path="/" element={ <Register />}>
      </Route>
   {/*   <Route path="/size" element={ <Resizer resizerFunc={resizerFunc}/>}>
      </Route>*/}
      <Route path="/login" element={ <LoginPage />}>
      </Route>
      <Route path="/dashboard" element={ <Dashboard/>}>
      </Route>
      <Route path="/edit" element={ <EditPage/>}>
      </Route>
      </Routes></Router>
     {/* <div className="flex items-center justify-between mt-3 px-4 relative w-full" >
    <p className="text-center text-[gray] my-5">Created by <span> ❤️ </span><span className="text-[black]">Promise</span>
    </p>
    <p className="text-center text-[gray] my-5">Dev challenge</p>
    </div>*/}
    </div>
  );
}
export default App;
