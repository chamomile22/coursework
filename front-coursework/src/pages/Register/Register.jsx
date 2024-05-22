import { useStore } from "../../store/store.jsx";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../routes.jsx";
import { Fragment, useState } from "react";
import dayjs from "dayjs";
import { combinedPhoneRegex, EmailRegex, nameRegex, PasswordRegex } from "../../assets/data/regexp.jsx";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatepickerTheme } from "../../assets/data/DatepickerTheme.jsx";
import CalendarIcon from '../../assets/img/calendar.svg';
import PassShow from '../../assets/img/pass-open.svg';
import PassHide from '../../assets/img/pass-close.svg';
import './Register.scss';

const Register = () => {
  const [, setState] = useStore();
  const navigate = useNavigate();
  const maxDateOfBirth = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
  const [date, setDate] = useState(dayjs(maxDateOfBirth));
  
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  
  const [passType, setPassType] = useState("password");
  const [confirmPassType, setConfirmPassType] = useState("password");
  
  const [formRegister, setFormRegister] = useState({
    name: {
      value: '',
      touched: false,
      error: null
    },
    telephone: {
      value: '',
      touched: false,
      error: null
    },
    specialty: {
      value: '',
      touched: false,
      error: null
    },
    department: {
      value: '',
      touched: false,
      error: null
    },
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
    confirmPassword: {
      value: '',
      touched: false,
      error: null
    },
  })
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('signedIn', 'true')
    setState(prevState => {
      return {
        ...prevState,
        user: { ...prevState, roleId: 1 }
      }
    })
    navigate(paths.receptions);
  }
  
  return (
    <div className="register-container">
      <div className="form-register-container">
        <form className="form-register" onSubmit={handleFormSubmit}>
          <h1 className="form-register__heading">Welcome!</h1>
          <div className="form-register__input-container">
            <input
              className="form-register__input"
              name="name"
              type="text"
              placeholder="Name"
              value={formRegister.name.value} onChange={(e) => {
              setFormRegister(prevState => {
                return {
                  ...prevState,
                  name: {
                    ...prevState.name,
                    value: e.target.value,
                    touched: true,
                    error: nameRegex.test(e.target.value.replace(/\s/g, '')) && e.target.value.replace(/\s/g, '') ? null : 'Invalid name'
                  }
                }
              })
            }}
              required/>
            {(formRegister.name.error && formRegister.name.touched) &&
              <p className="form-register__invalid-text">{formRegister.name.error}</p>}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={DatepickerTheme}>
                <DatePicker
                  label=""
                  views={["year", "month", "day"]}
                  maxDate={dayjs(maxDateOfBirth)}
                  value={date}
                  onChange={(value) => {
                    setDate(dayjs(value));
                  }}
                  onError={(error) => {
                    if (error === 'maxDate') {
                      setDate(dayjs(maxDateOfBirth));
                    }
                  }}
                  closeOnSelect={false}
                  slots={{
                    openPickerIcon: () => <img alt="ico" src={CalendarIcon} style={{ width: 17, height: 17 }}/>,
                  }}
                  slotProps={{
                    textField: {
                      placeholder: 'Date of Birth'
                    }
                  }}
                  format={'DD.MM.YYYY'}
                  sx={{
                    width: '100%',
                    height: 36,
                    border: '1px solid #A2AEB6',
                    borderRadius: '4px',
                    padding: '8px 10px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      opacity: 1,
                      color: '#A2AEB6',
                    },
                    '& .MuiIconButton-root': {
                      padding: 0,
                      color: '#03ACF2'
                    },
                    '& .MuiOutlinedInput-root': {
                      paddingRight: 0
                    },
                    '& .MuiOutlinedInput-input': {
                      fontSize: '13px',
                      padding: 0
                    },
                    '& .MuiInputLabel-root': {
                      color: '#0000001F'
                    },
                    '& .MuiInputAdornment-root': {
                      width: 24,
                    },
                  }}
                />
              </ThemeProvider>
            </LocalizationProvider>
            <input
              className="form-register__input"
              name="telephone"
              type="text"
              placeholder="Telephone"
              maxLength={14}
              value={formRegister.telephone.value}
              onChange={(e) => {
                const { value } = e.target;
                setFormRegister(prevState => {
                  return {
                    ...prevState,
                    telephone: {
                      ...prevState.telephone,
                      value: value,
                      touched: true,
                      error: combinedPhoneRegex.test(e.target.value) ? null
                        : 'Invalid phone, use  "(###) ###-####" or "+###########" format'
                    }
                  }
                })
              }}
              required/>
            {(formRegister.telephone.error && formRegister.telephone.touched) &&
              <p className="form-register__invalid-text">{formRegister.telephone.error}</p>}
            <input
              className="form-register__input"
              name="email"
              type="text"
              placeholder="Email"
              value={formRegister.email.value} onChange={(e) => {
              setFormRegister(prevState => {
                return {
                  ...prevState,
                  email: {
                    ...prevState.email,
                    value: e.target.value,
                    touched: true,
                    error: EmailRegex.test(e.target.value) ? null : 'Invalid email, must be like example@gmail.com'
                  }
                }
              })
            }}
              required/>
            {(formRegister.email.error && formRegister.email.touched) &&
              <p className="form-register__invalid-text">{formRegister.email.error}</p>}
            <div className="form-register__pass-container">
              <input
                className="form-register__input"
                name="password"
                type={passType}
                placeholder="Password"
                minLength={6}
                value={formRegister.password.value} onChange={(e) => {
                setFormRegister(prevState => {
                  return {
                    ...prevState,
                    password: {
                      ...prevState.password,
                      value: e.target.value,
                      touched: true,
                      error: PasswordRegex.test(e.target.value) ? null
                        : 'Password must include at least 1 uppercase, 1 lowercase, 1 number and 1 symbol'
                    },
                    confirmPassword: {
                      ...prevState.confirmPassword,
                      error: PasswordRegex.test(e.target.value) && formRegister.confirmPassword.value.trim() === e.target.value.trim() ? null
                        : 'Password does not match'
                    }
                  }
                })
              }}
                required/>
              <button className="form-register__eye-button" type="button" onClick={() => {
                passType === "text" ? setPassType("password") : setPassType("text")
              }}>
                <img className="form-register__eye-icon" src={passType === "text" ? PassShow : PassHide} alt="ico"/>
              </button>
            </div>
            {(formRegister.password.error && formRegister.password.touched) &&
              <p className="form-register__invalid-text">{formRegister.password.error}</p>}
            <div className="form-register__pass-container">
              <input
                className="form-register__input"
                name="confirmPassword"
                type={confirmPassType}
                placeholder="Confirm password"
                minLength={6}
                value={formRegister.confirmPassword.value} onChange={(e) => {
                setFormRegister(prevState => {
                  return {
                    ...prevState,
                    confirmPassword: {
                      ...prevState.confirmPassword,
                      value: e.target.value,
                      touched: true,
                      error: PasswordRegex.test(e.target.value) && formRegister.password.value.trim() === e.target.value.trim() ? null
                        : 'Password does not match'
                    }
                  }
                })
              }}
                required/>
              <button className="form-register__eye-button" type="button" onClick={() => {
                confirmPassType === "text" ? setConfirmPassType("password") : setConfirmPassType("text")
              }}>
                <img className="form-register__eye-icon" src={confirmPassType === "text" ? PassShow : PassHide}
                     alt="ico"/>
              </button>
            </div>
            {(formRegister.confirmPassword.error && formRegister.confirmPassword.touched) &&
              <p className="form-register__invalid-text">{formRegister.confirmPassword.error}</p>}
            <p className="form-register__login-text">
              Already have an account?
              <Link className="form-register__login-link" to={paths.login}>Log in</Link>
            </p>
          </div>
          <button className="form-register__button-submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register;