import React,{useState} from "react";

const Login = () =>{

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    
    async function Add_User() {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
              "username":username,
              "password":password
            }),
          };
          
          await fetch("http://127.0.0.1:8000/login/", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
            setUsername("")
            setPassword("")
        }   

    return(
        <div>
            <input onChange={(e)=>setUsername(e.target.value)}type="text" placeholder="Username"/><br /><br />
            <input onChange={(e)=>setPassword(e.target.value)}type="text" placeholder="Password"/><br /><br />
            <button type="submit" onClick={Add_User}> Login</button><br /><br />
            <a href="http://localhost:3000/signup"><button>Sign up</button></a>
        </div>
    )
}
export default Login