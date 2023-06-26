import react,{useState,useRef,RefObject} from "react"
import "./setup.css";
import axios from "axios"
import Resizer from "../../components/Size"
interface CropImagedetails{
  left:Number;
  top:Number;
  imageFile:any;
  width:Number;
  height:Number;
  nameWidth:Number;
    nameHeight:Number;
    nameLeft:Number;
    imgwidth:Number;
    imgheight:Number;
    nameTop:Number;
    url:string;
    positionname:boolean;
    positionimage:boolean;
  backgroundHeight:Number,
  backgroundWidth:Number;
  positionX:Number;
  positionY:Number;
}
const Setup=()=>{
  type ContainerRefType = RefObject<HTMLDivElement>
  const defaultSizeContainerRef: ContainerRefType =
    useRef<HTMLDivElement>(null);
  const [cropImagedetails,setCropImageDetails]=useState<CropImagedetails>({
    imageFile:"",
    left:0,
    top:0,
    imgwidth:0,
    imgheight:0,
    width:0,
    height:0,
    nameWidth:0,
    nameHeight:0,
    nameLeft:0,
    nameTop:0,
    url:"",
    positionname:false,
    positionimage:false,
    positionY:0,
    positionX:0
    ,backgroundWidth:0,
    backgroundHeight:0
  });
  
  const positionImage=(left:Number,top:Number,imgheight:Number,imgwidth:Number)=>{
    if(defaultSizeContainerRef.current){
      const {width,height}=defaultSizeContainerRef.current.getBoundingClientRect()
   setCropImageDetails({...cropImagedetails,imgwidth:imgwidth,imgheight:imgheight,top:top,left: left,width:width,height:height})
  }
   
  }
  
  const positionName=(left:Number,top:Number,height:Number,width:Number)=>{
    if(defaultSizeContainerRef.current){
      const {width,height}=defaultSizeContainerRef.current.getBoundingClientRect()
    setCropImageDetails({...cropImagedetails,nameWidth:width,nameHeight:height,nameTop:top,nameLeft: left})
  }
  }
  
  
  const handleSubmit=async()=>{
    const formdata = new FormData();
    formdata.append("filepath", cropImagedetails.imageFile);
    
   /* formdata.append("namehieght",(Number (cropImagedetails.nameHeight) / Number(cropImagedetails.height))*100)*/
   /* formdata.append("filepath", cropImagedetails.imageFile);
    formdata.append("filepath", cropImagedetails.imageFile);
    formdata.append("filepath", cropImagedetails.imageFile);
    formdata.append("filepath", cropImagedetails.imageFile);
    formdata.append("filepath", cropImagedetails.imageFile);
    formdata.append("filepath", cropImagedetails.imageFile);*/
const res = await axios.post(`https://try-bphn.onrender.com/newtemplate`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
  }
  const onChangeHandler =(e:any)=>{
  setCropImageDetails({...cropImagedetails,url:URL.createObjectURL(e.target.files[0])})
  }
  return (
  <div className="setup-dp-wrapper">
    <input type="file"id="file" onChange={onChangeHandler}/>
  <label htmlFor=""></label>
  <div  className="set-dp-container" ref={defaultSizeContainerRef}>
  <div></div>
    <h1></h1>
 {cropImagedetails.positionimage && (
 <div className="lense image">
  <Resizer resizerFunc={positionName} backgroundurl={cropImagedetails.imageFile} positionY={cropImagedetails.positionY} positionX={cropImagedetails.positionX} backgroundHeight={cropImagedetails.height} backgroundWidth={cropImagedetails.width}/> </div>
  )
 }
 
 {cropImagedetails.positionname && (
 <div className="lense name">
  <Resizer resizerFunc={positionName} backgroundurl={cropImagedetails.imageFile} positionY={cropImagedetails.positionY} positionX={cropImagedetails.positionX} backgroundHeight={cropImagedetails.height} backgroundWidth={cropImagedetails.width}/> </div>
  )
 }
  <img src={`${cropImagedetails.url}`}/>
  <div className="dp-setup-overlay"></div>
  </div>
  {!cropImagedetails.positionimage &&
 <button onClick={()=>{
    setCropImageDetails({...cropImagedetails,positionimage:true})
  }}>position image</button>
  }
  {cropImagedetails.positionimage && <button onClick={()=>{
    setCropImageDetails({...cropImagedetails,positionname:true,positionimage:false})
  }}>position name</button>
  }
  <button onClick={handleSubmit}>Submit</button>
  </div>
  )
}

export default Setup