interface Text{
text: string;
align: String;
marginY: string
}
const Header =({text, align,marginY}:Text)=>{
  return (
    <h3 className={` flex text-[22px] font-[400]`} style={{
      justifyContent:`${align}`,
      margin:`${marginY} 0`
    }}>{text}</h3>
    )
}
export default Header