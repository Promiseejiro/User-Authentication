import React,{useEffect,useState} from "react";
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import Logo from "../assets/logo";
import Text from "../components/text";
import Header from "../components/header"
import Btn from "../components/btn"
import Label from "../components/label"
import {baseUrl} from "../config/config"

interface User{
  email: String;
  password:any;
  name: String;
  bio: String;
  avarta: string;
  phone:Number;
}
const Dashboard =()=>{
  const navigate =useNavigate()
  const [user,setUser]=useState<User>({
    email: "",
  password:"",
  name: "",
  bio: "",
  avarta: "",
  phone:0
  })
  
  
  const fetchUser=async()=>{
 const token  = localStorage.getItem("token");
  const authenticatedUser =await axios.get(`${baseUrl}/user`, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
    })
   const {email, password,bio,phone,avarta,name} =await authenticatedUser.data.user 
   alert(email)
   setUser({...user, email, password,phone,name,bio,avarta});
  }
  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <div className="pt-4 px-4">
    <div className="flex items-center justify-between">
    <Logo/>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlL5HN0XpETGacd8fMtz-dHqTLFN3BBJcvQg&usqp=CAU" className="h-auto w-[4rem] rounded-[5px]"/>
    </div>
     <Header align="center"marginY="2rem" text="Personal Info"/>
    <Text text="center" color="Personal Info"/>
    <div className="border-b-[gray] lg:border-b-solid border-2px rounded-[10px] overflow-hidden">
   <div className="flex items-center justify-between">
   <div>
     <Header align="center"marginY="2rem" text="Personal Info"/>
    <Text text="center" color="Personal Info"/>
    </div>
  <Link to="/edit" >Edit</Link>
    </div>
    <div className="flex items-center justify-between p-4 border-[gray] border-solid border-b-1">
<Label  text="Photo"/>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlL5HN0XpETGacd8fMtz-dHqTLFN3BBJcvQg&usqp=CAU" className="h-auto w-[5rem] rounded-[5px]"/>
        </div>
    <div className="flex items-center justify-between p-4 border-[gray] border-solid border-b-2px">
<Label  text="Name"/><p>{user.name}</p>
    </div>
    <div className="flex items-center justify-between p-4 border-[gray] border-solid border-b-2px">
<Label  text="bio"/><p>{user.bio}</p>
    </div>
    <div className="flex items-center justify-between p-4 border-[gray] border-solid border-b-2px">
<Label  text="Phone"/><p>{`${user.phone}`}</p>
    </div>
    <div className="flex items-center justify-between p-4 border-[gray] border-solid border-b-2px">
<Label  text="Email"/><p>{user.email}</p>
    </div>
    <div className="flex items-center justify-between p-4 border-[gray] border-solid border-b-[2px]">
<Label  text="Password"/><p>************</p>
    </div>
    </div>
    </div>
    )
}
export default Dashboard