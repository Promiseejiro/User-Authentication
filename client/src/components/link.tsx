interface Text{
  title: string;
  color: string;
  borderColor: String;
  borderRadius: string;
  width: string;
  height:string;
  onclickHandler:any;
  icon:any
}
const  Link =({title,onclickHandler,color,borderColor,borderRadius,width,icon, height}:Text) =>{
  return (
<a  className={`flex items-center justify-center hover:bg-blue-70 font-[400] focus:outline-none m-1`} onClick={onclickHandler} style={{
  borderRadius:`${borderRadius}`,
  color:`${color}`,
  border:`2px solid ${borderColor}`,
  width:`${width}`,
  height:`${height}`
}} href={title}>{icon} </a>
)
}
export default Link