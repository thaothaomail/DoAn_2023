import { Image, Spin, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { anhData, updateanh } from "./anhSlice";

import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
function Anh() {
  const columns = [
    {
      title: "Tour",
      dataIndex: "name",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Ảnh",
      dataIndex: "link",
    },
    {
      title: "Banner",
      dataIndex: "banner",
    },
  ];
  const anhs = useSelector((state) => state.anhs.anh.data);
  const loading = useSelector((state) => state.anhs.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(anhData());
  };

  const history = useHistory();
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updateanh({ status: 0, idsua: id }));
    } else {
      dispatch(updateanh({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const handleBanner = (e, id) => {
    if (e === 1) {
      dispatch(updateanh({ banner: 0, idsua: id }));
    } else {
      dispatch(updateanh({ banner: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>Ảnh</h4>
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
            dataSource={anhs.map((ok, index) => ({
              key: index + 1,
              name: <span>{ok.Tour.name}</span>,
              link: <Image src={ok.link} width="200px" height="150px" alt="" />,
              banner: (
                <div className="action">
                  {ok.banner === 1 ? (
                    <span
                      onClick={() => {
                        handleBanner(ok.banner, ok.id);
                      }}
                    >
                      <CheckCircleOutlineOutlinedIcon className="text-success" />
                      {/* <i className="fas fa-check text-success"></i> */}
                    </span>
                  ) : (
                    <span onClick={() => handleBanner(ok.banner, ok.id)}>
                      <AccessTimeOutlinedIcon className="text-danger" />
                      {/* <i className="fas fa-times text-danger"></i> */}
                    </span>
                  )}
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
                      <ThumbUpOffAltOutlinedIcon />
                    </span>
                  ) : (
                    <span onClick={() => handleStatus(ok.status, ok.id)}>
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

Anh.propTypes = {};

export default Anh;
