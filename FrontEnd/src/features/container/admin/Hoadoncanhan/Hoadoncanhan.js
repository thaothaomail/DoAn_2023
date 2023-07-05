import React, { useEffect, useState } from "react";
import { Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hoadoncanhanData } from "./hoadoncanhanSlice";

import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import Axios from "axios";
function Hoadoncanhan() {
  const columns = [
    {
      title: "Người dùng",
      dataIndex: "user",
    },
    {
      title: "Nơi khởi hành",
      dataIndex: "nxp",
    },
    {
      title: "Địa điểm đi",
      dataIndex: "ddd",
    },
    {
      title: "Ngày khởi hành",
      dataIndex: "nkh",
    },
    {
      title: "Giá tiền",
      dataIndex: "tien",
    },
    {
      title: "Kiểm duyệt",
      dataIndex: "kd",
    },
  ];
  const [user, setuser] = useState("");
  const actionResult = async () => {
    await dispatch(hoadoncanhanData());
  };
  useEffect(() => {
    Axios.get("http://localhost:666/users/1").then((data) => {
      setuser(data.data.USD_VND);
    });
    actionResult();
  }, []);
  const hoadoncanhans = useSelector(
    (state) => state.hoadoncanhans.hoadoncanhan.data
  );
  let hoadoncanhan = [];
  if (hoadoncanhans) {
    for (let i = 0; i < hoadoncanhans.length; i++) {
      if (hoadoncanhans[i].agree === 1) {
        hoadoncanhan.push(hoadoncanhans[i]);
      }
    }
  }

  const loading = useSelector((state) => state.hoadoncanhans.loading);
  const dispatch = useDispatch();
  return (
    <div id="admin">
      <div className="heading">
        <h4>Hoá đơn cá nhân</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={hoadoncanhan.map((ok, index) => ({
              key: index + 1,
              user: <span className="text-primary">{ok.User.name}</span>,
              nxp: <span>{ok.noikhoihanh}</span>,
              nkh: <span>{ok.ngaykhoihanh}</span>,
              ddd: <span>{ok.diadiemdi}</span>,
              tien: (
                <span>
                  {ok.giatien ? (
                    ok.giatien.toLocaleString() + " vnđ"
                  ) : (
                    <span className="text-danger">Chưa kiểm duyệt</span>
                  )}
                </span>
              ),
              kd: (
                <div className="action">
                  {ok.kiemduyet === 1 ? (
                    <span>
                      <ThumbUpOffAltOutlinedIcon className="text-primary" />
                      {/* <i className="far fa-thumbs-up text-primary"></i> */}
                    </span>
                  ) : (
                    <span>
                      <ThumbDownOutlinedIcon />
                    </span>
                  )}
                </div>
              ),
            }))}
          />
        )}
      </div>
    </div>
  );
}

Hoadoncanhan.propTypes = {};

export default Hoadoncanhan;
