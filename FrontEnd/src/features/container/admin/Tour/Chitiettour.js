import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import renderHTML from "react-render-html";
import { useParams } from "react-router-dom";
function Chitietquocgia(props) {
  const { id } = useParams();
  const tour = useSelector((state) =>
    state.tours.tour.data.find((x) => x.id === +id)
  );
  const loading = useSelector((state) => state.tours.loading);
  return (
    <div id="admin">
      <div className="heading">
        <h4>Chi tiết tour</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="ct">
          {loading ? (
            <div className="spin">
              <Spin className="mt-5" />
            </div>
          ) : (
            <div>
              <p>
                Tên tour:&emsp;{" "}
                <b>
                  <i>{tour.name}</i>
                </b>
              </p>
              <p>
                Avatar:&emsp;
                <img width="350px" height="393px" src={tour.avatar} alt="" />
              </p>
              <p>Trailer:</p>
              <div className="text-center">
                <div className="embed-responsive embed-responsive-16by9">
                  {renderHTML(tour.trailer)}
                </div>
              </div>
              <p>
                Giá tiền người lớn:&emsp;{" "}
                <b>
                  <i>{tour.gianguoilon}</i>
                </b>
              </p>
              <p>
                Giá trẻ em:&emsp;{" "}
                <b>
                  <i>{tour.giatreem}</i>
                </b>
              </p>
              <p>
                Giá em bé:&emsp;{" "}
                <b>
                  <i>{tour.giaembe}</i>
                </b>
              </p>
              <p>Banner: </p>
              {tour.Anhs.map((oki) => (
                <div className="text-center mb-3">
                  <img src={oki.link} width="500px" height="400px" alt="" />
                </div>
              ))}
              <p>Bản đồ:&emsp; </p>
              <div
                id="map-container-google-1"
                className="z-depth-1-half map-container mb-3"
              >
                {renderHTML(tour.bando)}
              </div>
              <p className="text-justify">
                Chi tiết tour:&emsp; {renderHTML(tour.chitiettour)}
              </p>
              <p className="text-justify">
                Lưu ý:&emsp; {renderHTML(tour.luuy)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Chitietquocgia.propTypes = {};

export default Chitietquocgia;
