import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../components/btn";
import Link from "../components/link";
import Header from "../components/header"
import Input from "../components/Input";
import Text from "../components/text";
import Modal from "../components/modal"
import axios from "axios";
import {baseUrl} from "../config/config"
import { AiOutlineCheckCircle } from "react-icons/ai";
import Logo from "../assets/logo"
interface User{
  email:String;
  password: String
}

interface Submitting {
  loading: Boolean;
  completed: Boolean;
  data:any
}

const LoginPage=()=>{
  const navigate = useNavigate();
  const [user,setUser]= useState<User>({
    email:"",
    password:""
  });
  const [submittionProcess,setSubmissionProcess]= useState<Submitting>({
   loading:false,
    completed:false,
    data:null
  })
  
  const onchange=(name: string,value:
  string)=>{
    setUser({...user,[name]:value});
  }
  const submitHandler= async()=>{
   const data  =await axios.post(`${baseUrl}/login`,{email:user.email, password:user.password});
   if(data.data.token){
   localStorage.setItem("token",data.data.token);
   navigate("/dashboard")
   }
   setSubmissionProcess({...submittionProcess,completed:true,data:data.data.message});
  }
  
  return (
  <div className="p-4 pt-4 w-full h-full">
  <div className="w-full ">
  <Logo/>
  <Header text="Login"align="left"marginY="2rem" />
  <Input placeholder="Email" icon={<AiOutlineCheckCircle style={{color:"gray"
    }}/>}marginY="2rem"name="email" onchange={onchange}/>
  <Input placeholder="password" icon={<AiOutlineCheckCircle style={{color:"gray"
    }}/>} marginY="2rem"name="password" onchange={onchange}/>
    <Btn title="Login" bgColor="#2f80ed" color="#fff"  borderRadius="10px" borderColor="#2f80ed" width="100%"height="3rem" icon={/*<AiOutlineCheckCircle style={{color:"red"
    }}></AiOutlineCheckCircle>*/
      null
    } onclickHandler={submitHandler}></Btn>
    <p className="text-center text-[gray] my-5">Not  a member  ? <a className="text-[#2f80ed]">Register</a></p>
  </div>
  </div>
  )
}
export default LoginPage