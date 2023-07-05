import { Button } from '@material-ui/core'
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { adddichvu, dichvuData, updatedichvu } from './dichvuSlice';

function Themdichvu(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({ status: 1, name: '', mota: '', loadhome: 0, icon: '', idsua: '' });
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const actionResult = async () => { await dispatch(dichvuData()) }
    const history = useHistory()
    const dichvu = useSelector(state => state.dichvus.dichvu.data.find(x => x.id === +id));
    useEffect(() => {
        if (id) {
            setState({
                status: dichvu.status,
                name: dichvu.name,
                mota: dichvu.mota,
                icon: dichvu.icon,
                loadhome: dichvu.loadhome,
                idsua: id
            })
        }
    }, [])
    const { name, mota, icon } = state;
    const onSubmit = e => {
        e.preventDefault();
        if (mota.trim() === '' || name.trim() === "") {
            message.error("Xin hãy nhập đầy đủ thông tin!");
        } else {
            if (id) {
                dispatch(updatedichvu(state));
            } else {
                const action = adddichvu(state);
                dispatch(action);
            }
            setTimeout(() => {
                actionResult();
            }, 700);
            history.push("/admin/dichvu");
        }
    }
    return (
        <div id="admin">
            <div className="heading">
                <h4>{id ? "Sửa dịch vụ" : "Thêm dịch vụ"}</h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                <form action="" method="post" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Tên dịch vụ</label>
                        <input type="text" name="name" value={name} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Icon</label>
                        <input type="text" name="icon" value={icon} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Mô tả dịch vụ</label>
                        <textarea name="mota" onChange={onChange} value={mota} cols="30" className="form-control w-50" rows="10"></textarea>
                    </div>
                    <div className="text-center mtb"><Button type="submit" color="primary" variant="contained">{id ? "Sửa dịch vụ" : "Thêm dịch vụ"}</Button></div>
                </form>
            </div>
        </div>
    )
}

Themdichvu.propTypes = {

}

export default Themdichvu