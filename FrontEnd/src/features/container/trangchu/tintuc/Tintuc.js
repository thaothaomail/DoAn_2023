import React from "react";
import { useSelector } from "react-redux";
import { Link, Link as Linkrt } from "react-router-dom";
import "./tintuc.css";
function Tintuc(props) {
  const tintucs = useSelector((state) => state.tintucs.tintuc.data);
  const tintuc1 = [];
  const tintuc2 = [];
  const tintuc3 = [];
  if (tintucs) {
    var sort = [];
    for (let i = 0; i < tintucs.length; i++) {
      if (tintucs[i].status === 1) {
        sort.unshift(tintucs[i]);
      }
    }
    for (let i = 0; i < sort.length; i++) {
      if (tintucs[i].status === 1) {
        if (tintuc1.length < 2) {
          tintuc1.push(sort[i]);
        } else {
          if (tintuc2.length < 2) {
            tintuc2.push(sort[i]);
          } else {
            if (tintuc3.length < 4) {
              tintuc3.push(sort[i]);
            }
          }
        }
      }
    }
  }
  const tomtat1 = (e) => {
    var chu = "";
    for (let i = 0; i < e.length; i++) {
      if (chu.length < 225) {
        chu += e[i];
      }
    }
    chu = chu + "...";
    return chu;
  };
  const tomtat2 = (e) => {
    var chu = "";
    for (let i = 0; i < e.length; i++) {
      if (chu.length < 140) {
        chu += e[i];
      }
    }
    chu = chu + "...";
    return chu;
  };
  return (
    <div id="news">
      <div className="heading text-center">
        <span>
          <Link to="/listtintuc">Tin tức du lịch</Link>
        </span>
        <div className="hr"></div>
        <p className="mb-4">
          Cập nhật các tin tức mới nhất về các tour du lịch trong nước và ngoài
          nước một cách nhanh chóng.
        </p>
      </div>
      <div className="container">
        <div className="row mb-4">
          {tintuc1.map((ok) => (
            <div className="col-sm-6 mb-3" key={ok.id}>
              <Linkrt to={`/detail-new/${ok.id}`}>
                <div className="news-box">
                  <img src={ok.anh} width="540px" height="303px" alt="" />
                  <div className="heading p-3">
                    <strong>{ok.name}</strong>
                  </div>
                  <div className="content-news">
                    <p className="text-justify">{tomtat1(ok.tomtat)}</p>
                  </div>
                </div>
              </Linkrt>
            </div>
          ))}
        </div>
        <div className="row">
          {tintuc2.map((ok) => (
            <div className="col-md-4 col-sm-6 mb-3" key={ok.id}>
              <Linkrt to={`/detail-new/${ok.id}`}>
                <div className="news-box">
                  <div style={{ height: "190px" }}>
                    <img src={ok.anh} className="w-100 h-100" alt="" />
                  </div>
                  <div className="heading pt-1 pb-1 pl-2 pr-2">
                    <strong>{ok.name}</strong>
                  </div>
                  <div className="content-news">
                    <p className="text-justify">{tomtat2(ok.tomtat)}</p>
                  </div>
                </div>
              </Linkrt>
            </div>
          ))}
          <div className="col-md-4">
            <div className="row ">
              {tintuc3.map((ok) => (
                <div className="col-md-12" key={ok.id}>
                  <Linkrt to={`/detail-new/${ok.id}`}>
                    <div className="news-box">
                      {/* <img src={ok.anh} className="float-left" alt="" />
                      <div className="heading p-2 float-left">
                        <div style={{ paddingLeft: "1rem" }}>
                          <strong style={{ fontSize: ".9rem" }}>{ok.name}</strong>
                        </div>
                      </div> */}
                      <div className="row">
                        <div className="col-4">
                          <img src={ok.anh} className="" alt="" />
                        </div>
                        <div className="col-8">
                          <strong style={{ fontSize: ".9rem" }}>
                            {ok.name}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </Linkrt>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="xem-them">
        <Linkrt to="/listtintuc">Xem Thêm</Linkrt>
      </div>
    </div>
  );
}

Tintuc.propTypes = {};

export default Tintuc;
