import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import {
  Modal,
  Popconfirm,
  Spin,
  Table,
  Checkbox,
  Row,
  Col,
  Radio,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import tourkhuyenmaiApi from "../../../../api/tourKhuyenmaiApi";
import tourloaitourApi from "../../../../api/tourLoaitour";
import { tourData } from "../Tour/tourSlice";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";

import {
  khuyenmaiData,
  removekhuyenmai,
  updatekhuyenmai,
} from "./khuyenmaiSlice";
function Khuyenmai() {
  const match = useRouteMatch();
  const columns = [
    {
      title: "Tên khuyến mãi",
      dataIndex: "name",
    },
    {
      title: "Khuyến mãi",
      dataIndex: "khuyenmai",
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
  const khuyenmais = useSelector((state) => state.khuyenmais.khuyenmai.data);
  const loading = useSelector((state) => state.khuyenmais.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(khuyenmaiData());
  };
  const actionTour = async () => {
    await dispatch(tourData());
  };
  useEffect(() => {
    actionResult();
  }, []);
  const history = useHistory();
  const hangdleDelete = (e) => {
    dispatch(removekhuyenmai(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const hangdleEdit = (id) => {
    history.replace(`${match.url}/suakhuyenmai/${id}`);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatekhuyenmai({ status: 0, idsua: id }));
    } else {
      dispatch(updatekhuyenmai({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
      actionTour();
    }, 500);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (khuyenmaiId === undefined || tourId === undefined) {
      message.warning("Bạn cần chọn đầy đủ thông tin");
    } else {
      if (khuyenmaiId === "0") {
        for (let i = 0; i < tourId.length; i++) {
          await tourkhuyenmaiApi.deletetourkhuyenmai(tourId[i]);
        }
        message.success("Huỷ khuyến mãi thành công!");
      } else {
        var data = [];
        for (let i = 0; i < tourId.length; i++) {
          if (tourId[i] !== 0) {
            await tourkhuyenmaiApi.deletetourkhuyenmai(tourId[i]);
            data.push({ khuyenmaiId: khuyenmaiId, tourId: tourId[i] });
          }
        }
        await tourkhuyenmaiApi.posttourkhuyenmai(data);
      }
      setTimeout(() => {
        actionTour();
      }, 500);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [tourId, setTourId] = useState();
  const onChangeCheckbox = (checkedValues) => {
    setTourId(checkedValues);
  };
  const [khuyenmaiId, setKhuyenmaId] = useState();

  const onChangeRadio = (e) => {
    setKhuyenmaId(e.target.value);
  };
  const checkAll = () => {
    const check = document.getElementById("all");
    if (check.checked) {
      var id = [0];
      for (let i = 0; i < tours.length; i++) {
        id.push(tours[i].id);
      }
      setTourId(id);
    } else {
      setTourId([]);
    }
  };
  const tours = useSelector((state) => state.tours.tour.data);
  return (
    <div id="admin">
      <div className="heading">
        <h4>Khuyễn mãi</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="add">
          <Button
            variant="outlined"
            color="primary"
            className="mr-2"
            onClick={showModal}
          >
            <AddCircleOutlineOutlinedIcon />
            &nbsp;&nbsp; Thêm khuyến mãi
          </Button>
          <Link to={`${match.url}/themkhuyenmai`}>
            <Button variant="outlined" color="secondary">
              <AddCircleOutlineOutlinedIcon />
              &nbsp;&nbsp; Thêm mới
            </Button>
          </Link>
        </div>
        <div className="add"></div>
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={khuyenmais.map((ok, index) => ({
              key: index + 1,
              name: <span>{ok.name}</span>,
              khuyenmai: <span>{ok.khuyenmai}%</span>,
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
        <Modal
          title="Chèn khuyến mãi"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6 ">
                <div>
                  <h5 className="text-center">Chọn tour</h5>
                  <Checkbox.Group
                    value={tourId}
                    style={{ width: "100%" }}
                    onChange={onChangeCheckbox}
                  >
                    <Row>
                      <Col className="w-100" onChange={checkAll}>
                        <Checkbox id="all" value={0}>
                          Chọn tất cả
                        </Checkbox>
                      </Col>
                      {!tours
                        ? ""
                        : tours.map((ok) => (
                            <Col className="w-100" key={ok.id}>
                              <Checkbox value={ok.id}>{ok.name}</Checkbox>
                            </Col>
                          ))}
                    </Row>
                  </Checkbox.Group>
                </div>
              </div>
              <div className="col-md-6 ">
                <div>
                  <h5 className="text-center">Chọn khuyến mãi</h5>
                  <Radio.Group onChange={onChangeRadio}>
                    <Radio style={{ width: "100%" }} value="0">
                      Huỷ khuyến mãi
                    </Radio>
                    {!khuyenmais
                      ? ""
                      : khuyenmais.map((ok) => (
                          <Radio style={{ width: "100%" }} value={ok.id}>
                            {ok.name}
                          </Radio>
                        ))}
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Khuyenmai;
