import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import { Checkbox, Col, Image, message, Row, Select, Spin, Upload } from "antd";
import { Option } from "antd/lib/mentions";
import { useDispatch, useSelector } from "react-redux";
import JoditEditor from "jodit-react";
import { useHistory, useParams } from "react-router-dom";
import "./tour.css";
import Modal from "antd/lib/modal/Modal";
import { storage } from "../../../../firebase";
import { PlusOutlined } from "@ant-design/icons";
import { addtour, tourData, updatetour } from "./tourSlice";
import { loaitourData } from "../Loaitour/loaitourSlice";
import dichvutourApi from "../../../../api/dichvuTourApi";
import tourloaitourApi from "../../../../api/tourLoaitour";
import tourngaydiApi from "../../../../api/tourNgaydi";
import quocgiaApi from "../../../../api/quocgiaApi";
import tourdiadiemApi from "../../../../api/tourDiadiem";
import anhApi from "../../../../api/anhApi";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
function Themtour(props) {
  const hangdlevitri = (e) => {
    setState({
      ...state,
      vitri: e,
    });
  };
  const { id } = useParams();
  const tours = useSelector((state) => state.tours.tour.data);
  const [state, setState] = useState({
    vitri: 1,
    quocgiaId: "",
    checkdichvu: "",
    checkloaitour: "",
    checkngaydi: "",
    checkdiadiem: "",
    dichvuId: [],
    diadiemId: [],
    thoigian: "",
    songuoi: "",
    loaitourId: [],
    load: false,
    linkImg: "",
    tenanh: "",
    img: "",
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    name: "",
    avatar: "",
    gianguoilon: "",
    giatreem: "",
    giaembe: "",
    trailer: "",
    bando: "",
    status: 0,
  });
  const {
    vitri,
    linkImg,
    dichvuId,
    tenanh,
    name,
    quocgiaId,
    load,
    thoigian,
    songuoi,
    avatar,
    status,
    bando,
    giaembe,
    gianguoilon,
    giatreem,
    trailer,
    img,
    previewVisible,
    previewImage,
    fileList,
    previewTitle,
  } = state;
  const dispatch = useDispatch();
  const history = useHistory();
  const actionResult = async () => {
    await dispatch(tourData());
  };
  const actionloaitour = async () => {
    await dispatch(loaitourData());
  };
  useEffect(async () => {
    if (id && tours) {
      var tour = tours.find((x) => x.id === +id);
      var suadichvu = [];
      for (let i = 0; i < tour.Dichvus.length; i++) {
        suadichvu.push(`${tour.Dichvus[i].id}`);
      }
      var sualoaitour = [];
      for (let i = 0; i < tour.Loaitours.length; i++) {
        sualoaitour.push(`${tour.Loaitours[i].id}`);
      }
      var suangaydi = [];
      for (let i = 0; i < tour.Ngaydis.length; i++) {
        suangaydi.push(tour.Ngaydis[i].id);
      }
      var suadiadiem = [];
      for (let i = 0; i < tour.Diadiems.length; i++) {
        suadiadiem.push(`${tour.Diadiems[i].id}`);
      }
      const diadiemData = await quocgiaApi
        .getOne(tour.Diadiems[0].quocgiaId)
        .then((data) => {
          return data.data.Diadiems;
        });
      setState({
        ...state,
        vitri: tour.vitri,
        thoigian: tour.thoigian,
        songuoi: tour.songuoi,
        name: tour.name,
        avatar: tour.avatar,
        gianguoilon: tour.gianguoilon,
        giatreem: tour.giatreem,
        giaembe: tour.giaembe,
        trailer: tour.trailer,
        bando: tour.bando,
        status: tour.status,
        dichvuId: suadichvu,
        loaitourId: sualoaitour,
        checkdiadiem: suadiadiem,
        diadiemId: suadiadiem,
        checkdichvu: suadichvu,
        checkloaitour: sualoaitour,
        checkngaydi: suangaydi,
        quocgiaId: `${tour.Diadiems[0].quocgiaId}`,
      });
      setngaydiId(suangaydi);
      setluuy(tour.luuy);
      setchitiettour(tour.chitiettour);
      setlaydiadiem(diadiemData);
    }
  }, [tours]);
  const loaitour = useSelector((state) => state.loaitours.loaitour.data);
  const dichvu = useSelector((state) => state.dichvus.dichvu.data);
  const loadloaitour = useSelector((state) => state.loaitours.loading);
  const equar = (a, b) => {
    if (a.length !== b.length) {
      return false;
    } else {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      checkdichvu,
      checkloaitour,
      checkngaydi,
      checkdiadiem,
      diadiemId,
      dichvuId,
      loaitourId,
    } = state;
    if (
      name.trim() === "" ||
      diadiemId.length === 0 ||
      dichvuId.length === 0 ||
      loaitourId.length === 0 ||
      ngaydiId.length === 0 ||
      gianguoilon === "" ||
      giatreem === "" ||
      giaembe === "" ||
      trailer.trim() === "" ||
      chitiettour.trim() === "" ||
      luuy.trim() === "" ||
      bando.trim() === "" ||
      thoigian === "" ||
      songuoi === ""
    ) {
      message.warning("Xin hãy nhập đầy đủ thông tin!");
    } else {
      setState({ ...state, load: true });
      if (id) {
        if (fileList.length > 0) {
          await anhApi.deleteanh(id);
          var data = [];
          for (let i = 0; i < fileList.length; i++) {
            await storage
              .ref(`imagestour/${fileList[i].originFileObj.name}`)
              .put(fileList[i].originFileObj);
            const banner = await storage
              .ref("imagestour")
              .child(fileList[i].originFileObj.name)
              .getDownloadURL();
            data.push({
              tourId: id,
              tenanh: fileList[i].originFileObj.name,
              link: banner,
              banner: 0,
              status: 1,
            });
          }
          await anhApi.postanh(data);
        }
        var avatar = "";
        if (img !== "") {
          await storage.ref(`imagestour/${img.name}`).put(img);
          avatar = await storage
            .ref("imagestour")
            .child(img.name)
            .getDownloadURL();
        }
        if (!equar(checkdichvu, dichvuId)) {
          await dichvutourApi.deletedichvutour(id);
          var data = [];
          for (let i = 0; i < dichvuId.length; i++) {
            data.push({ tourId: id, dichvuId: dichvuId[i] });
          }
          await dichvutourApi.postdichvutour(data);
        }
        if (!equar(checkloaitour, loaitourId)) {
          await tourloaitourApi.deletetourloaitour(id);
          var data = [];
          for (let i = 0; i < loaitourId.length; i++) {
            data.push({ tourId: id, loaitourId: loaitourId[i] });
          }
          await tourloaitourApi.posttourloaitour(data);
        }
        if (!equar(checkngaydi, ngaydiId)) {
          await tourngaydiApi.deletetourngaydi(id);
          var data = [];
          for (let i = 0; i < ngaydiId.length; i++) {
            data.push({ tourId: id, ngaydiId: ngaydiId[i] });
          }
          await tourngaydiApi.posttourngaydi(data);
        }
        if (!equar(checkdiadiem, diadiemId)) {
          await tourdiadiemApi.deletetourdiadiem(id);
          var data = [];
          for (let i = 0; i < diadiemId.length; i++) {
            data.push({ tourId: id, diadiemId: diadiemId[i] });
          }
          await tourdiadiemApi.posttourdiadiem(data);
        }
        if (avatar === "") {
          await dispatch(
            updatetour({
              idsua: id,
              name,
              thoigian,
              songuoi,
              vitri,
              luuy,
              chitiettour,
              status,
              gianguoilon,
              giatreem,
              giaembe,
              trailer,
              bando,
              Anhs,
              TourDiadiems,
              TourLoaitours,
              DichvuTours,
              TourNgaydis,
            })
          );
        } else {
          await dispatch(
            updatetour({
              idsua: id,
              name,
              thoigian,
              songuoi,
              vitri,
              luuy,
              chitiettour,
              status,
              tenanh,
              avatar,
              gianguoilon,
              giatreem,
              giaembe,
              trailer,
              bando,
              Anhs,
              TourDiadiems,
              TourLoaitours,
              DichvuTours,
              TourNgaydis,
            })
          );
        }
      } else {
        await storage.ref(`imagestour/${img.name}`).put(img);
        const avatar = await storage
          .ref("imagestour")
          .child(img.name)
          .getDownloadURL();
        var Anhs = [];
        for (let i = 0; i < fileList.length; i++) {
          await storage
            .ref(`imagestour/${fileList[i].originFileObj.name}`)
            .put(fileList[i].originFileObj);
          const banner = await storage
            .ref("imagestour")
            .child(fileList[i].originFileObj.name)
            .getDownloadURL();
          Anhs.push({
            tenanh: fileList[i].originFileObj.name,
            link: banner,
            banner: 0,
            status: 1,
          });
        }
        var TourLoaitours = [];
        for (let i = 0; i < loaitourId.length; i++) {
          TourLoaitours.push({ loaitourId: loaitourId[i] });
        }
        var DichvuTours = [];
        for (let i = 0; i < dichvuId.length; i++) {
          DichvuTours.push({ dichvuId: dichvuId[i] });
        }
        var TourDiadiems = [];
        for (let i = 0; i < diadiemId.length; i++) {
          TourDiadiems.push({ diadiemId: diadiemId[i] });
        }
        var TourNgaydis = [];
        for (let i = 0; i < ngaydiId.length; i++) {
          TourNgaydis.push({ ngaydiId: ngaydiId[i] });
        }
        await dispatch(
          addtour({
            name,
            thoigian,
            songuoi,
            vitri,
            luuy,
            chitiettour,
            status,
            tenanh,
            avatar,
            gianguoilon,
            giatreem,
            giaembe,
            trailer,
            bando,
            Anhs,
            TourDiadiems,
            TourLoaitours,
            DichvuTours,
            TourNgaydis,
          })
        );
      }
      setTimeout(() => {
        actionResult();
      }, 800);
      history.push("/admin/tour");
    }
  };

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const data = [];

  for (let i = 0; i < loaitour.length; i++) {
    data.push(<Option key={loaitour[i].id}>{loaitour[i].name}</Option>);
  }
  const dichvudata = [];

  for (let i = 0; i < dichvu.length; i++) {
    dichvudata.push(<Option key={dichvu[i].id}>{dichvu[i].name}</Option>);
  }
  const [luuy, setluuy] = useState("");
  const [chitiettour, setchitiettour] = useState("");

  const hangdelimage = (e) => {
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      tenanh: e.target.files[0].name,
      img: e.target.files[0],
    });
  };

  const handleCancel = () => setState({ ...state, previewVisible: false });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleChange = ({ fileList }) => {
    setState({ ...state, fileList: fileList });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const onId = (e) => {
    setState({
      ...state,
      loaitourId: e,
    });
  };
  const ondichvu = (e) => {
    setState({
      ...state,
      dichvuId: e,
    });
  };
  const quocgias = useSelector((state) => state.quocgias.quocgia.data);
  var tenquocgia = [];
  for (let i = 0; i < quocgias.length; i++) {
    tenquocgia.push(quocgias[i]);
  }
  var dd = [];
  for (let i = 0; i < quocgias.length; i++) {
    var d_d = [];
    for (let j = 0; j < quocgias[i].Diadiems.length; j++) {
      d_d.push({
        id: quocgias[i].Diadiems[j].id,
        name: quocgias[i].Diadiems[j].name,
      });
    }
    var qg = quocgias[i].id;
    dd.push({ qg: qg, diadiem: d_d });
  }
  const quocgiaData = tenquocgia;
  const [laydiadiem, setlaydiadiem] = useState([]);
  const handlequocgiaChange = (value) => {
    setlaydiadiem(dd.find((x) => x.qg === +value).diadiem);
  };
  var selectdiadiem = [];

  for (let i = 0; i < laydiadiem.length; i++) {
    selectdiadiem.push(
      <Option key={laydiadiem[i].id}>{laydiadiem[i].name}</Option>
    );
  }
  const onSeconddiadiemChange = (value) => {
    setState({ ...state, diadiemId: value });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const ngaydi = useSelector((state) => state.ngaydis.ngaydi.data);
  const loadingngaydi = useSelector((state) => state.ngaydis.loading);
  const [ngaydiId, setngaydiId] = useState([]);
  const onchangeNgaydi = (e) => {
    setngaydiId(e);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>{id ? "Sửa tour" : "Thêm tour"}</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <form action="" method="post" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="">Tên tour</label>
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
            <label htmlFor="">Vị trí</label>
            <br />
            <Select className="w-50" value={vitri} onChange={hangdlevitri}>
              <Option value={1}>Trong nước</Option>
              <Option value={2}>Nước ngoài</Option>
            </Select>
            <br />
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
                <Image
                  src={linkImg}
                  className="ml-5"
                  height="150px"
                  width="100px"
                  alt=""
                />
              ) : avatar ? (
                <Image
                  src={avatar}
                  className="ml-5"
                  height="150px"
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
            <label htmlFor="">Banner</label>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </div>
          <div className="form-group">
            <label htmlFor="">Ngày đi</label>
            <span className="text-warning" onClick={showModal}>
              <IconButton
                color="primary"
                className="mr-5 ml-4"
                aria-label="upload picture"
                component="span"
              >
                <i className="far fa-calendar-alt"></i>
              </IconButton>
            </span>
            <div className="form-group">
              <Modal
                title="Chọn ngày khởi hành"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancelModal}
              >
                <Checkbox.Group
                  style={{ width: "100%" }}
                  value={ngaydiId}
                  onChange={onchangeNgaydi}
                >
                  {loadingngaydi ? (
                    <div className="spin">
                      <Spin className="mt-5" />
                    </div>
                  ) : (
                    ngaydi.map((ok) => (
                      <Row key={ok.id}>
                        <Col span={8}>
                          <Checkbox value={ok.id}>{ok.ngay}</Checkbox>
                        </Col>
                      </Row>
                    ))
                  )}
                </Checkbox.Group>
              </Modal>
            </div>
            <label htmlFor="">Dịch vụ</label>
            <br />
            {loadloaitour ? (
              <span>
                <Select className="w-25 ml-4"></Select>
                <Spin />
              </span>
            ) : (
              <Select
                mode="tags"
                value={dichvuId}
                onChange={ondichvu}
                className="w-50"
                placeholder="Tags Mode"
              >
                {dichvudata}
              </Select>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="">Loại tour</label>
            <br />
            {loadloaitour ? (
              <span>
                <Spin />
              </span>
            ) : (
              <Select
                mode="tags"
                value={state.loaitourId}
                onChange={onId}
                className="w-50"
                placeholder="Tags Mode"
              >
                {data}
              </Select>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="">Quốc gia</label>
            <br />
            <Select
              className="w-50"
              defaultValue={quocgiaId}
              onChange={handlequocgiaChange}
            >
              {quocgiaData.map((quocgia) => (
                <Option key={quocgia.id}>{quocgia.name}</Option>
              ))}
            </Select>
            <br />
            <label htmlFor="">Địa điểm</label>
            <br />

            <Select
              mode="tags"
              value={state.diadiemId}
              onChange={onSeconddiadiemChange}
              className="w-50"
              placeholder="Tags Mode"
            >
              {selectdiadiem}
            </Select>
          </div>
          <div className="form-group">
            <label htmlFor="">Số lượng</label>
            <input
              type="number"
              min="0"
              name="songuoi"
              value={songuoi}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Số ngày đi</label>
            <input
              type="number"
              min="0"
              name="thoigian"
              value={thoigian}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Trailer</label>
            <input
              type="text"
              name="trailer"
              value={trailer}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Giá người lớn</label>
            <input
              type="number"
              min="0"
              name="gianguoilon"
              value={gianguoilon}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Giá trẻ em</label>
            <input
              type="number"
              min="0"
              name="giatreem"
              value={giatreem}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Giá em bé</label>
            <input
              type="number"
              min="0"
              name="giaembe"
              value={giaembe}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Bản đồ</label>
            <input
              type="text"
              name="bando"
              value={bando}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group ">
            <label htmlFor="">Chi tiết tour</label>
            <JoditEditor
              value={chitiettour}
              tabIndex={1} // tabIndex of textarea
              onChange={(e) => setchitiettour(e)}
            />
          </div>
          <div className="form-group ">
            <label htmlFor="">Lưu ý</label>
            <JoditEditor
              value={luuy}
              tabIndex={1} // tabIndex of textarea
              onChange={(e) => setluuy(e)}
            />
          </div>

          <div className="text-center mtb">
            {load ? (
              <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              ""
            )}
            <Button type="submit" variant="contained" color="primary">
              {id ? "Sửa tour" : "Thêm tour"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Themtour;
