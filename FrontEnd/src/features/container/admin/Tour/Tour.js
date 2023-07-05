import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import { Image, Popconfirm, Spin, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { ngaydiData } from "../Ngaydi/ngaydiSlice";
import { removetour, updatetour } from "./tourSlice";
import { tourData } from "./tourSlice";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";

function Tour() {
  const match = useRouteMatch();

  const dispatch = useDispatch();
  const tours = useSelector((state) => state.tours.tour.data);
  var tour = [];
  if (tours) {
    var sort = [];
    for (let i = 0; i < tours.length; i++) {
      sort.unshift(tours[i]);
    }
    tour = sort;
  }
  const loading = useSelector((state) => state.tours.Loading);
  const history = useHistory();
  const actionResult = async () => await dispatch(tourData());
  const actionngaydi = async () => await dispatch(ngaydiData());
  useEffect(() => {
    actionResult();
    actionngaydi();
  }, []);

  const columns = [
    {
      title: "Tên tour",
      dataIndex: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "anh",
    },
    {
      title: "tình trạng",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const hangdleDelete = (e) => {
    dispatch(removetour(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const hangdleEdit = (id) => {
    history.replace(`${match.url}/suatour/${id}`);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatetour({ status: 0, idsua: id }));
    } else {
      dispatch(updatetour({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>Quản lý tour</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themtour`}>
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
            dataSource={tour.map((ok, index) => ({
              key: index + 1,
              name: (
                <Link to={`${match.url}/chitiettour/${ok.id}`}>{ok.name}</Link>
              ),
              anh: (
                <Image src={ok.avatar} width="150px" height="200px" alt="" />
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
              action: (
                <div className="action">
                  <Popconfirm
                    title="Bạn có muốn sửa？"
                    onConfirm={() => {
                      hangdleEdit(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "green" }} />}
                  >
                    <CreateOutlinedIcon style={{ cursor: "pointer" }} />
                  </Popconfirm>
                  <Popconfirm
                    title="Bạn có muốn xoá？"
                    onConfirm={() => {
                      hangdleDelete(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <DeleteOutlineOutlinedIcon style={{ cursor: "pointer" }} />
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

Tour.propTypes = {};

export default Tour;
