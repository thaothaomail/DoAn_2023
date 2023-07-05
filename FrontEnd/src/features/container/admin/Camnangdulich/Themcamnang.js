import { Button } from "@material-ui/core";
import { message, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  addcamnangdulich,
  camnangdulichData,
  updatecamnangdulich,
} from "./camnangdulichSlice";

function Themcamnangdulich(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camnangdulich = useSelector((state) =>
    state.camnangdulichs.camnangdulich.data.find((x) => x.id === +id)
  );
  useEffect(() => {
    if (id) {
      setState({
        ...state,
        status: camnangdulich.status,
        name: camnangdulich.name,
        content: camnangdulich.content,
        icon: camnangdulich.icon,
        idsua: id,
      });
    }
  }, []);
  const [state, setState] = useState({
    name: "",
    content: "",
    icon: "",
    status: 1,
    idsua: "",
  });
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const actionResult = async () => {
    await dispatch(camnangdulichData());
  };
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "" || content.trim() !== "" || icon.trim() !== "") {
      if (id) {
        dispatch(updatecamnangdulich(state));
      } else {
        dispatch(addcamnangdulich(state));
      }
    } else {
      message.error("Xin hãy nhập thông tin!");
    }
    setTimeout(() => {
      actionResult();
    }, 700);
    history.push("/admin/camnangdulich");
  };

  const { name, icon, content } = state;
  return (
    <div id="admin">
      <div className="heading">
        <h4>{id ? "Sửa cẩm nang" : "Thêm cẩm nang"}</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <form action="" method="post" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="">Tên cẩm nang</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">icon</label>
            <input
              type="text"
              name="icon"
              value={icon}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Nội dung</label>
            <textarea
              name="content"
              className="form-control w-50"
              maxLength="500"
              value={content}
              onChange={onChange}
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="text-center mtb">
            <Button color="primary" type="submit" variant="contained">
              {id ? "Sửa cẩm nang" : "Thêm cẩm nang"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

Themcamnangdulich.propTypes = {};

export default Themcamnangdulich;
