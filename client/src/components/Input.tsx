import { AiOutlineCheckCircle } from "react-icons/ai";

interface InputProps{
  placeholder: string,
  icon:any;
  name: string
  marginY: string;
  onchange:any
}

const Input=({placeholder,icon,marginY,name,onchange}:InputProps)=>{
  const handleChange=(e:any)=>{
    onchange(e.target.name,e.target.value)
  }
  return (
    
    <div className={`flex items-center border-[gray] border-2px border-solid rounded-[10px] overflow-hidden pl-2 w-full`} style={{
      margin:`${marginY} 0`
    }}>
    {icon}
    <input className="w-full bg-[transparent] py-2 px-1 focus:outline-none" placeholder={placeholder} name={name} onChange={handleChange}/>
    </div>
    )
}

export default Input