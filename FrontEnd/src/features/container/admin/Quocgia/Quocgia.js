import React, { useEffect } from "react";
import { Popconfirm, Spin, Table } from "antd";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { quocgiaData, removequocgia, updatequocgia } from "./quocgiaSlice";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { diadiemData } from "../DiaDiem/diadiemSlice";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
function Quocgia() {
  const match = useRouteMatch();

  const columns = [
    {
      title: "Tên quốc gia",
      dataIndex: "name",
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
  var sts = 1;
  const data = [
    {
      key: "1",
      name: (
        <div>
          <Link>John Brown</Link>
        </div>
      ),
      status: (
        <div className="action">
          {sts === 1 ? (
            <Link>
              <ThumbUpOffAltOutlinedIcon />
            </Link>
          ) : (
            <Link>
              <ThumbDownOutlinedIcon />
            </Link>
          )}
        </div>
      ),
      action: (
        <div className="action">
          <Link>
            <EditOutlinedIcon />
          </Link>
          <Link>
            <DeleteOutlineOutlinedIcon />
          </Link>
        </div>
      ),
    },
  ];
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  const quocgia = useSelector((state) => state.quocgias.quocgia.data);
  const loading = useSelector((state) => state.quocgias.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(quocgiaData());
  };
  const actionDiadiem = async () => {
    await dispatch(diadiemData());
  };

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const history = useHistory();
  const hangdleDelete = (e) => {
    dispatch(removequocgia(e));
    setTimeout(() => {
      actionResult();
      actionDiadiem();
    }, 500);
  };
  const hangdleEdit = (id) => {
    history.replace(`${match.url}/suaquocgia/${id}`);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatequocgia({ status: 0, idsua: id }));
    } else {
      dispatch(updatequocgia({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>Quốc gia</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themquocgia`}>
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
            dataSource={quocgia.map((ok, index) => ({
              key: index + 1,
              name: (
                <Link to={`${match.url}/chitietquocgia/${ok.id}`}>
                  {ok.name}
                </Link>
              ),
              status: (
                <div className="action">
                  {ok.status === 1 ? (
                    <Link
                      onClick={() => {
                        handleStatus(ok.status, ok.id);
                      }}
                    >
                      <i className="far fa-thumbs-up "></i>
                    </Link>
                  ) : (
                    <Link onClick={() => handleStatus(ok.status, ok.id)}>
                      <i className="far fa-thumbs-down "></i>
                    </Link>
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
                    <Link>
                      <CreateOutlinedIcon />
                    </Link>
                  </Popconfirm>
                  <Popconfirm
                    title="Bạn có muốn xoá？"
                    onConfirm={() => {
                      hangdleDelete(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Link>
                      <DeleteOutlineOutlinedIcon />
                    </Link>
                  </Popconfirm>
                </div>
              ),
            }))}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}

Quocgia.propTypes = {};

export default Quocgia;
