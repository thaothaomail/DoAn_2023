import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function Chitietbinhluan(props) {
  const { id } = useParams();
  const binhluan = useSelector((state) => {
    if (state.binhluans.binhluan.data) {
      return state.binhluans.binhluan.data.find((x) => x.id === +id);
    } else {
      return "ko";
    }
  });
  return (
    <div id="admin">
      <div className="heading">
        <h4>Chi tiết bình luận</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="ct">
          {binhluan === "ko" ? (
            <div className="spin">
              <Spin />
            </div>
          ) : (
            <div>
              <p>
                Tên tour:&emsp;{" "}
                <b>
                  <i>{binhluan.Tour.name}</i>
                </b>
              </p>
              <p>
                Tên tài khoản bình luận:&emsp;
                <b>
                  <i>{binhluan.User.name}</i>
                </b>
              </p>
              <p>
                Số điểm đánh giá:&emsp;
                <b>
                  <i>{binhluan.star}</i>
                </b>
              </p>
              <p>Bình luận:&emsp;</p>
              <div className="container">{binhluan.binhluan}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Chitietbinhluan.propTypes = {};

export default Chitietbinhluan;
