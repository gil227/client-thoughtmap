import React, {useState} from "react";
import {signupAPI} from "../api/auth.ts";
import {Link} from "react-router";
import {CLIENT_PASS} from "../constant/constant.ts";

function PagesSignup(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isError, setIsError] = useState<boolean | undefined>();

    const onSignup = async (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const result = await signupAPI({
                email,
                password
            });

            if(!result.success) setIsError(true);
            return setIsError(false);
        } catch(e) {
            setIsError(true);
            throw e;
        }
    }

    return <>
        <form onSubmit={onSignup}>
            <label>아이디</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            <label>비밀번호</label>
            <input type="password" value={password} onChange={e=> setPassword(e.target.value)}/>
            <button type={'submit'}>가입하기</button>
            {isError && (<p>가입실패</p>)}
            {isError !== undefined && !isError && (<>
                <p>가입성공</p>
                <Link to={CLIENT_PASS.LOGIN}>로그인하러가기</Link>
            </>)}
        </form>
    </>
}

export default PagesSignup