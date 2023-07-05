import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addquocgia, quocgiaData, updatequocgia } from "./quocgiaSlice";
import { message } from "antd";

function Themquocgia(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState({ status: 1, name: "", idsua: "" });
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const quocgia = useSelector((state) =>
    state.quocgias.quocgia.data.find((x) => x.id === +id)
  );
  useEffect(() => {
    if (id) {
      setState({
        status: quocgia.status,
        name: quocgia.name,
        idsua: id,
      });
    }
  }, []);
  const { name } = state;
  const actionResult = async () => {
    await dispatch(quocgiaData());
  };
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      message.error("Xin hãy nhập đầy đủ thông tin!");
    } else {
      if (id) {
        dispatch(updatequocgia(state));
      } else {
        const action = addquocgia(state);
        dispatch(action);
      }
      setTimeout(() => {
        actionResult();
      }, 700);
      history.push("/admin/quocgia");
    }
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>{id ? "Sửa quốc gia" : "Thêm quốc gia"}</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <form action="" method="post" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="">Tên quốc gia</label>
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
          <div className="text-center mtb">
            <Button type="submit" color="primary" variant="contained">
              {id ? "Sửa quốc gia" : "Thêm quốc gia"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

Themquocgia.propTypes = {};

export default Themquocgia;
