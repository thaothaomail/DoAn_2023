import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import { Popconfirm, Spin, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { dichvuData, removedichvu, updatedichvu } from "./dichvuSlice";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
function Dichvu() {
  const match = useRouteMatch();
  const columns = [
    {
      title: "Loại tour",
      dataIndex: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
    },
    {
      title: "icon",
      dataIndex: "icon",
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
  const dichvus = useSelector((state) => state.dichvus.dichvu.data);
  const loading = useSelector((state) => state.dichvus.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(dichvuData());
  };

  const history = useHistory();
  const hangdleDelete = (e) => {
    dispatch(removedichvu(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const hangdleEdit = (id) => {
    history.replace(`${match.url}/suadichvu/${id}`);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatedichvu({ status: 0, idsua: id }));
    } else {
      dispatch(updatedichvu({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const handleLoadhome = (e, id) => {
    if (e === 1) {
      dispatch(updatedichvu({ loadhome: 0, idsua: id }));
    } else {
      dispatch(updatedichvu({ loadhome: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };

  return (
    <div id="admin">
      <div className="heading">
        <h4>Dịch vụ</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themdichvu`}>
            <Button variant="outlined" color="secondary">
              <AddCircleOutlineOutlinedIcon />
              &nbsp;&nbsp; Thêm mới
            </Button>
          </Link>
        </div>
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={dichvus.map((ok, index) => ({
              key: index + 1,
              name: <span>{ok.name}</span>,
              mota: <span>{ok.mota}</span>,
              icon: (
                <span
                  className={`${ok.icon} text-success`}
                  style={{ fontSize: "1.5rem" }}
                ></span>
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
                    title="Bạn có muốn sửa？"
                    onConfirm={() => {
                      hangdleEdit(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "green" }} />}
                  >
                    <CreateOutlinedIcon />
                  </Popconfirm>
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

Dichvu.propTypes = {};

export default Dichvu;
