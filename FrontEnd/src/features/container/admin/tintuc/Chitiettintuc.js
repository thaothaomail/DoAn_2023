import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd';
import renderHTML from 'react-render-html';
function Chitiettintuc(props) {
    const { id } = useParams();
    const loading = useSelector(state => state.tintucs.loading);
    const tintuc = useSelector(state => state.tintucs.tintuc.data.find(x => x.id === +id));
    return (
        <div id="admin">
            <div className="heading">
                <h4>Chi tiết tin tức</h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                <div className="ct">
                    {loading ? <div className="spin"><Spin className="mt-5" /></div> :
                        <div>
                            <p>Tên tin tức:&emsp; <b><i>{tintuc.name}</i></b></p>
                            <p>Ảnh bìa:</p>
                            <div className="text-center"><img width="500px" height="400px" src={tintuc.anh} alt="" /></div>
                            <p>Tên tác giả:&emsp; <b><i>{tintuc.tacgia}</i></b></p>
                            <p>Ngày đăng:&emsp; <b><i>{tintuc.createdAt}</i></b></p>
                            <p>Facebook:&emsp; <i>{tintuc.facebook}</i></p>
                            <p>Twitch:&emsp; <i>{tintuc.twitch}</i></p>
                            <p>Instagram:&emsp; <i>{tintuc.instagram}</i></p>
                            <p>Tóm tắt:&emsp;</p>
                            <div className="container">
                                <p>{tintuc.tomtat}</p>
                            </div>
                            <p>Nội dung:</p>
                            <div className="container">
                                <p>{renderHTML(tintuc.content)}</p>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}

Chitiettintuc.propTypes = {

}

export default Chitiettintuc



