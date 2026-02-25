import '../App.css'
import {Link} from "react-router";

function Login() {

  return (
    <>
      <div>
          <input type="text"/>
          <input type="password"/>
          <button>로그인</button>
          <Link to={'/join'}>회원가입</Link>
      </div>
    </>
  )
}

export default Login
