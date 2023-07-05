import { Rate, Spin, Tooltip } from "antd";
import { getDate } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Tour.css";
function Tourtrongnuoc(props) {
  const tours = useSelector((state) => state.tours.tour.data);
  const tour = [];
  const formatdate = (e) => {
    if (e) {
      var ngay = e.substr(0, 2);
      var thang = e.substr(3, 2);
      var nam = e.substr(6, 4);
      return nam + "-" + thang + "-" + ngay;
    }
  };
  const maxDate = (e) => {
    if (e) {
      var ngayMax = formatdate(e[0].ngay);
      for (let i = 0; i < e.length; i++) {
        if (ngayMax <= formatdate(e[i].ngay)) {
          ngayMax = formatdate(e[i].ngay);
        }
      }
      return ngayMax;
    }
  };
  if (tours) {
    var sort = [];
    for (let i = 0; i < tours.length; i++) {
      sort.unshift(tours[i]);
    }
    var date = new Date();
    var today =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 > 10
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "-" +
      (date.getDate() > 10 ? date.getDate() : "0" + date.getDate());
    for (let i = 0; i < sort.length; i++) {
      if (
        sort[i].status === 1 &&
        sort[i].vitri === 1 &&
        tour.length < 6 &&
        maxDate(sort[i].Ngaydis) >= today
      ) {
        tour.push(sort[i]);
      }
    }
  }
  const binhluans = useSelector((state) => state.binhluans.binhluan.data);
  const tinhdiem = (id) => {
    var binhluanload = [];
    if (binhluans) {
      for (let i = 0; i < binhluans.length; i++) {
        if (binhluans[i].status === +1 && binhluans[i].tourId === id) {
          binhluanload.push(binhluans[i]);
        }
      }
    }
    var tong = new Number();
    if (binhluans) {
      for (let i = 0; i < binhluanload.length; i++) {
        tong += binhluanload[i].star;
      }
    }
    var diem = Math.round((tong / +binhluanload.length) * 10) / 10;
    if (isNaN(diem)) {
      diem = 0;
    }
    return diem;
  };
  const tinhkhuyenmai = (money, km) => {
    return (money - money * (km / 100)).toLocaleString();
  };
  return (
    <div className="mt-5 mb-5 tour " id="tour">
      <div className="heading text-center">
        <span>du lịch trong nước</span>
        <div className="hr"></div>
        <p className="mb-4">
          Du lịch trong nước luôn là lựa chọn tuyệt vời. Những thành phố nhộn
          nhịp, nền văn hóa độc đáo và hấp dẫn.
        </p>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {tour.length === 0 ? (
            <div className="spin">
              <Spin />
            </div>
          ) : (
            tour.map((ok) => (
              <div className="col-md-4 mb-2" key={ok.id}>
                {ok.Khuyenmais.length === 0 ? (
                  ""
                ) : ok.Khuyenmais[0].status === 0 ? (
                  ""
                ) : (
                  <Tooltip
                    placement="right"
                    color="#0abf55"
                    title={ok.Khuyenmais[0].name}
                  >
                    <div className="ribbon-wrapper">
                      <div className="ribbon-red">
                        Giảm {ok.Khuyenmais[0].khuyenmai}%
                      </div>
                    </div>
                  </Tooltip>
                )}
                <Link to={`/tour/${ok.id}`}>
                  <div className="img rounded">
                    <img src={ok.avatar} className="img-fluid" alt="" />
                  </div>
                  <div className="content_tour">
                    <div className="title_tour text-capitalize">{ok.name}</div>
                    <div className="star float-left">
                      <Rate value={tinhdiem(ok.id)} disabled />
                    </div>
                    <div className="money float-left ml-3 text-warning">
                      {ok.Khuyenmais.length === 0 ? (
                        <div>
                          {ok.gianguoilon.toLocaleString()} VNĐ
                          <br />
                        </div>
                      ) : ok.Khuyenmais[0].status === 0 ? (
                        <div>
                          {ok.gianguoilon.toLocaleString()} VNĐ
                          <br />
                        </div>
                      ) : (
                        <div>
                          {tinhkhuyenmai(
                            ok.gianguoilon,
                            ok.Khuyenmais[0].khuyenmai
                          )}{" "}
                          VNĐ
                          <br />
                          <del> {ok.gianguoilon.toLocaleString()} VNĐ</del>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="xem-them mt-3">
        <Link to="/list-tour">Xem Thêm </Link>
      </div>
    </div>
  );
}

Tourtrongnuoc.propTypes = {};

export default Tourtrongnuoc;
