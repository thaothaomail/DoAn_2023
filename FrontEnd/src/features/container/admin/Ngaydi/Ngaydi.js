import React, { useEffect, useState } from "react";
import { DatePicker, message, Popconfirm, Space, Spin, Table } from "antd";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  addngaydi,
  ngaydiData,
  removengaydi,
  updatengaydi,
} from "./ngaydiSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import "./ngaydi.css";
function Ngaydi() {
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "ngay",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const [date, setdate] = useState("");
  function onChange(dates, dateStrings) {
    setdate(dateStrings);
  }
  const addDate = () => {
    if (date === "") {
      message.error("Bạn chưa nhập đầy đủ thông tin!");
    } else {
      if (ngaydi.find((x) => x.ngay === date)) {
        message.warning("Thời gian đã tồn tại!");
      } else {
        dispatch(addngaydi({ ngay: date, status: 1 }));
        setTimeout(() => {
          actionResult();
        }, 500);
      }
    }
  };
  const ngaydi = useSelector((state) => state.ngaydis.ngaydi.data);
  const loading = useSelector((state) => state.ngaydis.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(ngaydiData());
  };

  const hangdleDelete = (e) => {
    dispatch(removengaydi(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatengaydi({ status: 0, idsua: id }));
    } else {
      dispatch(updatengaydi({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>Ngày đi</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="add">
          <Space direction="vertical">
            <DatePicker
              className="mr-3"
              id="date"
              format="DD/MM/YYYY"
              onChange={onChange}
            />
          </Space>
          <Button variant="outlined" color="secondary" onClick={addDate}>
            <AddCircleOutlineOutlinedIcon />
            &nbsp;&nbsp; Thêm mới
          </Button>
        </div>
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={ngaydi.map((ok, index) => ({
              key: index + 1,
              ngay: <span>{ok.ngay}</span>,
              status: (
                <div className="action">
                  {ok.status === 1 ? (
                    <span
                      onClick={() => {
                        handleStatus(ok.status, ok.id);
                      }}
                    >
                      <ThumbUpOffAltOutlinedIcon className="text-primary" />
                    </span>
                  ) : (
                    <span onClick={() => handleStatus(ok.status, ok.id)}>
                      <ThumbDownOutlinedIcon />
                    </span>
                  )}
                </div>
              ),
              action: (
                <div className="action">
                  <Popconfirm
                    title="Bạn có muốn xoá？"
                    onConfirm={() => {
                      hangdleDelete(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </Popconfirm>
                </div>
              ),
            }))}
          />
        )}
      </div>
    </div>
  );
}

Ngaydi.propTypes = {};

export default Ngaydi;
