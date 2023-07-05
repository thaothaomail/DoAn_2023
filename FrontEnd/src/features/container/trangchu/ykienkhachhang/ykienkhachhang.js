import { Avatar, Rate } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import "./ykien.css";
import Fade from 'react-reveal/Fade';

function Ykienkhachhang(props) {
  const binhluans = useSelector(state => state.binhluans.binhluan.data);
  var binhluan = [];
  if (binhluans) {
    for (let i = 0; i < binhluans.length; i++) {
      if (binhluans[i].status === 1 && binhluans[i].loadhome === 1) {
        binhluan.push(binhluans[i])
      }
    }
  }
  return (
    <div id="ykien">
      <div className="fixed-background ">
        <div className="dark">
          <div className="mt-5 tour" >
            <div className="heading text-center pt-5">
              <span>ý kiến khách hàng</span>
              <div className="hr"></div>
              <p className="mb-4">
                Những đánh giá của khách hàng sau khi trải nghiệm đặt tour trên
                website.
      </p>
            </div>
            <div className="container">
              <Fade bottom>
                <div className="row justify-content-center pb-5">
                  {!binhluans ? '' :
                    binhluan.map(ok => (
                      <div className="col-md-4" key={ok.id}>
                        <div className="content-yk text-center rounded ">
                          <p>
                            <i className="fa fa-quote-left mr-3"></i>
                            {ok.binhluan}
                            <i className="fa fa-quote-right ml-3"></i>
                          </p>
                        </div>
                        <div className="avatar-yk text-center">
                          <Avatar
                            src={ok.User.avatar ? ok.User.avatar : "data:image/jpeg;base64,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"}
                            className="mt-3 mb-2"
                          />
                          <br />
                          <strong>{ok.User.name}</strong><br />
                          <Rate value={ok.star} disabled />
                        </div>
                      </div>

                    ))}
                </div>

              </Fade>
            </div>
            <div className="fixed-wrap">
              <div className="fixed"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

Ykienkhachhang.propTypes = {

}

export default Ykienkhachhang