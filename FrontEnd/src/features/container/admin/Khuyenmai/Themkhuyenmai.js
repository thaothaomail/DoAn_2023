import { Button } from '@material-ui/core'
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addkhuyenmai, khuyenmaiData, updatekhuyenmai } from './khuyenmaiSlice';

function Themkhuyenmai(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({ status: 1, name: "", khuyenmai: "", idsua: '' });
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const actionResult = async () => { await dispatch(khuyenmaiData()) }
    const history = useHistory()
    const khuyenmais = useSelector(state => state.khuyenmais.khuyenmai.data.find(x => x.id === +id));
    useEffect(() => {
        if (id) {
            setState({
                status: khuyenmais.status,
                name: khuyenmais.name,
                khuyenmai: khuyenmais.khuyenmai,
                idsua: id
            })
        }
    }, [])
    const { name, khuyenmai } = state;
    const onSubmit = e => {
        e.preventDefault();
        if (name.trim() === "" || khuyenmai === "") {
            message.error("Xin hãy nhập đầy đủ thông tin!");
        } else {
            if (id) {
                dispatch(updatekhuyenmai(state));
            } else {
                const action = addkhuyenmai(state);
                dispatch(action);
            }
            setTimeout(() => {
                actionResult();
            }, 700);
            history.push("/admin/khuyenmai");
        }
    }
    return (
        <div id="admin">
            <div className="heading">
                <h4>{id ? "Sửa khuyến mãi" : "Thêm khuyến mãi"}</h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                <form action="" method="post" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Tên khuyến mãi</label>
                        <input type="text" name="name" value={name} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Phần trăm khuyến mãi</label>
                        <input type="number" name="khuyenmai" value={khuyenmai} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="text-center mtb"><Button type="submit" color="primary" variant="contained">{id ? "Sửa khuyến mãi" : "Thêm khuyến mãi"}</Button></div>
                </form>
            </div>
        </div>
    )
}

Themkhuyenmai.propTypes = {

}

export default Themkhuyenmai