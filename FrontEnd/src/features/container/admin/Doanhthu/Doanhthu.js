import React, { useEffect, useState } from "react";
import { Modal, Progress } from "antd";
import { Button } from "@material-ui/core";
import "./doanhthu.css";
import { useDispatch, useSelector } from "react-redux";
import { chitieuData } from "./chitieuSlice";
import Axios from "axios";
import { userData } from "../taikhoan/taikhoanSlice";

export default function Doanhthu() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState({
    chitieuthang: "",
    chitieungay: "",
    chitieunam: "",
  });
  // const [usd, setusd] = useState(1);
  const [usd, setusd] = useState(23060);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const chiphi = useSelector((state) => state.chiphis.chiphi.data);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(userData());
  };

  let TongChiPhi = 0;

  if (chiphi) {
    for (let i = 0; i < chiphi.length; i++) {
      TongChiPhi += chiphi[i].money;
    }
  }
  const actionChitiet = async () => await dispatch(chitieuData());
  const chitieu = useSelector((state) => state.chitieu.chitieu.data);
  useEffect(() => {
    // Axios.get("https://free.currconv.com/api/v7/convert?q=USD_VND&compact=ultra&apiKey=6c24709f2cfc058a0499").then(data => {
    //     setusd(data.data.USD_VND)
    // })
    actionResult();
    if (chitieu) {
      setState({
        ...state,
        chitieungay: chitieu[0].chitieungay,
        chitieuthang: chitieu[0].chitieuthang,
        chitieunam: chitieu[0].chitieunam,
      });
    } else {
      actionChitiet();
    }
  }, [chitieu]);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const SoNguoiDung = useSelector((state) => state.taikhoan.user.data);
  const HoaDon = useSelector((state) => state.hoadons.hoadon.data);
  let HoaDonDate = [];
  if (HoaDon) {
    for (let i = 0; i < HoaDon.length; i++) {
      let date = new Date(HoaDon[i].createdAt);
      HoaDonDate.push({
        id: HoaDon[i].id,
        tongtien: HoaDon[i].thanhtien,
        date:
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          date.getFullYear(),
      });
    }
  }
  let ThuNhapHomNay = 0;
  if (HoaDonDate) {
    let date = new Date();
    let dateToday =
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
      "-" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    for (let i = 0; i < HoaDonDate.length; i++) {
      if (HoaDonDate[i].date == dateToday) {
        ThuNhapHomNay += HoaDonDate[i].tongtien;
      }
    }
  }
  let ThuNhapThang = 0;
  if (HoaDonDate) {
    let date = new Date();
    let dateMonth =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    for (let i = 0; i < HoaDonDate.length; i++) {
      if (HoaDonDate[i].date.substr(3) == dateMonth) {
        ThuNhapThang += HoaDonDate[i].tongtien;
      }
    }
  }
  let ThuNhapNam = 0;
  if (HoaDonDate) {
    let date = new Date();
    let dateYear = date.getFullYear();
    for (let i = 0; i < HoaDonDate.length; i++) {
      if (HoaDonDate[i].date.substr(6) == dateYear) {
        ThuNhapNam += HoaDonDate[i].tongtien;
      }
    }
  }
  let TongThuNhap = 0;
  if (HoaDon) {
    for (let i = 0; i < HoaDon.length; i++) {
      TongThuNhap += HoaDon[i].thanhtien;
    }
  }
  console.log(usd);
  const LoiNhuan = (a, b) => {
    return (b - a).toLocaleString();
  };
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  let thunhap = Number((TongThuNhap / usd).toFixed(0));
  let chiphitong = Number((TongChiPhi / usd).toFixed(0));
  const { chitieunam, chitieuthang, chitieungay } = state;
  return (
    <div id="doanhthu">
      <h4>Doanh thu công ty</h4>
      <div className="row">
        <div className="col-md">
          <div className="float-left mr-2">
            <div className="icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
          </div>
          <div className="monney">
            <span>
              <strong>$ {TongThuNhap ? thunhap.toLocaleString() : 0}</strong>
            </span>
            <br />
            <span>Tổng thu nhập</span>
          </div>
        </div>

        <div className="col-md">
          <div className="float-right mr-2">
            <div className="icon">
              <i className="fas fa-money-bill-alt"></i>
            </div>
          </div>
          <div className="monney float-right">
            <span>
              <strong>
                ${" "}
                {LoiNhuan(
                  (TongChiPhi / usd).toFixed(0),
                  (TongThuNhap / usd).toFixed(0)
                )}
              </strong>
            </span>
            <br />
            <span>Lợi nhuận</span>
          </div>
        </div>
        <div className="col-md">
          <div className="float-left mr-2">
            <div className="icon">
              <i className="fas fa-chart-pie"></i>
            </div>
          </div>
          <div className="monney">
            <span>
              <strong>$ {chiphitong.toLocaleString()}</strong>
            </span>
            <br />
            <span>Tổng chi</span>
          </div>
        </div>
        <div className="col-md">
          <div className="float-left mr-2">
            <div className="icon">
              <i className="fas fa-users"></i>
            </div>
          </div>
          <div className="monney">
            <span>
              <strong>{SoNguoiDung ? SoNguoiDung.length : 0}</strong>
            </span>
            <br />
            <span>Tổng người dùng</span>
          </div>
        </div>
      </div>
      <h4 className="mt-4 mb-2">Chỉ tiêu</h4>
      <div className="container text-center">
        <div className="row pt-3 pb-2">
          <div className="col-md-4">
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              type="dashboard"
              percent={100}
            />

            <div>
              <h5>Chỉ tiêu ngày</h5>
              <div className="hr"></div>
              <div className="mt-2">
                <span>
                  Tổng thu:{" "}
                  <span className="gold">
                    {ThuNhapHomNay.toLocaleString()}{" "}
                    <span className="text-danger bold">vnđ</span>
                  </span>
                </span>
                <br />
                <span>
                  Chỉ tiêu:{" "}
                  <span className="gold">
                    {chitieungay.toLocaleString()}{" "}
                    <span className="text-danger bold">vnđ</span>
                  </span>
                </span>
                <br />
                <span>
                  Vượt chỉ tiêu:{" "}
                  <span className="gold">
                    {(ThuNhapHomNay - chitieungay).toLocaleString()}{" "}
                    <span className="text-danger bold">vnđ</span>
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              type="dashboard"
              percent={100}
            />

            <div>
              <h5>Chỉ tiêu tháng</h5>
              <div className="hr"></div>
              <div className="mt-2">
                <span>
                  Tổng thu:{" "}
                  <span className="gold">
                    {ThuNhapThang.toLocaleString()}{" "}
                    <span className="text-danger bold">vnđ</span>
                  </span>
                </span>
                <br />
                <span>
                  Chỉ tiêu:{" "}
                  <span className="gold">
                    {chitieuthang.toLocaleString()}{" "}
                    <span className="text-danger bold">vnđ</span>
                  </span>
                </span>
                <br />
                <span>
                  Vượt chỉ tiêu:{" "}
                  <span className="gold">
                    {(ThuNhapThang - chitieuthang).toLocaleString()}{" "}
                    <span className="text-danger bold">vnđ</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              type="dashboard"
              percent={100}
            />

            <div>
              <h5>Chỉ tiêu năm</h5>
              <div className="hr"></div>
              <div className="mt-2">
                <span>
                  Tổng thu:{" "}
                  <span className="gold">
                    {ThuNhapNam.toLocaleString()}{" "}
                    <span className="text-danger bold">vnđ</span>
                  </span>
                </span>
                <br />
                <span>
                  Chỉ tiêu:{" "}
                  <span className="gold">
                    {chitieunam.toLocaleString()}{" "}
                    <span className="text-danger bold">vnđ</span>
                  </span>
                </span>
                <br />
                <span>
                  Vượt chỉ tiêu:{" "}
                  <span className="gold">
                    {(ThuNhapNam - chitieunam).toLocaleString()}{" "}
                    <span className="text-danger bold">vnđ</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        className="float-right mt-4"
        onClick={showModal}
        variant="contained"
        color="primary"
      >
        Đặt chỉ tiêu
      </Button>
      <Modal
        title="Đặt chỉ tiêu"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div class="form-group">
          <label for="">Chỉ tiêu ngày</label>
          <input
            type="number"
            name="chitieungay"
            value={chitieungay}
            onChange={onChange}
            id=""
            class="form-control"
            placeholder=""
            aria-describedby="helpId"
          />
        </div>

        <div class="form-group">
          <label for="">Chỉ tiêu tháng</label>
          <input
            type="number"
            name="chitieuthang"
            value={chitieuthang}
            onChange={onChange}
            id=""
            class="form-control"
            placeholder=""
            aria-describedby="helpId"
          />
        </div>
        <div class="form-group">
          <label for="">Chỉ tiêu năm</label>
          <input
            type="number"
            name="chitieunam"
            value={chitieunam}
            onChange={onChange}
            id=""
            class="form-control"
            placeholder=""
            aria-describedby="helpId"
          />
        </div>
      </Modal>
    </div>
  );
}
