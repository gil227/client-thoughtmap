import '../App.css'
import {Link} from "react-router";
import {useState} from "react";
import React from "react";
import {useLogin} from "../hooks/useLogin.ts";

function PagesLogin() {

    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const {login} = useLogin();


    const onLoginHandler = async (e:React.SubmitEvent<HTMLFormElement>) =>{
        e.preventDefault();
        await login({
            email, password
        })
    }

  return (
    <form onSubmit={onLoginHandler}>
      <div>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type={'submit'}>로그인</button>
          <Link to={'/join'}>회원가입</Link>
      </div>
    </form>
  )
}

export default PagesLogin
