import { Button } from '@material-ui/core'
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addloaitour, loaitourData, updateloaitour } from './loaitourSlice';

function Themloaitour(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({ status: 1, name: '', idsua: '' });
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const actionResult = async () => { await dispatch(loaitourData()) }
    const history = useHistory()
    const loaitour = useSelector(state => state.loaitours.loaitour.data.find(x => x.id === +id));
    useEffect(() => {
        if (id) {
            setState({
                status: loaitour.status,
                name: loaitour.name,
                idsua: id
            })
        }
    }, [])
    const { name } = state;
    const onSubmit = e => {
        e.preventDefault();
        if (name.trim() === "") {
            message.error("Xin hãy nhập đầy đủ thông tin!");
        } else {
            if (id) {
                dispatch(updateloaitour(state));
            } else {
                const action = addloaitour(state);
                dispatch(action);
            }
            setTimeout(() => {
                actionResult();
            }, 700);
            history.push("/admin/loaitour");
        }
    }
    return (
        <div id="admin">
            <div className="heading">
                <h4>{id ? "Sửa loại tour" : "Thêm loại tour"}</h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                <form action="" method="post" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Tên loại tour</label>
                        <input type="text" name="name" value={name} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="text-center mtb"><Button type="submit" color="primary" variant="contained">{id ? "Sửa loại tour" : "Thêm loại tour"}</Button></div>
                </form>
            </div>
        </div>
    )
}

Themloaitour.propTypes = {

}

export default Themloaitour