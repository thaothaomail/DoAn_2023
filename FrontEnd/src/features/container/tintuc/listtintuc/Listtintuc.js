import React, { useEffect } from "react";
import "./listtintuc.css";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { useSelector } from "react-redux";
export default function Listtintuc() {
  const tintucs = useSelector((state) => state.tintucs.tintuc.data);
  var tintuc = [];
  if (tintucs) {
    for (let i = 0; i < tintucs.length; i++) {
      if (tintucs[i].status === 1) {
        tintuc.unshift(tintucs[i]);
      }
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const tomtat = (e) => {
    var chu = "";
    for (let i = 0; i < e.length; i++) {
      if (chu.length < 225) {
        chu += e[i];
      }
    }
    chu = chu + "...";
    return chu;
  };
  const formatdate = (e) => {
    if (e) {
      var ngay = e.substr(8, 2);
      var thang = e.substr(5, 2);
      var nam = e.substr(0, 4);
      var gio = e.substr(11, 2);
      var phut = e.substr(14, 2);
      return ngay + "/" + thang + "/" + nam + " " + gio + ":" + phut;
    }
  };
  return (
    <div id="listtintuc">
      <div className="breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home mr-2"></i>Trang chủ
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Tour du lịch
            </li>
          </ol>
        </nav>
      </div>
      <div className="title-new">
        <div className="hr-new "></div>
        <h3 className=" ">Tin tức du lịch </h3>
      </div>
      <div className="content-new">
        <div className="box-new ">
          <div className="w-new">
            <div className="row justify-content-center">
              {!tintucs ? (
                <div className="spin">
                  <Spin className="mt-5" />
                </div>
              ) : (
                tintuc.map((ok) => (
                  <div className="col-md-6" key={ok.id}>
                    <div className="img-new">
                      <img src={ok.anh} className="w-100 h-100" alt="" />
                    </div>
                    <div className="title-new mt-2">
                      <Link to={`/detail-new/${ok.id}`} className="">
                        {ok.name}
                      </Link>
                      <p className="text-justify">{tomtat(ok.tomtat)}</p>
                      <span>
                        <i className="far fa-clock"></i>{" "}
                        {formatdate(ok.createdAt)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
