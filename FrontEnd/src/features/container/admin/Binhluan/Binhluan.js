import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { Popconfirm, Rate, Spin, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { binhluanData, removebinhluan, updatebinhluan } from "./binhluanSlice";

import { useDispatch, useSelector } from "react-redux";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import "./binhluan.css";
function Binhluan() {
  const match = useRouteMatch();
  console.log(match.url);
  const columns = [
    {
      title: "Người dùng",
      dataIndex: "user",
    },
    {
      title: "Tuor",
      dataIndex: "tour",
    },
    {
      title: "Bình luận",
      dataIndex: "binhluan",
    },
    {
      title: "Điểm",
      dataIndex: "star",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Hiện trang chủ",
      dataIndex: "loadhome",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const binhluans = useSelector((state) => state.binhluans.binhluan.data);
  const loading = useSelector((state) => state.binhluans.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(binhluanData());
  };
  var binhluan = [];
  if (binhluans) {
    for (let i = 0; i < binhluans.length; i++) {
      if (binhluans[i].binhluan.length === 0) {
        binhluan.push(binhluans[i]);
      } else {
        binhluan.unshift(binhluans[i]);
      }
    }
  }
  useEffect(() => {}, []);
  const history = useHistory();
  const hangdleDelete = (e) => {
    dispatch(removebinhluan(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const hangdleInfor = (id) => {
    history.push(`${match.url}/chitietbinhluan/${id}`);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatebinhluan({ status: 0, idsua: id }));
    } else {
      dispatch(updatebinhluan({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const handleLoadhome = (e, id) => {
    if (e === 1) {
      dispatch(updatebinhluan({ loadhome: 0, idsua: id }));
    } else {
      dispatch(updatebinhluan({ loadhome: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>Bình luận</h4>
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
            dataSource={binhluan.map((ok, index) => ({
              key: index + 1,
              user: <span>{ok.User.name}</span>,
              tour: <span>{ok.Tour.name}</span>,
              binhluan: (
                <p className="text-justify">
                  <b>{ok.binhluan}</b>
                </p>
              ),
              star: (
                <div className="size-binhluan">
                  <Rate className="rate-binhluan" value={ok.star} disabled />
                </div>
              ),
              status: (
                <div className="action">
                  {ok.status === 1 ? (
                    <span
                      onClick={() => {
                        handleStatus(ok.status, ok.id);
                      }}
                    >
                      <ThumbUpOffAltOutlinedIcon className="text-primary" />
                      {/* <i className="far fa-thumbs-up text-primary"></i> */}
                    </span>
                  ) : (
                    <span onClick={() => handleStatus(ok.status, ok.id)}>
                      <ThumbDownOutlinedIcon />
                    </span>
                  )}
                </div>
              ),
              loadhome: (
                <div className="action">
                  {ok.loadhome === 1 ? (
                    <span
                      onClick={() => {
                        handleLoadhome(ok.loadhome, ok.id);
                      }}
                    >
                      <CheckCircleOutlineOutlinedIcon className="text-success" />
                    </span>
                  ) : (
                    <span onClick={() => handleLoadhome(ok.loadhome, ok.id)}>
                      <AccessTimeOutlinedIcon className="text-danger" />
                    </span>
                  )}
                </div>
              ),
              action: (
                <div className="action">
                  <span onClick={() => hangdleInfor(ok.id)}>
                    <InfoOutlinedIcon className="mr-4 text-primary" />
                    {/* <i className="fas fa-info-circle mr-4 text-primary"></i> */}
                  </span>
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

Binhluan.propTypes = {};

export default Binhluan;
