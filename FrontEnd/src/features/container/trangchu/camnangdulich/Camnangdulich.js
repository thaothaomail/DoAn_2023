import React, { Component } from "react";
import { useSelector } from "react-redux";
import "./camnang.css";

function Camnangdulich(props) {
  const camnangs = useSelector(state => state.camnangdulichs.camnangdulich.data);
  var camnang = [];
  if (camnangs) {
    for (let i = 0; i < camnangs.length; i++) {
      if (camnangs[i].status === 1) {
        camnang.push(camnangs[i])
      }
    }
  }
  return (
    <div className=" mt-3" id="camnang">
      <div className="heading text-center">
        <span>cẩm nang du lịch</span>
        <div className="hr"></div>
        <p className="mb-4">
          Tất cả những thông tin hữu ích mà bạn cần để thêm vào vào hành trang
          du lịch của mình
      </p>
      </div>
      <div className="container">
        <div className="row justify-content-center ">
          {!camnang ? '' :
            camnang.map(ok => (
              <div className="col-md-3" key={ok.id}>
                <div className="head_cn">
                  <i className={ok.icon}></i>
                </div>
                <div className="content_cn text-center">
                  <p className="text-center">{ok.name}</p>
                  <span>
                    {ok.content}
                  </span>
                </div>
              </div>

            ))
          }
        </div>
      </div>
    </div>

  )
}

Camnangdulich.propTypes = {

}

export default Camnangdulich