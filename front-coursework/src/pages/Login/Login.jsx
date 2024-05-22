import { useStore } from "../../store/store.jsx";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../routes.jsx";
import { useState } from "react";
import PassShow from '../../assets/img/pass-open.svg';
import PassHide from '../../assets/img/pass-close.svg';
import './Login.scss';
import { EmailRegex, PasswordRegex } from "../../assets/data/regexp.jsx";

const Login = () => {
  const [, setState] = useStore();
  const [passType, setPassType] = useState("password");
  const [formLogin, setFormLogin] = useState({
    email: {
      value: '',
      touched: false,
      error: null
    },
    password: {
      value: '',
      touched: false,
      error: null
    },
  })
  const navigate = useNavigate();
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('signedIn', 'true')
    setState(prevState => {
      return {
        ...prevState,
        user: { ...prevState.user, roleId: 1, userName: 'Admin', email: 'admin@gmail.com'}
      }
    })
    navigate(paths.receptions);
  }
  
  return (<>
    <div className="login-container">
      <div className="form-login-container">
          <form className="form-login" onSubmit={handleFormSubmit}>
          <h1 className="form-login__heading">
            Welcome back!
          </h1>
          <div className="form-login__input-container">
            <input
              className="form-login__input"
              name="email"
              type="text"
              placeholder="Email"
              value={formLogin.email.value} onChange={(e) => {
              setFormLogin(prevState => {
                return {
                  ...prevState,
                  email: {
                    ...prevState.email,
                    value: e.target.value,
                    touched: true,
                    error: EmailRegex.test(e.target.value) ? null : 'Invalid email'
                  }
                }
              })
            }}
              required/>
            {(formLogin.email.error && formLogin.email.touched) &&
              <p className="form-login__invalid-text">{formLogin.email.error}</p>}
            <div className="form-login__pass-container">
              <input
                className="form-login__input"
                name="password"
                type={passType}
                placeholder="Password"
                minLength={6}
                value={formLogin.password.value} onChange={(e) => {
                setFormLogin(prevState => {
                  return {
                    ...prevState,
                    password: {
                      ...prevState.password,
                      value: e.target.value,
                      touched: true,
                      error: PasswordRegex.test(e.target.value) ? null
                        : 'Invalid password'
                    }
                  }
                })
              }}
                required/>
              <button className="form-login__eye-button" type="button" onClick={() => {
                passType === "text" ? setPassType("password") : setPassType("text")
              }}>
                <img className="form-login__eye-icon" src={passType === "text" ? PassShow : PassHide} alt="ico"/>
              </button>
            </div>
            {(formLogin.password.error && formLogin.password.touched) &&
              <p className="form-login__invalid-text">{formLogin.password.error}</p>}
              <p className="form-login__register-text">
                  Don't have an account yet?
                  <Link className="form-login__register-link" to={paths.register}>Register</Link>
              </p>
          </div>
          <button className="form-login__button-login">Log In</button>
        </form>
      </div>
    </div>
  </>)
}

export default Login;