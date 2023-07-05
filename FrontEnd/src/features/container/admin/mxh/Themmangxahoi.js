import { Button } from '@material-ui/core'
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { addmangxahoi, mangxahoiData, updatemangxahoi } from './mangxahoiSlice';
function Themmangxahoi(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({ status: 1, name: '', color: '', icon: '', link: '', idsua: '' });
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const mangxahoi = useSelector(state => state.mangxahois.mangxahoi.data.find(x => x.id === +id));
    useEffect(() => {
        if (id) {
            setState({
                status: mangxahoi.status,
                name: mangxahoi.name,
                icon: mangxahoi.icon,
                color: mangxahoi.color,
                link: mangxahoi.link,
                idsua: id
            })
        }
    }, [])
    const { name, color, link, icon } = state;
    const actionResult = async () => { await dispatch(mangxahoiData()) }
    const history = useHistory()
    const onSubmit = e => {
        e.preventDefault();
        if (name.trim() === "" || color.trim() === "" || link.trim() === "" || icon.trim() === "") {
            message.error("Xin hãy nhập đầy đủ thông tin!");
        } else {
            if (id) {
                dispatch(updatemangxahoi(state));
            } else {
                const action = addmangxahoi(state);
                dispatch(action);
            }
            setTimeout(() => {
                actionResult();
            }, 700);
            history.push("/admin/mangxahoi");
        }
    }
    return (
        <div id="admin">
            <div className="heading">
                <h4>{id ? "Sửa mạng xã hội" : "Thêm mạng xã hội"}</h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                <form action="" method="post" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Tên mạng xã hội</label>
                        <input type="text" name="name" value={name} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">icon</label>
                        <input type="text" name="icon" value={icon} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Mã màu</label>
                        <input type="text" name="color" value={color} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Link</label>
                        <input type="text" name="link" value={link} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="text-center mtb"><Button type="submit" variant="contained" color="primary">{id ? "Sửa mạng xã hội" : "Thêm mạng xã hội"}</Button></div>
                </form>
            </div>
        </div>
    )
}

Themmangxahoi.propTypes = {

}

export default Themmangxahoi