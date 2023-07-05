import { Avatar, Button, IconButton } from "@material-ui/core";
import { Drawer, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../../../../firebase";
import taikhoanApi from "../../../../api/taikhoanApi";
import userroleApi from "../../../../api/userroleApi";
import "./header.css";
function Header(props) {
  const formatdate = (e) => {
    if (e) {
      var ngay = e.substr(8, 2);
      var thang = e.substr(5, 2);
      var nam = e.substr(0, 4);
      return ngay + "/" + thang + "/" + nam;
    }
  };
  const [state, setState] = useState({
    collapsed: false,
    visible: false,
    collapsed2: false,
    visible2: false,
    kynang: "",
    facebook: "",
    github: "",
    name: "",
    sdt: "",
    diachi: "",
    gioitinh: 1,
    ngaysinh: "",
    chamngon: "",
    email: "",
    website: "",
    linkImg: "",
    tenanh: "",
    img: "",
  });
  const hangdelimage = (e) => {
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      tenanh: e.target.files[0].name,
      img: e.target.files[0],
    });
  };
  const {
    kynang,
    facebook,
    github,
    img,
    linkImg,
    name,
    sdt,
    diachi,
    gioitinh,
    ngaysinh,
    chamngon,
    website,
  } = state;
  const showDrawer = () => {
    setState({
      ...state,
      visible: true,
    });
  };
  const hangdleGioitinh = (e) => {
    setState({
      ...state,
      gioitinh: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    var idsua = users.id;
    if (
      name.trim() === "" ||
      diachi.trim() === "" ||
      gioitinh === "" ||
      ngaysinh.trim() === "" ||
      sdt.trim() === "" ||
      kynang.trim() === "" ||
      website.trim() === "" ||
      chamngon.trim() === "" ||
      github.trim() === "" ||
      facebook.trim() === ""
    ) {
      message.warning("Bạn chưa nhập đủ thông tin!");
    } else {
      if (img) {
        await storage.ref(`imagesUser/${img.name}`).put(img);
        const anh = await storage
          .ref("imagesUser")
          .child(img.name)
          .getDownloadURL();
        var updateUser = await taikhoanApi
          .edituser({
            idsua: idsua,
            name: name,
            avatar: anh,
            diachi: diachi,
            sdt: sdt,
            gioitinh: gioitinh,
            ngaysinh: ngaysinh,
          })
          .then((data) => {
            return data;
          });
        var updateUserRole = await userroleApi
          .edituserroleHeader({
            idsua: user.idUserRole,
            kynang: kynang,
            chamngon: chamngon,
            website: website,
            github: github,
            facebook: facebook,
          })
          .then((data) => {
            return data;
          });
        console.log(updateUser, updateUserRole);
        if (updateUser && updateUserRole) {
          getprofile();
          message.success("Sửa thông tin thành công!");
          setState({
            visible2: false,
          });
        } else {
          message.error("Sửa thất bại!");
        }
      } else {
        var updateUser = await taikhoanApi
          .edituser({
            idsua: idsua,
            name: name,
            diachi: diachi,
            sdt: sdt,
            gioitinh: gioitinh,
            ngaysinh: ngaysinh,
          })
          .then((data) => {
            return data;
          });
        var updateUserRole = await userroleApi
          .edituserroleHeader({
            idsua: user.idUserRole,
            kynang: kynang,
            chamngon: chamngon,
            website: website,
            github: github,
            facebook: facebook,
          })
          .then((data) => {
            return data;
          });
        if (updateUser && updateUserRole) {
          getprofile();
          message.success("Sửa thông tin thành công!");
          setState({
            visible2: false,
          });
        } else {
          message.error("Sửa thất bại!");
        }
      }
    }
  };
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onClose = () => {
    setState({
      ...state,
      visible: false,
    });
  };
  const showDrawer2 = () => {
    setState({
      ...state,
      visible2: true,
    });
  };
  const onClose2 = () => {
    setState({
      ...state,
      visible2: false,
    });
  };
  const users = useSelector((state) => state.infor.infor.data);

  const [user, setUser] = useState();
  const getprofile = async () => {
    if (users) {
      var infor = await taikhoanApi.getOne(users.id).then((ok) => {
        return ok;
      });
      var inforadmin = await taikhoanApi.getOneAdmin(users.id).then((ok) => {
        return ok;
      });
      setUser({
        name: infor.name,
        diachi: infor.diachi,
        email: infor.email,
        gioitinh: infor.gioitinh,
        ngaysinh: infor.ngaysinh,
        sdt: infor.sdt,
        avatar: infor.avatar,
        idUserRole: inforadmin.id,
        chamngon: inforadmin.chamngon,
        facebook: inforadmin.facebook,
        github: inforadmin.github,
        kynang: inforadmin.kynang,
        website: inforadmin.website,
      });
      setState({
        name: infor.name,
        diachi: infor.diachi,
        email: infor.email,
        gioitinh: infor.gioitinh,
        ngaysinh: infor.ngaysinh,
        sdt: infor.sdt,
        chamngon: inforadmin.chamngon,
        facebook: inforadmin.facebook,
        github: inforadmin.github,
        kynang: inforadmin.kynang,
        website: inforadmin.website,
      });
    }
  };
  useEffect(() => {
    getprofile();
  }, [users]);
  return (
    <div id="header">
      {!user ? (
        ""
      ) : (
        <ul className="navbar-nav float-right" onClick={showDrawer}>
          <li className="nav-item mr-3 mt-2">{user.name}</li>
          <li className="nav-item ">
            <Avatar
              alt="Remy Sharp"
              src={
                user.avatar
                  ? user.avatar
                  : "data:image/jpeg;base64,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"
              }
              name="as"
              className="pick"
            />
          </li>
        </ul>
      )}
      {!user ? (
        ""
      ) : (
        <Drawer
          title="Thông tin admin"
          placement="right"
          onClose={onClose}
          visible={state.visible}
        >
          <div>
            <div className="center">
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : "data:image/jpeg;base64,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"
                }
                className="avatar-admin"
                alt=""
              />
            </div>
            <h4>Cá nhân</h4>
            <div className="row">
              <div className="col-md-6">
                <p className="mb-2">
                  <span>Họ tên:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="tt-user">{user.name}</span>
                </p>
                <p className="mb-2">
                  <span>Công ty:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="tt-user">Du lịch Nghệ An</span>
                </p>
                <p className="mb-2">
                  <span>Ngày sinh:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="tt-user">{formatdate(user.ngaysinh)}</span>
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb-2">
                  <span>Account:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="tt-user">{user.email}</span>
                </p>
                <p className="mb-2">
                  <span>Địa chỉ:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="tt-user">{user.diachi}</span>
                </p>
                <p className="mb-2">
                  <span>Website:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="tt-user">Laisatthu.com.vn</span>
                </p>
              </div>
              <p className="tab">
                <span>Châm ngôn:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="tt-user">{user.chamngon}</span>
              </p>
            </div>
          </div>
          <hr />
          <h4>Công ty</h4>
          <div className="row">
            <div className="col-md-6">
              <p className="mb-2">
                <span>Chức vụ:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="tt-user">Người quản lý</span>
              </p>
              <p className="mb-2">
                <span>Bộ phận:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="tt-user">{users ? users.role : ""}</span>
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-2">
                <span>Trách nhiệm:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="tt-user">{users ? users.mota : ""}</span>
              </p>
              <p className="mb-2">
                <span>Giám sát:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="tt-user">Trần Sang</span>
              </p>
            </div>
            <p className="tab">
              <span>Kỹ năng:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span className="tt-user text-justify">{user.kynang}</span>
            </p>
          </div>
          <hr />
          <h4>Liên hệ</h4>
          <div className="row">
            <div className="col-md-6">
              <p className="mb-2">
                <span>Email:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="tt-user">{user.email}</span>
              </p>
              <p className="mb-2">
                <span>Github:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="tt-user">{user.github}</span>
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-2">
                <span>Phone Number:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="tt-user">{user.sdt}</span>
              </p>
              <p className="mb-2">
                <span>Facebook:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="tt-user">{user.facebook}</span>
              </p>
            </div>
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => showDrawer2()}
            className="float-right mt-2"
          >
            Thay đổi thông tin
          </Button>
        </Drawer>
      )}
      <Drawer
        style={{ zIndex: "100001" }}
        title="Sửa thông tin cá nhân"
        placement="right"
        onClose={onClose2}
        visible={state.visible2}
      >
        <form action="" method="post" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="">Tên người dùng</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Thêm poster</label>
            <div>
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={hangdelimage}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  className="mr-5 ml-4"
                  aria-label="upload picture"
                  component="span"
                >
                  <i className="fas fa-camera-retro"></i>
                </IconButton>
              </label>
              {linkImg ? (
                <img
                  src={linkImg}
                  className="ml-5"
                  style={{ borderRadius: "100%" }}
                  height="100px"
                  width="100px"
                  alt=""
                />
              ) : (
                ""
              )}
              <br />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Giới tính</label>
            <select className="form-control" onChange={hangdleGioitinh}>
              <option value="1">nam</option>
              <option value="0">Nữ</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Số điện thoại</label>
            <input
              type="text"
              name="sdt"
              value={sdt}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Địa chỉ</label>
            <input
              type="text"
              name="diachi"
              value={diachi}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Ngày sinh</label>
            <input
              type="date"
              name="ngaysinh"
              value={ngaysinh}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Kỹ năng</label>
            <input
              type="text"
              name="kynang"
              value={kynang}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Github</label>
            <input
              type="text"
              name="github"
              value={github}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={facebook}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Website</label>
            <input
              type="text"
              name="website"
              value={website}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Châm ngôn</label>
            <input
              type="text"
              name="chamngon"
              value={chamngon}
              onChange={onChange}
              className="form-control "
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="text-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className=" mt-2"
            >
              Sửa đổi
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}

Header.propTypes = {};

export default Header;
