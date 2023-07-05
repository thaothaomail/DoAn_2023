import React, { useEffect } from "react";
import { Popconfirm, Spin, Table } from "antd";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { tagData, removetag, updatetag } from "./tagSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { diadiemData } from "../DiaDiem/diadiemSlice";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
function Tag() {
  const match = useRouteMatch();

  const columns = [
    {
      title: "tên tag",
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

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  const tag = useSelector((state) => state.tags.tag.data);
  const loading = useSelector((state) => state.tags.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(tagData());
  };

  const history = useHistory();
  const hangdleDelete = (e) => {
    dispatch(removetag(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const hangdleEdit = (id) => {
    history.replace(`${match.url}/suatag/${id}`);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatetag({ status: 0, idsua: id }));
    } else {
      dispatch(updatetag({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>Tags</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themtag`}>
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
            dataSource={tag.map((ok, index) => ({
              key: index + 1,
              name: (
                <Link to={`${match.url}/chitiettag/${ok.id}`}>{ok.name}</Link>
              ),
              status: (
                <div className="action">
                  {ok.status === 1 ? (
                    <Link
                      onClick={() => {
                        handleStatus(ok.status, ok.id);
                      }}
                    >
                      <ThumbUpOffAltOutlinedIcon />
                    </Link>
                  ) : (
                    <Link onClick={() => handleStatus(ok.status, ok.id)}>
                      <ThumbDownOutlinedIcon />
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

Tag.propTypes = {};

export default Tag;
