import React, { useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Popconfirm, Spin, Table } from "antd";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  camnangdulichData,
  removecamnangdulich,
  updatecamnangdulich,
} from "./camnangdulichSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

function Camnangdulich() {
  const match = useRouteMatch();
  const columns = [
    {
      title: "tên",
      dataIndex: "name",
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
      title: "Action",
      dataIndex: "action",
    },
  ];
  const camnangdulichs = useSelector(
    (state) => state.camnangdulichs.camnangdulich.data
  );
  const loading = useSelector((state) => state.camnangdulichs.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(camnangdulichData());
  };

  useEffect(() => {
    //actionResult();
  }, []);
  const history = useHistory();
  const hangdleDelete = (e) => {
    dispatch(removecamnangdulich(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const hangdleEdit = (id) => {
    history.replace(`${match.url}/suacamnangdulich/${id}`);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatecamnangdulich({ status: 0, idsua: id }));
    } else {
      dispatch(updatecamnangdulich({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 600);
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>Cẩm nang du lịch</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themcamnangdulich`}>
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
            dataSource={camnangdulichs.map((ok, index) => ({
              key: index + 1,
              name: <span>{ok.name}</span>,
              icon: (
                <span
                  className={`${ok.icon} text-success`}
                  style={{ fontSize: "1.5rem" }}
                ></span>
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
                      {/* <i className="far fa-thumbs-down "></i> */}
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

Camnangdulich.propTypes = {};

export default Camnangdulich;
