interface labelProp{
  text: String;
}

const Label =({text}:labelProp)=>{
  return (
    <label className="text-[gray]">
  {text}
    </label>
    )
}
export default Label