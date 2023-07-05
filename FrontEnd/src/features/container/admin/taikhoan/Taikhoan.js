import React, { useEffect, useState } from "react";
import { Image, Modal, Popconfirm, Spin, Table } from "antd";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateuser, userData } from "./taikhoanSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import taikhoanApi from "../../../../api/taikhoanApi";
import userroleApi from "../../../../api/userroleApi";

import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

function Taikhoan(props) {
  const match = useRouteMatch();

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Quyền",
      dataIndex: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const users = useSelector((state) => state.taikhoan.user.data);
  const loading = useSelector((state) => state.taikhoan.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(userData());
  };
  useEffect(() => {
    actionResult();
  }, []);
  const [userId, setUseId] = useState();
  const hangdleUpdate = (e) => {
    setUseId(e);
    setIsModalVisible(true);
  };
  const roles = useSelector((state) => state.roles.role.data);
  const handleOk = async () => {
    var inforadmin = await taikhoanApi.getOneAdmin(userId).then((ok) => {
      return ok;
    });
    await userroleApi.edituserrole({ idsua: inforadmin.id, roleId: value });
    actionResult();
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChangeRadio = (e) => {
    setValue(e.target.value);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updateuser({ status: 0, idsua: id }));
    } else {
      dispatch(updateuser({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const chuhoa = (e) => {
    return e.charAt(0).toUpperCase() + e.slice(1);
  };
  const [value, setValue] = useState(6);
  return (
    <div id="admin">
      <div className="heading">
        <h4>Quản lý tài khoản</h4>
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
            dataSource={users.map((ok, index) => ({
              key: index + 1,
              name: (
                <Link to={`${match.url}/chitiettaikhoan/${ok.id}`}>
                  {ok.name}
                </Link>
              ),
              email: <span>{ok.email}</span>,
              avatar: ok.avatar ? (
                <Image width="100px" height="120px" src={ok.avatar} alt="" />
              ) : (
                <Image
                  width="100px"
                  height="120px"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
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
              role:
                ok.Roles.name === "admin" ? (
                  <span className="text-danger">
                    <b>{chuhoa(ok.Roles[0].name)}</b>
                  </span>
                ) : (
                  <span className="text-success">
                    <b>{chuhoa(ok.Roles[0].name)}</b>
                  </span>
                ),
              action: (
                <div className="action">
                  <Popconfirm
                    title="Bạn muốn cấp quyền truy cập cho tài khoản này？"
                    onConfirm={() => {
                      hangdleUpdate(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <PersonAddAltOutlinedIcon className="text-warning" />
                    {/* <i className="fas fa-user-lock text-warning"></i> */}
                  </Popconfirm>
                </div>
              ),
            }))}
          />
        )}
        <Modal
          title="Cấp quyền truy cập hệ thống"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Radio.Group onChange={onChangeRadio} value={value}>
            {!roles
              ? ""
              : roles.map((ok) => (
                  <Radio style={radioStyle} key={ok.id} value={ok.id}>
                    <span>
                      {ok.name === "user" ? "Người dùng" : chuhoa(ok.name)}
                    </span>
                  </Radio>
                ))}
          </Radio.Group>
        </Modal>
      </div>
    </div>
  );
}

Taikhoan.propTypes = {};

export default Taikhoan;
