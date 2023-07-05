import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function Chitietquocgia(props) {
  const { id } = useParams();
  const quocgia = useSelector((state) => {
    if (state.quocgias.quocgia.data) {
      return state.quocgias.quocgia.data.find((x) => x.id === +id);
    }
  });
  return (
    <div id="admin">
      <div className="heading">
        <h4>Chi tiết quốc gia</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="ct">
          {quocgia === "ko" ? (
            <div className="spin">
              <Spin />
            </div>
          ) : (
            <div>
              <p>
                Tên quốc gia:&emsp;{" "}
                <b>
                  <i>{quocgia.name}</i>
                </b>
              </p>
              <p>Các địa điểm: </p>
              {quocgia.Diadiems.map((oki) => (
                <div>
                  <strong>- &emsp;{oki.name}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Chitietquocgia.propTypes = {};

export default Chitietquocgia;
