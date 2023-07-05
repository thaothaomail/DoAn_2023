import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import { DatePicker, message, Popconfirm, Select, Space } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import hoadoncanhanApi from "../../../api/hoadoncanhanApi";
import Footer from "../trangchu/footer/Footer";
import "./CreateTour.css";
export default function CreateTour() {
  const { Option } = Select;
  const [date, setdate] = useState("");
  const [date1, setdate1] = useState("");
  const [nxp, setnxp] = useState("");
  const [td, settd] = useState("");
  const diadiems = useSelector((state) => state.diadiems.diadiem.data);
  let diadiem = [];
  if (diadiems) {
    for (let i = 0; i < diadiems.length; i++) {
      if (diadiems[i].quocgiaId === 1) {
        diadiem.push(diadiems[i]);
      }
    }
  }
  const infor = useSelector((state) => state.infor.infor.data);
  function handleNoixuatphat(value) {
    setnxp(value);
  }
  function handleTuyendi(value) {
    settd(value);
  }
  function handleNgaykhoihanh(dates, dateStrings) {
    setdate(new Date(dates));
    setdate1(dateStrings);
  }
  const compare = (dt) => {
    const date = new Date();
    date.setHours(0);
    date.setSeconds(0);
    date.setMinutes(0);
    dt.setHours(0);
    dt.setSeconds(0);
    dt.setMinutes(0);
    return date < dt;
  };
  const onSubmit = () => {
    //e.preventDefault();
    if (date !== "" && td !== "" && td.length !== 0 && nxp !== "") {
      if (!compare(date)) {
        message.warning("Ngày khởi hành không phù hợp!");
      } else {
        console.log(td.join(", "), nxp, date1, infor.id);
        hoadoncanhanApi.posthoadoncanhan({
          userId: infor.id,
          noikhoihanh: nxp,
          ngaykhoihanh: date1,
          diadiemdi: td.join(", "),
          kiemduyet: 0,
          agree: 0,
        });
      }
    } else {
      message.warning("Bạn chưa nhập đầy đủ thông tin!");
    }
  };
  return (
    <div id="create-tour">
      <div className="breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home mr-2"></i>Trang chủ
              </Link>
            </li>
            <li className="breadcrumb-item">Tạo tour</li>
          </ol>
        </nav>
      </div>
      <div className="title-new">
        <div className="hr-new "></div>
        <h3>Tạo chuyến đi</h3>
      </div>
      <div className="container mb-5">
        <div className="head--text">Tạo tour</div>
        <div className="head--content">
          <form action="" onSubmit={onSubmit} method="post">
            <Select
              placeholder="Chọn nơi khởi hành"
              className="mr-2"
              style={{ width: 200 }}
              onChange={handleNoixuatphat}
            >
              <Option key="vinh"> Tp. Hồ Chí Minh</Option>
            </Select>
            <Select
              mode="multiple"
              placeholder="Chọn địa điểm đi"
              style={{ width: 400 }}
              className="mr-2"
              onChange={handleTuyendi}
            >
              {!diadiem
                ? ""
                : diadiem.map((data) => (
                    <Option key={data.name}>{data.name}</Option>
                  ))}
            </Select>
            <Space direction="vertical" className="mr-2">
              <DatePicker
                className="mr-3"
                style={{ width: 150 }}
                id="date"
                format="DD/MM/YYYY"
                onChange={handleNgaykhoihanh}
              />
            </Space>
            <Popconfirm
              title="Bạn có chắc chắn？"
              onConfirm={() => {
                onSubmit();
              }}
              icon={<QuestionCircleOutlined style={{ color: "green" }} />}
            >
              <Button type="submit" color="primary" variant="contained">
                Tạo chuyến đi
              </Button>
            </Popconfirm>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
