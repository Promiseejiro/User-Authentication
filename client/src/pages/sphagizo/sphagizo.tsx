import react,{useState,useEffect,} from "react"
import { useNavigate } from "react-router-dom";

import "./spagizo.css"
interface Position {
  positionX: string;
  positionY: string;
  url: string;
}
const Spagizo =()=>{
 /* const cropx=localStorage.getItem("cropx") ? localStorage.getItem("cropx") :"0"
  const cropy=localStorage.getItem("cropy") ? localStorage.getItem("cropy"):"0"*/
  const url = localStorage.getItem("image") ? localStorage.getItem("image") :""
  alert(url)
  const navigate =useNavigate()
 /* const [positionX,positionY] =useState<Position>({
    //positionx:"0",
   // positionY:"0",
   // url:`${url}`
  })*/
  const [name,setname]=useState<string>("")
  
  const onChange =(e:any)=>{
    setname(e.target.value)
  }
    const changeFile =  (e: any) => {
      if (e.target.files) {
localStorage.setItem("image", URL.createObjectURL(e.target.files[0]))
       navigate("/crop")
        }
    }
  return (
  <div className="spagizo-main-wrapper">
  <div className="spagizo-header">
  <div className="spagizo-header-overlay">
    <h1 className="spagizo-header-label">Sphagizo</h1>
 <p>It's Worship Experience 10.0 @psalmis live concert. Featuring  Music,Dance,Drama, Poetry and Ministration by Guest Ministers🔥🔥  Anticipate, Prepare your hearts as we await Worship Experience 10.0</p>
  </div>
  <img src="https://res.cloudinary.com/dxqg5hify/image/upload/v1687596788/html2image/ymamqgqvdv37fzxkpyxm.jpg"/>
  </div>
 <div className="generate-dp-container">
  <img className="dp-avarta"src="https://res.cloudinary.com/dxqg5hify/image/upload/v1687596788/html2image/ymamqgqvdv37fzxkpyxm.jpg"/>
 <div style={{
  position:"absolute",
  left:"0px",
  top:"0px",
  width:"5rem",
  height:"5rem",
  backgroundImage:`url("https://res.cloudinary.com/dxqg5hify/image/upload/v1687596788/html2image/ymamqgqvdv37fzxkpyxm.jpg")`,
  border:"2px solid red",backgroundRepeat:"no-repeat",
  backgroundPosition:"50% 50%",
  backgroundSize:"360px 360px"
 }}></div>
 <h3 style={{
      position:"absolute",
  left:"50%",
  top:"50%",
  width:"5rem",
  height:"2rem",
  backgroundColor:"#fff"
 }
 }>{name}</h3>
 </div>
 
 <div className="dp-form">
     <div className="input-controller">
  <input type="text"className="name-input"placeholder="Input name" onChange={onChange}/>
  </div>
   <div className="input-controller">
      <input type="file" id="file"className="CroppingPage-input"onChange={changeFile}/>
        <label htmlFor="file"className="CroppingPage-input-label">Choose photo</label>
      </div>
 </div>
  </div>
  )
}
export default Spagizo