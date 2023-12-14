import React, { useState } from 'react'
import style from './login.module.css';
import app_logo from '../../assets/user.png';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { loginFun } from '../../redux/actions/authAction';
import { NavLink } from 'react-router-dom';
import { HiOutlineMailOpen } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";


const Login = () => {
    const [eye, seteye] = useState(true);
    const dispatch = useDispatch();
    const [password, setpassword] = useState("password");

    const Eye = () => {
        if (password === "password") {
            setpassword("text");
            seteye(false);
        }
        else {
            setpassword("password");
            seteye(true);
        }
    };

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: 'mnj123@gmail.com',
        password: '123456'
    });

    const handleChange = (e) => {
        setError(false);
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const loginNow = (event) => {
        event.preventDefault();
        setLoading(true);
        dispatch(loginFun(user))

    }

    return (
        <div className={style.container}>
            <div className={style.login_form}>
                <div className={style.profile}>
                    <img src={app_logo} alt='img' />
                </div>
                <div className={style.title}>
                    <span> Sign In </span>
                </div>
                <form onSubmit={loginNow}>
                    <div >
                        <label >Email</label>
                        <div>
                            <HiOutlineMailOpen className={style.email_icon} />
                            <input type="text" placeholder="Enter Username"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label>Password</label>
                        <RiLockPasswordLine className={style.pswd_icon} />
                        <input type={password} placeholder="Enter Password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={style.toggle_pswd_eye}>
                        <div className={style.bird_eye}>
                            {eye &&
                                <BsEyeSlash onClick={Eye} />
                            }
                            {!eye &&
                                <BsEye onClick={Eye} />
                            }
                        </div>
                    </div>
                    {error &&
                        <div className='d-flex justify-content-center mt-3 mb-2'>
                            <h6 className='text-danger '>Invalid Credentials !</h6>
                        </div>
                    }
                    <div className={style.forget}>
                        <NavLink to="">
                            <span >Forgot password?</span>
                        </NavLink>

                    </div>
                    <div className={style.my_btn}>
                        <button type="submit" >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Sign In</span>
                        </button>
                    </div>
                    <div className={style.bottoms}>
                        <div>
                            <span>Don't have account? </span>
                        </div>
                        <div>
                            <NavLink to="/signup" >
                                <span style={{ color: "blue" }} >Signup</span>
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
};

export default Login;