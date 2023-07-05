import React, { useState } from 'react'
import './login.css'
import tk from './../../images/tk.png'
import mk from './../../images/mk.png'
import { BrowserRouter as Router, Link, useHistory, Redirect } from 'react-router-dom'
import { Button } from '@material-ui/core';
import firebase from "firebase"
import { StyledFirebaseAuth } from 'react-firebaseui'
import { message } from 'antd'
import { checklogin, inforData } from "./inforSlice"
import { useDispatch } from 'react-redux'
import axios from 'axios'
import loginApi from '../../../api/loginApi'
import { userData } from '../admin/taikhoan/taikhoanSlice'
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
};
function Login(props) {
    const [state, setState] = useState({ email: '', password: '' })
    const { email, password } = state
    const actionuser = async () => { await dispatch(userData()) }
    const dispatch = useDispatch()
    const actioninfor = async () => { await dispatch(inforData()) }
    const onsubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            message.warning("Email không đúng định dạng!")
        } else {
            if (email.trim() === "" || password.trim() === "") {
                message.warning("Bạn chưa nhập đầy đủ thông tin!");
            } else {
                var token = await loginApi.login({ email: email, password: password }).then(data => {
                    return data
                })
                if (token !== "err") {
                    localStorage.setItem("token", token)
                    actioninfor()
                    message.success("Đăng nhập thành công!");
                    history.push('/')
                } else {
                    message.warning("Sai tên đăng nhập hoặc mật khẩu!")
                }
            }
        }
    }
    const onchange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const history = useHistory()
    const hangdleDK = () => {
        history.push('/dangky')
    }
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    return (
        <Router>
            <div id="login">
                <div className="box-login">
                    <form className="form" onSubmit={onsubmit}>
                        <h3 className="text-uppercase text-white text-center pb-3">Đăng nhập </h3>
                        <div className="input-group flex-nowrap">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping">
                                    <img src={tk} className="img-login float-left" alt="" />
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="Tài khoản" value={email} name='email' onChange={onchange} aria-label="email" aria-describedby="addon-wrapping" />
                        </div>

                        <div className="input-group flex-nowrap mt-3 mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping">
                                    <img src={mk} className="img-login float-left" alt="" />
                                </span>
                            </div>
                            <input type="password" className="form-control" placeholder="Mật khẩu" value={password} name="password" onChange={onchange} aria-label="email" aria-describedby="addon-wrapping" />
                        </div>

                        <div className="form-group form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" onChange="onclick" /> <span className="text-light">Nhớ mật khẩu</span>
                            </label>
                            <Link to="#" onClick={hangdleDK} className="float-right text-light">Chưa có tài khoản?</Link>
                        </div>
                        <Button type="submit" variant="contained" color="primary" className="w-100 mb-4">Đăng nhập</Button>
                    </form>
                    <p className="or">OR</p>
                    <div className="mxh mt-3">
                        <Button variant="contained" color="primary" className="text-capitalize mb-3">
                            <i className="fab fa-facebook-f mr-4"></i> Facebook
                        </Button>
                        <Button variant="contained" color="primary" className="text-capitalize float-right mb-3 twitter">
                            <i className="fab fa-twitter mr-4"></i> Twitter
                        </Button>
                        <Button variant="contained" color="primary" className="text-capitalize mb-3 google">
                            <i className="fab fa-google mr-4"></i> Google
                        </Button>
                        <Button variant="contained" color="primary" className="text-capitalize instagram float-right mb-3">
                            <i className="fab fa-instagram mr-4"></i> Instagram
                        </Button>
                    </div>
                </div>
            </div>
        </Router>

    )
}

Login.propTypes = {

}

export default Login


