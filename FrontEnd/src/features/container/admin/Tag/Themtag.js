import { Button } from '@material-ui/core'
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addtag, tagData, updatetag } from './tagSlice';

function Themtag(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({ status: 1, name: '', idsua: '' });
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const actionResult = async () => { await dispatch(tagData()) }
    const history = useHistory()
    const tag = useSelector(state => state.tags.tag.data.find(x => x.id === +id));
    useEffect(() => {
        if (id) {
            setState({
                status: tag.status,
                name: tag.name,
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
                dispatch(updatetag(state));
            } else {
                const action = addtag(state);
                dispatch(action);
            }
            setTimeout(() => {
                actionResult();
            }, 700);
            history.push("/admin/tag");
        }
    }
    return (
        <div id="admin">
            <div className="heading">
                <h4>{id ? "Sửa tag" : "Thêm tag"}</h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                <form action="" method="post" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Tên tag</label>
                        <input type="text" name="name" value={name} onChange={onChange} className="form-control w-50" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div className="text-center mtb"><Button type="submit" color="primary" variant="contained">{id ? "Sửa tag" : "Thêm tag"}</Button></div>
                </form>
            </div>
        </div>
    )
}

Themtag.propTypes = {

}

export default Themtag