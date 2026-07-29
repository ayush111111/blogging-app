import {Link, useNavigate} from "react-router-dom"
import { type ChangeEvent,useState } from 'react'
import type { SignupInput } from "@aaylmao/blogging-commons"
import axios from "axios";
import {BACKEND_URL} from "../config";

export const Auth = ({type}:{type:"signup"|"signin"}) => {
    // ideally divide into two components signin and signup, since signinINput is a subset, it will work
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })
    const navigate = useNavigate();
    // hooks can only be called at the top of the component, not inside functions
    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup"?"signup":"signin"}`,postInputs)
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            navigate(`/blogs`)
        }catch(e){

        }
            
        
    }
    
    return <div className="h-screen flex justify-center flex-col"> 
        {/* One below the other  (flex col), centered (justify),  */}
        <div className="flex justify-center ">
            {/* horizontal flex needed to center */}
            <div className="px-10 w-2/3" >
                {/* single div within the flex, otherwise they were horizontally besides each other */}
                <div className="text-3xl font-extrabold justify-center">
                    Create an account
                </div>
                <div className="text-slate-400"> 
                        {type == "signin" ? "Don't have an account? ": "Already have an Account? " }                    
                        <Link className="underline" to={type=="signin" ? "/signup" : "/signin"}>
                             {type == "signin"? "Sign up" : "Sign in"}
                        </Link>
                    {/* login text needs to point somewhere */}
                </div>     
                {/* Username textbox  - Enter your username*/}
                {/* Email textbox - default*/}
                {/* password */}
                {/* Sign up button */}
                {type== "signup" ? <LabelledInput label="Name" placeholder="Ayush" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }}/>  : null}
                <LabelledInput label="Username" placeholder="Ayush123" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        username: e.target.value
                    })
                }}/>        
                <LabelledInput label="Password" type={"password"} placeholder="sadfasfd" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }}/>       
            <button onClick={sendRequest} type="button" className=" mt-8 text-white w-full bg-gray-800 box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">{type}</button>

            </div>

        </div>

    </div>
}

// get it from the internet, passs the variables
// the types need to be defined

interface LabelledInputType {
    label : string,
    placeholder : string,
    onChange : (e:ChangeEvent<HTMLInputElement>)=> void;
    type?:string
}
function LabelledInput({label, placeholder, onChange, type}:LabelledInputType) {

    return <div>
           <div>
            <label id="first_name" className="block mb-2.5 text-sm font-medium text-heading">{label}</label>
            <input onChange={onChange} type={type ||"text"} id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} required />
        </div>
    
    </div>
}