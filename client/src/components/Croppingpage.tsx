import react,{useState,useEffect,useRef,RefObject} from "react"
import { useNavigate,Link } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai'
//import {Link } from "react-router-dom"
import "./croppingpage.css";
import Resizer from "./Size"
type ContainerRefType = RefObject<HTMLDivElement>
interface CropImagedetails{
  imageFile:any;
  width:Number;
  height:Number;
  backgroundHeight:Number,backgroundWidth:Number
  positionX:Number;
  positionY:Number;
}
const CroppingPage=()=>{
  const navigate =useNavigate()
  const url = localStorage.getItem("image")
  
  const defaultSizeContainerRef: ContainerRefType =
    useRef<HTMLDivElement>(null);
      const [cropImagedetails,setCropImageDetails]=useState<CropImagedetails>({
    imageFile:url,
    width:0,
    height:0,
    positionY:0,
    positionX:0
    ,backgroundWidth:0,
    backgroundHeight:0
  });
    
  const resizeFunc=(left:Number,top:Number,height:Number,width:Number)=>{
/*if(defaultSizeContainerRef.current){
      setCropImageDetails({...cropImagedetails,positionX:left,positionY:top,
        backgroundWidth:defaultSizeContainerRef.current.getBoundingClientRect().width,
        backgroundHeight:defaultSizeContainerRef.current.getBoundingClientRect().height
      })
   }*/
  }
  

  
  const [fileSelected,setFileSelected]=useState<boolean>(true)
  
  const onChangeHandler =  (e: any) => {
      if (e.target.files) {
        if(defaultSizeContainerRef.current){
        const imagefile = e.target.files[0];
        setCropImageDetails({...cropImagedetails,imageFile:URL.createObjectURL(e.target.files[0])})
    alert(URL.createObjectURL(e.target.files[0]))
     /*   setCropImageDetails({...cropImagedetails,width:defaultSizeContainerRef.current.getBoundingClientRect().width,
          height:defaultSizeContainerRef.current.getBoundingClientRect().height
        })*/
        /*alert(defaultSizeContainerRef.current.getBoundingClientRect().width)*/
        alert(defaultSizeContainerRef.current.getBoundingClientRect().height)
      }
      }
    }
   useEffect(()=>{
     
     
    setCropImageDetails({
        ...cropImagedetails,
        imageFile:url
      })
    },[fileSelected])
  return (
  <div className="cropping-container-wrapper">
  <div className="CroppingPage-main-container">
  <div className="CroppingPage-header">
 <Link to="/sp"><AiOutlineArrowLeft/></Link>
  <h1>Crop photo</h1>
  <Link to="#">Done</Link>
  </div>
  <div className="cropping-container"ref={defaultSizeContainerRef}>
 <img src={ cropImagedetails.imageFile} className="cropping-image"/>
 <div className="CroppingPage-overlay" ></div>
 <div className="lense">
 <Resizer resizerFunc={resizeFunc} backgroundurl={cropImagedetails.imageFile} positionY={cropImagedetails.positionY} positionX={cropImagedetails.positionX} backgroundHeight={cropImagedetails.height} backgroundWidth={cropImagedetails.width}/> </div>
  </div>
  </div>
  <div className="CroppingPage-footer"> 
  <button>Cancel </button>
     <input type="file" id="file"className="CroppingPage-input"onChange={onChangeHandler}/>
  <label htmlFor="file"className="CroppingPage-label">Change photo</label>
  </div>

  </div>
  )
}

export default CroppingPage