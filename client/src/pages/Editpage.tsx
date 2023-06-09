import React, { useState } from "react";
import axios from "axios";
import Logo from "../assets/logo";
import Text from "../components/text";
import Header from "../components/header";
import Btn from "../components/btn";
import Label from "../components/label";
import Input from "../components/Input";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { baseUrl } from "../config/config";
interface UpdateUser {
  email: String;
  password: String;
  phone: Number;
  bio: String;
  name: String;
  file: any;
}

const EditPage = () => {
  // states
  const [user, setUser] = useState<UpdateUser>({
    email: "",
    password: "",
    phone: 0,
    bio: "no bio",
    name: "",
    file: "",
  });

  const [profilePreview, setProfilepreview] = useState<any>("");

  const token = localStorage.getItem("token");
  const onchange = (name: string, value: string) => {
    setUser({ ...user, [name]: value });
  };

  const onselect = async (e: any) => {
    setUser({ ...user, file: e.target.files[0] });
    console.log(e.target.files[0]);
    setProfilepreview(URL.createObjectURL(e.target.files[0]));
  };

  const submitUpdate = async () => {
    const authenticatedUser = await axios.post(
      `${baseUrl}/edit`,
      {
        name: user.name,
        email: user.email,
        password: user.password,
        bio: user.bio,
        phone: user.phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <div className="pt-4 px-4">
      <div className="flex items-center justify-between"></div>
      <div className="border-b-[gray] lg:border-b-solid border-2px rounded-[10px] overflow-hidden">
        <div className="flex items-center ">
          <div>
            <Header align="start" marginY=".1rem" text="Personal Info" />
            <Label text="Changes will be reflected to every services" />
          </div>
        </div>
        <div className="relative w-[3rem] h-[3rem]">
          <label
            htmlFor="file"
            className="absolute t-0 l-0 h-[100%] w-[100%] bg-[rgba(0,0,0,.4)] z-20 flex items-center justify-center"
          >
            photo
          </label>
          <img
            src={`${profilePreview}`}
            alt="ema"
            className="absolute t-0 l-0 h-[100%] w-[100%]"
          />
          <input type="file" id="file" className="hidden" onChange={onselect} />
        </div>
        <div className="border-b-[gray] border-b-solid border-b-1 my-[.6rem]">
          <Text text="Name" color="black" />
          <Input
            placeholder="Enter your name "
            icon={null}
            marginY=".1rem"
            name="name"
            onchange={onchange}
          />
        </div>
        <div className="border-b-[gray] border-b-solid border-b-1 my-[.6rem]">
          <Text text="Bio" color="black" />
          <textarea
            placeholder="I'm a software developer "
            className="h-[3rem] pl-4 pt-4 w-full border-solid border-[gray] border-2px bg-[transparent] h-[6rem] rounded-[10px]"
            name="bio"
            onChange={(e: any) => {
              onchange(e.target.name, e.target.value);
            }}
          ></textarea>
        </div>
        <div className="border-b-[gray] border-b-solid border-b-1 my-[.6rem] ">
          <Text text="Phone" color="black" />
          <Input
            placeholder="Enter your phone"
            icon={null}
            marginY=".1rem"
            name="phone"
            onchange={onchange}
          />
        </div>
        <div className="border-b-[gray] border-b-solid border-b-1 my-[.6rem]">
          <Text text="Email" color="black" />
          <Input
            placeholder="Enter your email"
            icon={null}
            marginY=".1rem"
            name="email"
            onchange={onchange}
          />
        </div>
        <div className="border-b-[gray] border-b-solid border-b-1 my-[.6rem]">
          <Text text="Password" color="black" />
          <Input
            placeholder="Enter your password"
            icon={null}
            marginY=".1rem"
            name="password"
            onchange={onchange}
          />
        </div>
        <Btn
          title="Save"
          bgColor="#2f80ed"
          color="#fff"
          borderRadius="10px"
          borderColor="#2f80ed"
          width="6rem"
          height="2.7rem"
          icon={
            /*<AiOutlineCheckCircle style={{color:"red"
    }}></AiOutlineCheckCircle>*/
            null
          }
          onclickHandler={submitUpdate}
        ></Btn>
      </div>
    </div>
  );
};
export default EditPage;
