import User from "../modal/modal";
 const createuser =(email: string, password: string)=>{
    if(password==="password"){
      return "/password"
    }else {
      const user =User.findOne({email:email});
      return "/login"
    }
}

export default createuser