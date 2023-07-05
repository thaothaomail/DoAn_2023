import React, { useEffect, useState } from "react";
import { message, Popconfirm, Spin, Table } from "antd";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  hoadoncanhanData,
  updatehoadoncanhan,
} from "../Hoadoncanhan/hoadoncanhanSlice";
import Modal from "antd/lib/modal/Modal";
import { addthongbao } from "./thongbaoSlice";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
function Kiemduyet() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState({
    giatien: "",
    luuy: "",
    hoadonId: "",
    userId: "",
  });
  const showModal = (e, e1) => {
    setIsModalVisible(true);
    setState({
      ...state,
      hoadonId: e,
      userId: e1,
    });
  };
  const handleonchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const actionResult = async () => {
    await dispatch(hoadoncanhanData());
  };

  const handleOk = () => {
    if (giatien !== "" && luuy !== "") {
      setIsModalVisible(false);
      dispatch(
        updatehoadoncanhan({
          idsua: hoadonId,
          giatien: giatien,
          luuy: luuy,
          kiemduyet: 1,
        })
      );
      dispatch(
        addthongbao({
          userId: userId,
          noidung: "Tạo tour thành công bấm để xem chi tiết",
          status: 1,
        })
      );
      setTimeout(() => {
        actionResult();
      }, 500);
    } else {
      message.warning("Thông tin chưa đầy đủ!");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
      title: "Kiểm duyệt",
      dataIndex: "kd",
    },
  ];
  useEffect(() => {
    actionResult();
  }, []);
  const hoadoncanhan1 = useSelector(
    (state) => state.hoadoncanhans.hoadoncanhan.data
  );
  let hoadoncanhan = [];
  if (hoadoncanhan1) {
    for (let i = 0; i < hoadoncanhan1.length; i++) {
      if (hoadoncanhan1[i].kiemduyet === 0) {
        hoadoncanhan.unshift(hoadoncanhan1[i]);
      }
    }
  }
  const loading = useSelector((state) => state.hoadoncanhans.loading);

  const { luuy, giatien, hoadonId, userId } = state;
  return (
    <div id="admin">
      <div className="heading">
        <h4>Kiểm duyệt tour cá nhân</h4>
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
              user: <span>{ok.userId}</span>,
              nxp: <span>{ok.noikhoihanh}</span>,
              nkh: <span>{ok.ngaykhoihanh}</span>,
              ddd: <span>{ok.diadiemdi}</span>,
              kd: (
                <div className="action">
                  <span
                    onClick={() => {
                      showModal(ok.id, ok.userId);
                    }}
                  >
                    <CheckCircleOutlineOutlinedIcon className="text-danger" />
                  </span>{" "}
                </div>
              ),
            }))}
          />
        )}
        <Modal
          title="Duyệt tour"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div class="form-group">
            <label for="">Giá tiền</label>
            <input
              type="number"
              min="0"
              className="form-control"
              name="giatien"
              value={giatien}
              onChange={handleonchange}
              id=""
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
          <div class="form-group">
            <label for="">Lưu ý</label>
            <textarea
              className="form-control"
              name="luuy"
              value={luuy}
              onChange={handleonchange}
              id=""
              max="1000"
              cols="30"
              rows="4"
            ></textarea>
          </div>
        </Modal>
      </div>
    </div>
  );
}

Kiemduyet.propTypes = {};

export default Kiemduyet;
