interface Text{
  title: String;
  color: string;
  bgColor: String;
  borderColor: String;
  borderRadius: string;
  width: string;
  height:string;
  onclickHandler:any;
  icon:any
}
const  Btn =({title,onclickHandler,color,bgColor,borderColor,borderRadius,width,icon, height}:Text) =>{
  return (
<button  className={`flex items-center justify-center hover:bg-blue-70 font-[400] focus:outline-none`} onClick={onclickHandler} style={{
  backgroundColor:`${bgColor}`,
  borderRadius:`${borderRadius}`,
  color:`${color}`,
  border:`2px solid ${borderColor}`,
  width:`${width}`,
  height:`${height}`
}}>{icon} {title}</button>
)
}
export default Btn