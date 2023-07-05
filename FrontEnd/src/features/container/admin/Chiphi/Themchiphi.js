import { Button } from '@material-ui/core'
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addchiphi, chiphiData, updatechiphi } from './chiphiSlice';

function Themchiphi(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({ money: 0, title: '', idsua: '' });
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const actionResult = async () => { await dispatch(chiphiData()) }
    const history = useHistory()
    const chiphi = useSelector(state => state.chiphis.chiphi.data.find(x => x.id === +id));
    useEffect(() => {
        if (id) {
            setState({
                title: chiphi.title,
                money: chiphi.money,
                idsua: id
            })
        }
    }, [])
    const { title, money } = state;
    const onSubmit = e => {
        e.preventDefault();
        if (title.trim() === "") {
            message.error("Xin hãy nhập đầy đủ thông tin!");
        } else {
            if (id) {
                dispatch(updatechiphi(state));
            } else {
                const action = addchiphi(state);
                dispatch(action);
            }
            setTimeout(() => {
                actionResult();
            }, 700);
            history.push("/admin/chiphi");
        }
    }
    return (
        <div id="admin">
            <div className="heading">
                <h4>{id ? "Sửa chi phí" : "Thêm chi phí"}</h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                <form action="" method="post" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Tên chi phí</label>
                        <input type="text" name="title" value={title} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Thành tiền</label>
                        <input type="number" name="money" min="0" value={money} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="text-center mtb"><Button type="submit" color="primary" variant="contained">{id ? "Sửa chi phí" : "Thêm chi phí"}</Button></div>
                </form>
            </div>
        </div>
    )
}

Themchiphi.propTypes = {

}

export default Themchiphi