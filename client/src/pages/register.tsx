import React,{useState} from "react"
import Btn from "../components/btn"
import Link from "../components/link"
import Header from "../components/header"
import Input from "../components/Input";
import Text from "../components/text";
import Modal from "../components/modal"
import axios from "axios";
import {baseUrl} from "../config/config"
import { AiOutlineCheckCircle } from "react-icons/ai";
import Logo from "../assets/logo";
interface Submitting {
  loading: Boolean;
  completed: Boolean;
  data:any
}

interface User{
  email:String;
  password: String
}
const Register=()=>{
  const [user,setUser]= useState<User>({
    email:"",
    password:""
  })
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
   const data  =await axios.post(`${baseUrl}/register`,{email:user.email, password:user.password});
   setSubmissionProcess({...submittionProcess,completed:true,data:data.data.message});
  }
  return (
  <div className="p-4"> 
  <Logo/>
  <Header text="Join thousands of learner around the world" align="left"marginY="1rem"/>
    <Text text="Master web development by making real life projects. There are multiple path for you to choose." color="red"/>
  <Input placeholder="Email" icon={<AiOutlineCheckCircle style={{color:"gray"
    }}/>}marginY="1rem" name="email" onchange={onchange}/>
  <Input placeholder="password" icon={<AiOutlineCheckCircle style={{color:"gray"
    }}/>}marginY="1rem"name="password"onchange={onchange}/>
    <Btn title="Sign up" bgColor="#2f80ed" color="#fff"  borderRadius="10px" borderColor="#2f80ed" width="100%"height="3rem" icon={/*<AiOutlineCheckCircle style={{color:"red"
    }}></AiOutlineCheckCircle>*/
      null
    } onclickHandler={submitHandler}></Btn>
  <p className="text-center text-[gray] my-5">Or continue with this social profile</p>
  <div className="flex items-center justify-center">
  <Link title={`${baseUrl}/auth/google`} color="#fff"  borderRadius="50%" borderColor="gray" icon={<AiOutlineCheckCircle/>} width="3rem"height="3rem"
   onclickHandler={()=>{
  }}></Link> 
    <Link title={`${baseUrl}/auth/facebook`}color="#fff"  borderRadius="50%" borderColor="gray" icon={<AiOutlineCheckCircle/>} width="3rem"height="3rem"
   onclickHandler={()=>{
  }}></Link> 
  <Link title={`${baseUrl}/auth/twitter`}color="#fff"  borderRadius="50%" borderColor="gray" icon={<AiOutlineCheckCircle/>} width="3rem"height="3rem"
   onclickHandler={()=>{
   
  }}></Link> 
  <Link title={`${baseUrl}/auth/github`} color="#fff"  borderRadius="50%" borderColor="gray" icon={<AiOutlineCheckCircle/>} width="3rem"height="3rem"
   onclickHandler={()=>{
  }}></Link> 
  </div>
    <p className="text-center text-[gray] my-5">Are you a member already ? <a className="text-[#2f80ed]">Login</a></p>
    {/* the message should determine the background color and all*/}
 {submittionProcess.completed &&( <Modal text={submittionProcess.data}/> )}
  </div>
  )
}
export default Register