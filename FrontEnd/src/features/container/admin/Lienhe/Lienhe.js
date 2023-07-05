import React, { useEffect } from "react";
import { Popconfirm, Spin, Table } from "antd";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { lienheData, removelienhe, updatelienhe } from "./lienheSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { diadiemData } from "../DiaDiem/diadiemSlice";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
function Lienhe() {
  const match = useRouteMatch();

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
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
  const lienhe = useSelector((state) => state.lienhes.lienhe.data);
  const loading = useSelector((state) => state.lienhes.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(lienheData());
  };

  const history = useHistory();
  const hangdleDelete = (e) => {
    dispatch(removelienhe(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const hangdleEdit = (id) => {
    history.replace(`${match.url}/sualienhe/${id}`);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatelienhe({ status: 0, idsua: id }));
    } else {
      dispatch(updatelienhe({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>Liên hệ</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themlienhe`}>
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
            dataSource={lienhe.map((ok, index) => ({
              key: index + 1,
              sdt: <span>{ok.sdt}</span>,
              name: <span>{ok.name}</span>,
              email: <span>{ok.email}</span>,
              diachi: <span>{ok.diachi}</span>,
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

Lienhe.propTypes = {};

export default Lienhe;
