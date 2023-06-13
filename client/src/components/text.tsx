interface TextProps{
  text: string;
  color: string
}

const Text =({text, color}:TextProps)=>{
  
  return (
    <p className={`text-[${color}]`}>{text}</p>
    
    )
}
export default Text