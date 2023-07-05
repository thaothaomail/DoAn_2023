import {
  Carousel,
  message,
  Popover,
  Radio,
  Rate,
  Spin,
  Card,
  List,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./tour.css";
import { Button } from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";
import Detail from "../detail/Detail";
import Footer from "../../trangchu/footer/Footer";
import Modal from "antd/lib/modal/Modal";
import Hinhthucthanhtoan from "./Hinhthucthanhtoan";
import Dieukhoan from "./Dieukhoan";
import { binhluanData } from "../../admin/Binhluan/binhluanSlice";
import { addhoadon, hoadonData } from "../../admin/Hoadon/hoadonSlice";
import taikhoanApi from "../../../../api/taikhoanApi";
import { ngaydiData } from "../../admin/Ngaydi/ngaydiSlice";
import { addthanhtoan } from "./thanhtoanSlice";
function Tour(props) {
  const { id } = useParams();

  const [state, setState] = useState({
    listdate: "",
    visible: false,
    visible2: false,
    visible3: false,
    name: "",
    email: "",
    sdt: "",
    diachi: "",
    nguoilon: 1,
    treem: 0,
    embe: 0,
    dieukhoan: false,
    valueDate: "",
    date: "",
    loadlaihoadon: 1,
  });
  const binhluans = useSelector((state) => state.binhluans.binhluan.data);
  var binhluanload = [];
  if (binhluans) {
    for (let i = 0; i < binhluans.length; i++) {
      if (binhluans[i].tourId === +id && binhluans[i].status === +1) {
        binhluanload.push(binhluans[i]);
      }
    }
  }

  const tinhdiem = () => {
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

  const dispatch = useDispatch();
  const actionbinhluan = async () => {
    await dispatch(binhluanData());
  };
  const actionhoadon = async () => {
    await dispatch(hoadonData());
  };
  const actionngaydi = async () => {
    await dispatch(ngaydiData());
  };

  const tours = useSelector((state) => state.tours.tour.data);
  const ngaydis = useSelector((state) => state.ngaydis.ngaydi.data);

  // Hàm tính toán recommend dữ liệu với giới hạn số lượng trả về
  // const calculateRecommendation = (selectedData, limit, data) => {
  //   console.log(selectedData)
  //   const { gianguoilon, name, Diadiems } = selectedData;

  //   console.log(gianguoilon, name, Diadiems[0]);
  //   console.log(data);
  //   const recommended = data.filter((item) => {
  //     const isSimilarPrice = item.gianguoilon === gianguoilon;
  //     const isNearbyLocation = item.name === name;
  //     const isSimilarRating = item.Diadiems[0] === Diadiems[0];

  //     return isSimilarPrice && isNearbyLocation && isSimilarRating;
  //   });
  //   return recommended.slice(0, limit); // Giới hạn số lượng trả về
  // };

  const calculateRecommendation = (selectedData, data) => {
    const { gianguoilon, name, Diadiems } = selectedData;

    const recommended = [];
    const recommendedIds = new Set(); // Sử dụng Set để lưu trữ các id đã được recommend

    for (const item of data) {
      if (recommended.length >= 4) {
        break; // Đã tìm đủ 4 dữ liệu phù hợp
      }

      // Kiểm tra nếu dữ liệu đã được recommend trước đó
      if (recommendedIds.has(item.id)) {
        continue; // Bỏ qua dữ liệu đã recommend trước đó
      }

      // Kiểm tra các tiêu chí phù hợp
      const isSimilarPrice = item.gianguoilon <= gianguoilon;
      const isNearbyLocation = item.name === name;
      const isSimilarRating = item.Diadiems[0].name === Diadiems[0].name;

      // Nếu dữ liệu phù hợp với ít nhất một tiêu chí, thêm vào recommended
      if (isSimilarPrice || isNearbyLocation || isSimilarRating) {
        recommended.push(item);
        recommendedIds.add(item.id); // Thêm id vào Set đã recommend
      }
    }

    return recommended;
  };

  const tour = [];
  let selectedData = {};
  let recommendation = []; // Tạo một biến để lưu trữ dữ liệu recommend

  if (tours) {
    for (let i = 0; i < tours.length; i++) {
      if (tours[i].id === +id) {
        console.log(tours[i]);
        selectedData = tours[i];

        console.log(tours);

        recommendation = calculateRecommendation(selectedData, tours);
        console.log("Recommendation:", recommendation);
        // In kết quả recommend
        tour.push(tours[i].Ngaydis);
      }
    }
  }

  var giakhuyenmai;
  if (tours) {
    giakhuyenmai = tours.find((x) => x.id === +id);
  }
  // console.log(giakhuyenmai);
  const formatdate = (e) => {
    if (e) {
      var ngay = e.substr(0, 2);
      var thang = e.substr(3, 2);
      var nam = e.substr(6, 4);
      return nam + "-" + thang + "-" + ngay;
    }
  };
  const checkngaydi = () => {
    if (tour.length !== 0) {
      var ngaydi = tour[0];
      var ngaymin = formatdate(ngaydi[0].ngay);
      var date = new Date();
      // var dateToday = date.getFullYear() + "-" + ((date.getMonth() + 1) > 1 ? date.getMonth() + 1 : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() > 1 ? date.getDate() : ("0" + date.getDate()));
      var listDate = [];
      for (let i = 0; i < ngaydi.length; i++) {
        if (
          new Date(ngaymin) <= new Date(formatdate(ngaydi[i].ngay)) &&
          date <= new Date(formatdate(ngaydi[i].ngay))
        ) {
          listDate.push(formatdate(ngaydi[i].ngay));
        }
      }
      // console.log(listDate.sort((a, b) => { return new Date(b) - new Date(a) }));
      listDate.sort(function (a, b) {
        return new Date(a) - new Date(b);
      });
      return listDate[0];
    }
  };

  const fillDate = () => {
    if (tour.length !== 0) {
      var ngaydi = tour[0];
      var date = new Date();
      var dates = [];
      var dateToday =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1 > 1
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "-" +
        (date.getDate() > 1 ? date.getDate() : "0" + date.getDate());
      for (let i = 0; i < ngaydi.length; i++) {
        // console.log(dateToday <= formatdate(ngaydi[i].ngay));
        if (date <= new Date(formatdate(ngaydi[i].ngay))) {
          dates.push({ id: i + 1, ngay: ngaydi[i].ngay });
        }
      }
      return dates;
    }
  };

  const formatlaidate = (e) => {
    if (e) {
      var ngay = e.substr(8, 2);
      var thang = e.substr(5, 2);
      var nam = e.substr(0, 4);
      return ngay + "/" + thang + "/" + nam;
    }
  };
  // console.log(ngaydis);
  var tour_ngay = [];
  console.log("checkngaydi():", checkngaydi());
  if (ngaydis && formatlaidate(checkngaydi())) {
    tour_ngay.push(
      ngaydis
        .find((x) => x.ngay === formatlaidate(checkngaydi()))
        .Tours.find((x) => x.id === +id)
    );
  }
  // console.log(tour_ngay);
  const hide = () => {
    setState({
      ...state,
      visible3: false,
    });
  };
  const handleVisibleChange = () => {
    setState({ ...state, visible3: true, listdate: fillDate() });
  };
  const users = useSelector((state) => state.infor.infor.data);
  useEffect(() => {
    actionngaydi();
    actionbinhluan();
    actionhoadon();
    window.scrollTo(0, 0);
  }, [state.loadlaihoadon]);
  const showModal = async () => {
    if (users) {
      var user = await taikhoanApi.getOne(+users.id).then((data) => {
        return data;
      });
      setState({
        ...state,
        visible3: false,
        visible: true,
        name: user.name,
        diachi: user.diachi,
        sdt: user.sdt,
        email: user.email,
      });
    } else {
      message.warning("Bạn cần đăng nhập trước!");
    }
  };
  const handleOk = (e) => {
    if (
      name === "" ||
      sdt === "" ||
      diachi === "" ||
      email === "" ||
      !name ||
      !sdt ||
      !diachi ||
      !email
    ) {
      message.warning("Bạn cần cập nhật thông tin cho tài khoản!");
    } else {
      var songuoi = tours.find((x) => x.id === +id).songuoi;
      if (songuoiconlai(songuoi) === 0) {
        message.warning("Đã hết chỗ quý khách vui lòng chọn thời gian khác!");
      } else {
        if (tong > songuoiconlai(songuoi)) {
          message.warning("Vượt quá số người cho phép!");
        } else {
          setState({
            ...state,
            visible2: true,
          });
        }
      }
    }
  };
  const handleCancel = (e) => {
    setState({
      ...state,
      visible: false,
    });
  };
  const thanhtien = (gia_te, gia_eb) => {
    var gianguoilon = checkKhuyenmai();
    return gianguoilon * nguoilon + gia_te * treem + gia_eb * embe;
  };
  const [stylepayment, setstylepayment] = useState(1);
  const callbackfunction = (data) => {
    setstylepayment(data);
  };
  const history = useHistory();
  const handleOk2 = async () => {
    if (state.dieukhoan === false) {
      message.warning("Bạn chưa đồng ý điều khoản của chúng tôi!");
    } else {
      var userId = await taikhoanApi.getOne(+users.id).then((data) => {
        return data.id;
      });
      var tourId = id;
      let tongtien = thanhtien(tour_ngay[0].giatreem, tour_ngay[0].giaembe);
      if (stylepayment === 1) {
        // await dispatch(
        //     addhoadon({
        //         thanhtien: tongtien,
        //         tourId,
        //         userId,
        //         nguoilon,
        //         treem,
        //         embe,
        //         ngaydi:
        //             state.date === ""
        //                 ? formatlaidate(checkngaydi())
        //                 : state.date,
        //     })
        // );
        // setState({
        //     ...state,
        //     visible2: false,
        //     visible: false,
        //     loadlaihoadon: state.loadlaihoadon + 1,
        // });
      } else if (stylepayment === 3) {
        dispatch(
          addthanhtoan({
            hoadon: {
              tourId,
              userId,
              nguoilon,
              treem,
              embe,
              ngaydi:
                state.date === "" ? formatlaidate(checkngaydi()) : state.date,
            },
            nguoilon,
            treem,
            embe,
            tongtien,
            name: tour_ngay[0].name,
            giatreem: tour_ngay[0].giatreem,
            giaembe: tour_ngay[0].giaembe,
            gianguoilon: tour_ngay[0].gianguoilon,
          })
        );
        history.push("/stripe");
      }
    }
  };
  const handleCancel2 = (e) => {
    setState({
      ...state,
      visible2: false,
    });
  };
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onChangedate = (e) => {
    setState({ ...state, valueDate: e.target.value });
  };
  const hoadons = useSelector((state) => state.hoadons.hoadon.data);
  const songuoiconlai = (e) => {
    var tonghd = new Number();
    if (hoadons) {
      for (let i = 0; i < hoadons.length; i++) {
        if (hoadons[i].tourId === +id) {
          tonghd += hoadons[i].nguoilon + hoadons[i].treem + hoadons[i].embe;
        }
      }
    }
    return e - tonghd;
  };
  const tinhkhuyenmai = (money, km) => {
    return money - money * (km / 100);
  };
  const { name, sdt, diachi, email, nguoilon, treem, embe } = state;
  const checkKhuyenmai = () => {
    if (giakhuyenmai.Khuyenmais.length === 0) {
      return giakhuyenmai.gianguoilon;
    } else {
      if (giakhuyenmai.Khuyenmais[0].status === 0) {
        return giakhuyenmai.gianguoilon;
      } else {
        return tinhkhuyenmai(
          giakhuyenmai.gianguoilon,
          giakhuyenmai.Khuyenmais[0].khuyenmai
        );
      }
    }
  };

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
  const adddate = (e) => {
    setState({
      ...state,
      date: state.listdate.find((x) => x.id === +e).ngay,
    });
  };
  var tong;
  if (giakhuyenmai) {
    tong = Number(nguoilon) + Number(treem) + Number(embe);
  }
  return (
    <div id="detail-tour">
      <div className="breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home mr-2"></i>Trang chủ
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/list-tour">Tour du lịch</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {tour_ngay.length > 0 ? tour_ngay[0].name : ""}
            </li>
          </ol>
        </nav>
      </div>
      {tour_ngay.length === 0 ? (
        <div className="spin">
          <Spin className="mt-1" />
        </div>
      ) : (
        tour_ngay.map((ok) => (
          <div className="box-tour" key={ok.id}>
            <div className="container bg-white">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <Carousel autoplay>
                    {tours
                      .find((x) => x.id === +id)
                      .Anhs.map((oki) => (
                        <div>
                          <img
                            src={oki.link}
                            width="760px"
                            height="430px"
                            alt=""
                          />
                        </div>
                      ))}
                  </Carousel>
                </div>
                <div className="col-lg-4 position-relative ">
                  <div className=" pl-3">
                    <div className="star float-left">
                      <Rate value={tinhdiem()} disabled />
                    </div>
                    <div className="icon-comment">
                      <span>
                        <strong> &emsp; {tinhdiem()}/5</strong> điểm với{" "}
                        <strong>{binhluanload.length}</strong> đánh giá
                      </span>
                    </div>
                    <div className="view">
                      <span className="mr-3">
                        <i className="far fa-thumbs-up mr-1"></i> 200
                      </span>
                      <span>
                        <i className="far fa-comment-dots mr-1"></i>{" "}
                        {binhluanload.length}
                      </span>
                    </div>

                    <hr className="hr-tour" />
                    <div className="tt-tour">
                      <table className="w-100">
                        <tr>
                          <td>
                            <span>Khởi hành:</span>
                          </td>
                          <td>
                            <span>
                              {state.date === ""
                                ? formatlaidate(checkngaydi())
                                : state.date}
                            </span>
                          </td>
                          <td>
                            <Popover
                              content={
                                <div>
                                  <Radio.Group
                                    onChange={onChangedate}
                                    value={state.valueDate}
                                  >
                                    {state.listdate === ""
                                      ? ""
                                      : state.listdate.map((ok) => (
                                          <Radio
                                            style={radioStyle}
                                            key={ok.id}
                                            value={ok.id}
                                          >
                                            <span
                                              onClick={() => {
                                                adddate(ok.id);
                                              }}
                                            >
                                              {ok.ngay}
                                            </span>
                                            <br />
                                          </Radio>
                                        ))}
                                  </Radio.Group>
                                  <hr />
                                  <div className="text-center">
                                    <strong
                                      className="text-danger"
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onClick={hide}
                                    >
                                      Close
                                    </strong>
                                  </div>
                                </div>
                              }
                              title="Chọn ngày khác"
                              trigger="click"
                              visible={state.visible3}
                              onVisibleChange={handleVisibleChange}
                            >
                              <span
                                className="text-primary"
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                Đổi ngày
                              </span>
                            </Popover>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>Thời gian:</span>
                          </td>
                          <td>
                            <span>{ok.thoigian} ngày</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>Nơi khởi hành:</span>
                          </td>
                          <td>
                            <span>Tp.Hồ Chí Minh</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <Button
                      className="float-right position-absolute btn-dt"
                      onClick={showModal}
                      variant="contained"
                      color="secondary"
                    >
                      Đặt tour
                    </Button>
                    <div className="price position-absolute">
                      <span>
                        <strong className="text-danger">
                          {checkKhuyenmai().toLocaleString()}
                        </strong>{" "}
                        vnd
                      </span>
                      <br />
                      <span>Số chỗ còn lại: {songuoiconlai(ok.songuoi)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Detail id={id} />
            </div>
          </div>
        ))
      )}
      <div className="container bg-white">
        <div
          style={{
            backgroundColor: "#faa935",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "18px",
            display: "inline",
            color: "white",
          }}
        >
          Danh sách tour phù hợp với bạn:
        </div>
        <div style={{ marginTop: 20 }}>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={recommendation}
            renderItem={(item) => (
              <List.Item>
                <Link to={`/tour/${item.id}`}>
                  <Card
                    style={{
                      borderRadius: "10px",
                    }}
                    title={item.name}
                    cover={
                      <img
                        src={item.Anhs[0].link}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "200px",
                        }}
                      />
                    }
                  ></Card>
                </Link>
              </List.Item>
            )}
          />
        </div>
      </div>
      <Footer />
      <Modal
        title="Đặt tour"
        visible={state.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h4 className="text-center text-primary">Thông tin liên lạc</h4>
        <div className="form-group">
          <label htmlFor="">Họ tên(*)</label>
          <input
            type="text"
            className="form-control"
            name="name"
            disabled
            value={name}
            onChange={onchange}
            aria-describedby="helpId"
            placeholder=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Email(*)</label>
          <input
            type="email"
            className="form-control"
            name="email"
            disabled
            value={email}
            onChange={onchange}
            aria-describedby="helpId"
            placeholder=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Số điện thoại(*)</label>
          <input
            type="text"
            className="form-control"
            name="sdt"
            disabled
            value={sdt}
            onChange={onchange}
            aria-describedby="helpId"
            placeholder=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            name="diachi"
            disabled
            value={diachi}
            onChange={onchange}
            aria-describedby="helpId"
            placeholder=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Ngày đi</label>
          <input
            type="text"
            className="form-control"
            name="diachi"
            disabled
            value={
              state.date === "" ? formatlaidate(checkngaydi()) : state.date
            }
            onChange={onchange}
            aria-describedby="helpId"
            placeholder=""
          />
        </div>
        <h4 className="text-center text-primary">Số người</h4>
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="">Người lớn</label>
              <input
                type="number"
                className="form-control"
                name="nguoilon"
                min="1"
                value={nguoilon}
                onChange={onchange}
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="">Trẻ em</label>
              <input
                type="number"
                className="form-control"
                name="treem"
                min="0"
                value={treem}
                onChange={onchange}
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="">Em bé</label>
              <input
                type="number"
                className="form-control"
                value={embe}
                name="embe"
                min="0"
                onChange={onchange}
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="">Tổng</label>
              <input
                type="number"
                disabled
                className="form-control"
                name="tong"
                value={tong}
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
          </div>
        </div>
        <h4 className="text-center text-primary">Thành tiền</h4>
        {tour_ngay.map((ok) => (
          <p key={ok.id}>
            Số tiền cần phải trả:{" "}
            <strong className="text-danger">
              {thanhtien(ok.giatreem, ok.giaembe).toLocaleString()}
            </strong>
          </p>
        ))}
      </Modal>
      <Modal
        title="Đặt tour"
        visible={state.visible2}
        onOk={handleOk2}
        onCancel={handleCancel2}
      >
        <h4 className="text-center text-primary">Hình thức thanh toán</h4>
        <Hinhthucthanhtoan callback={callbackfunction} />
        <h4 className="text-center text-primary">Điều khoản</h4>
        <div className="dieukhoan">
          <Dieukhoan />
        </div>
        <input
          type="checkbox"
          onChange={onchange}
          className="mt-3"
          name="dieukhoan"
          id="dk"
        />
        <label htmlFor="dk" className="ml-3">
          <strong>Tôi đồng ý với điều khoản ở trên</strong>
        </label>
      </Modal>
    </div>
  );
}

export default Tour;
