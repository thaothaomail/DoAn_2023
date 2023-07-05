import { Button } from '@material-ui/core'
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addlienhe, lienheData, updatelienhe } from './lienheSlice';

function Themlienhe(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({ status: 1, sdt: '', email: '', content: '', diachi: '', idsua: '' });
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const actionResult = async () => { await dispatch(lienheData()) }
    const history = useHistory()
    const lienhe = useSelector(state => state.lienhes.lienhe.data.find(x => x.id === +id));
    useEffect(() => {
        if (id) {
            setState({
                status: lienhe.status,
                email: lienhe.email,
                diachi: lienhe.diachi,
                sdt: lienhe.sdt,
                content: lienhe.content,
                idsua: id
            })
        }
    }, [])
    const { sdt, email, diachi, content } = state;
    const onSubmit = e => {
        e.preventDefault();
        if (email.trim() === "" || sdt.trim() === "" || diachi.trim() === "") {
            message.error("Xin hãy nhập đầy đủ thông tin!");
        } else {
            if (id) {
                dispatch(updatelienhe(state));
            } else {
                const action = addlienhe(state);
                dispatch(action);
            }
            setTimeout(() => {
                actionResult();
            }, 700);
            history.push("/admin/lienhe");
        }
    }
    return (
        <div id="admin">
            <div className="heading">
                <h4>{id ? "Sửa liên hệ" : "Thêm liên hệ"}</h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                <form action="" method="post" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" value={email} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Số điện thoại</label>
                        <input type="text" name="sdt" value={sdt} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Địa chỉ</label>
                        <input type="text" name="diachi" value={diachi} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Giới thiệu</label>
                        <textarea name="content" value={content} max="500" onChange={onChange} className="form-control w-50" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="text-center mtb"><Button type="submit" color="primary" variant="contained">{id ? "Sửa liên hệ" : "Thêm liên hệ"}</Button></div>
                </form>
            </div>
        </div>
    )
}

Themlienhe.propTypes = {

}

export default Themlienhe