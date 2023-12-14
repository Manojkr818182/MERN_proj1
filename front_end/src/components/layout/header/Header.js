import React from 'react';
import styles from './header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import icon_setting from '../../../assets/Icon-setting.png';
import Swal from 'sweetalert2';
import { logoutFun } from '../../../redux/actions/authAction';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();
    const pathname = useLocation().pathname;
    const logoutNow = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,Logout"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logoutFun());
            }
        });
    };
    return (
        <div className={styles.container}>
            <div className={styles.navigations}>
                {/* <div>
                    <span>Brand name</span>
                </div> */}
                <div className={styles.menu}>
                    <ul>
                        <li><Link to="/home" className={(pathname === "/home") ? styles.active_link : styles.link}> Home</Link></li>
                        <li><Link to="/about" className={(pathname === "/about") ? styles.active_link : styles.link}>About</Link></li>
                        <li><Link to="/service" className={(pathname === "/service") ? styles.active_link : styles.link}>Services</Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.drop_menu}>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-custom-components" className={styles.drop_menu_tog}>
                        <img src={icon_setting} width="30px" height="30px" alt="usr" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={styles.dropdown_menu}>
                        <Dropdown.Item className={styles.dropdown_menu_item}  >
                            Profile
                        </Dropdown.Item>
                        <Dropdown.Item className={styles.dropdown_menu_item} onClick={logoutNow} >
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default Header;
