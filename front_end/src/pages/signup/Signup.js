import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './signup.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { registerAction } from '../../redux/actions/registrationAction';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
    const {errors} = useSelector((state) =>state.userReg)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [eye, seteye] = useState(true);
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
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        // setErrors({});
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const SignupFun = (event) => {
        event.preventDefault();
        dispatch(registerAction(user));
        console.log()
        // setLoading(true);
        // event.preventDefault();
        // axios.post('http://192.168.0.110:6060/api/signup', user).then((res) => {
        //     setLoading(false);
        //     if (res.data.code === 1) {
        //         Swal.fire({
        //             icon: "success",
        //             title: "Registered Successfully",
        //             showConfirmButton: false,
        //             timer: 1000
        //         });
        //         navigate('/')
        //     } else if (res.data.code === 111) {
        //         setErrors({ ...errors, ['phone']: res.data.message });
        //     } else if (res.data.code === 112) {
        //         setErrors({ ...errors, ['email']: res.data.message });
        //     } else {

        //     }

        // })
    }

    return (
        <div className={styles.container}>
            <div className={styles.signup_form}>
                <div className={styles.title}>
                    <span> Create Account </span>
                </div>
                <form onSubmit={SignupFun}>
                    <div >
                        <label >First Name</label>
                        <div>
                            <input type="text" placeholder="Enter First Name"
                                name="first_name"
                                value={user.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div >
                        <label >Last Name</label>
                        <div>
                            <input type="text" placeholder="Enter Last Name"
                                name="last_name"
                                value={user.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div >
                        <label >Email</label>
                        <div>
                            <input type="text" placeholder="Enter Email address"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                            {errors?.email &&
                                <p className='text-danger'>{errors?.email}</p>
                            }
                        </div>
                    </div>
                    <div >
                        <label >Phone Number</label>
                        <div>
                            <input type="text" placeholder="Enter Phone number"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                required
                            />
                            {errors?.phone &&
                                <p className='text-danger'>{errors?.phone}</p>
                            }
                        </div>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type={password} placeholder="Enter Password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.toggle_pswd_eye}>
                        <div className={styles.bird_eye}>
                            {eye &&
                                <BsEyeSlash onClick={Eye} />
                            }
                            {!eye &&
                                <BsEye onClick={Eye} />
                            }
                        </div>
                    </div>
                    <div className={styles.my_btn}>
                        <button type="submit" >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>SignUp</span>
                        </button>
                    </div>
                    <div className={styles.bottoms}>
                        <div>
                            <span>Already have account ?</span>
                        </div>
                        <div>
                            <NavLink to="/">
                                <span styles={{ color: "blue" }} >SignIn</span>
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Signup;
