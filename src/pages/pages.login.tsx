import {Link, useNavigate} from "react-router";
import {useState} from "react";
import React from "react";
import {useLogin} from "../hooks/useLogin.ts";

function PagesLogin() {

    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const {login} = useLogin();
    const navigate = useNavigate();

    const onLoginHandler = async (e:React.SubmitEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            const result = await login({
                email, password
            })

            if(!result.success) {
                setIsError(true);
            }

            navigate('/canvas');
        }catch(e) {
            setIsError(true);
            throw e
        }
    }

  return (
    <form onSubmit={onLoginHandler}>
      <div>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type={'submit'}>로그인</button>
          <Link to={'/join'}>회원가입</Link>
      </div>
        {isError && <p>로그인 실패</p>}
    </form>
  )
}

export default PagesLogin
