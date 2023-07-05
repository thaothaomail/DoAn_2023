import React from "react";
import { Popconfirm, Spin, Table } from "antd";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { chiphiData, removechiphi } from "./chiphiSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
function Chiphi() {
  const match = useRouteMatch();

  const columns = [
    {
      title: "Tên chi phí",
      dataIndex: "name",
    },
    {
      title: "Số tiền",
      dataIndex: "money",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const chiphi = useSelector((state) => state.chiphis.chiphi.data);
  const loading = useSelector((state) => state.chiphis.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(chiphiData());
  };

  const history = useHistory();
  const hangdleDelete = (e) => {
    dispatch(removechiphi(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const hangdleEdit = (id) => {
    history.replace(`${match.url}/suachiphi/${id}`);
  };

  return (
    <div id="admin">
      <div className="heading">
        <h4>Chi phí</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themchiphi`}>
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
            dataSource={chiphi.map((ok, index) => ({
              key: index + 1,
              name: <span>{ok.title}</span>,
              money: <span>{ok.money.toLocaleString()}</span>,
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
          />
        )}
      </div>
    </div>
  );
}

Chiphi.propTypes = {};

export default Chiphi;
