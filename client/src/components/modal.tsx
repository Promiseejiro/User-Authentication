interface ModalProps{
    text: String
  }

const Modal =({text}:ModalProps)=>{
  
  return (
  <div className="absolute left-0 top-0 flex items-center justify-center h-screen w-full bg-[rgba(0,0,0,.3)] z-10 text-[#fff]">
  {/* props should be back ground color, text and icon all styling should be mage here*/}
  {text}
  </div>
  )
}
export default Modal