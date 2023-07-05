import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import { message, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { useDispatch, useSelector } from "react-redux";
import { addtintuc, tintucData, updatetintuc } from "./tintucSlice";
import { useHistory, useParams } from "react-router-dom";
import { storage } from "../../../../firebase";
import { tintuctagData } from "./tintuctagSlice";
import axios from "axios";
import JoditEditor from "jodit-react";
import tintuctagApi from "../../../../api/tintuctagApi";
function Themtintuc(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const actionResult = async () => {
    await dispatch(tintucData());
  };
  const actiontintuctag = async () => {
    await dispatch(tintuctagData());
  };

  const [state, setState] = useState({
    load: false,
    tenanh: "",
    checktag: [],
    name: "",
    idsua: "",
    status: 1,
    facebook: "",
    twitch: "",
    instagram: "",
    tag: [],
    anh: "",
    img: "",
    linkImg: "",
    tomtat: "",
    tacgia: "",
    tag_id: [],
  });
  const [content, setcontent] = useState("");

  useEffect(async () => {
    actionResult();
    actiontintuctag();
    if (id) {
      const suatag = await axios.get(`http://localhost:666/tintuctags/${id}`);
      const ss = suatag.data;
      const sua_tag = [];
      for (let i = 0; i < ss.data.length; i++) {
        sua_tag.push(`${ss.data[i].tagId}`);
      }
      setState({
        status: tintuc.status,
        name: tintuc.name,
        tenanh: tintuc.tenanh,
        facebook: tintuc.facebook,
        twitch: tintuc.twitch,
        anh: tintuc.anh,
        instagram: tintuc.instagram,
        tomtat: tintuc.tomtat,
        tacgia: tintuc.tacgia,
        tag_id: sua_tag,
        checktag: sua_tag,
        idsua: id,
      });
      setcontent(tintuc.content);
    }
  }, []);
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
  const {
    load,
    tenanh,
    linkImg,
    img,
    name,
    tacgia,
    anh,
    idsua,
    facebook,
    twitch,
    instagram,
    status,
    tomtat,
    tag_id,
    checktag,
  } = state;
  const onSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, load: true });
    if (
      name.trim() === "" ||
      tenanh.trim() === "" ||
      tacgia.trim() === "" ||
      facebook.trim() === "" ||
      twitch.trim() === "" ||
      instagram.trim() === "" ||
      content.trim() === "" ||
      tomtat.trim() === ""
    ) {
      message.error("Xin hãy nhập đầy đủ thông tin!");
    } else {
      if (id) {
        if (img !== undefined) {
          await storage.ref(`imagestintuc/${img.name}`).put(img);
          const anh = await storage
            .ref("imagestintuc")
            .child(img.name)
            .getDownloadURL();
          if (checktag === tag_id) {
            dispatch(
              updatetintuc({
                idsua,
                name,
                content,
                tomtat,
                facebook,
                instagram,
                twitch,
                status,
                tacgia,
                anh,
                tenanh,
              })
            );
          } else {
            await tintuctagApi.deletetintuctag(idsua);
            var data = [];
            for (let i = 0; i < tag_id.length; i++) {
              var tintucId = idsua;
              var tagId = tag_id[i];
              data.push({ tintucId, tagId });
            }
            await tintuctagApi.posttintuctag(data);
            await dispatch(
              updatetintuc({
                idsua,
                name,
                content,
                tomtat,
                facebook,
                instagram,
                twitch,
                status,
                tacgia,
                anh,
                tenanh,
              })
            );
          }
        } else {
          if (equar(checktag, tag_id)) {
            dispatch(
              updatetintuc({
                idsua,
                name,
                content,
                tomtat,
                facebook,
                instagram,
                twitch,
                status,
                tacgia,
                anh,
                tenanh,
              })
            );
          } else {
            await tintuctagApi.deletetintuctag(idsua);
            var data = [];
            for (let i = 0; i < tag_id.length; i++) {
              var tintucId = idsua;
              var tagId = tag_id[i];
              data.push({ tintucId, tagId });
            }
            await tintuctagApi.posttintuctag(data);
            await dispatch(
              updatetintuc({
                idsua,
                name,
                content,
                tomtat,
                facebook,
                instagram,
                twitch,
                status,
                tacgia,
                anh,
                tenanh,
              })
            );
          }
        }
      } else {
        await storage.ref(`imagestintuc/${img.name}`).put(img);
        const anh = await storage
          .ref("imagestintuc")
          .child(img.name)
          .getDownloadURL();
        var TintucTags = [];
        for (let i = 0; i < tag_id.length; i++) {
          TintucTags.push({ tagId: tag_id[i] });
        }
        console.log(tag_id);
        dispatch(
          addtintuc({
            name,
            content,
            tomtat,
            facebook,
            instagram,
            twitch,
            status,
            tacgia,
            anh,
            tenanh,
            TintucTags,
          })
        );
      }
      setTimeout(() => {
        actionResult();
      }, 800);
      history.push("/admin/tintuc");
    }
  };
  const tags = useSelector((state) => state.tags.tag.data);
  const data = [];

  for (let i = 0; i < tags.length; i++) {
    data.push(<Option key={tags[i].id}>{tags[i].name}</Option>);
  }

  const tintuc = useSelector((state) =>
    state.tintucs.tintuc.data.find((x) => x.id === +id)
  );
  // const tintucs = useSelector(state => state.tintucs.tintuc.data)
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange = (value) => {
    setState({
      ...state,
      tag_id: value,
    });
  };
  const hangdelimage = (e) => {
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      tenanh: e.target.files[0].name,
      img: e.target.files[0],
    });
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>Thêm tin tức</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <form action="" method="post" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="">Tiêu đề bài viết</label>
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
            <div>
              <label htmlFor="">Thêm poster</label>
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
                  height="150px"
                  width="250px"
                  alt=""
                />
              ) : anh ? (
                <img
                  src={anh}
                  className="ml-5"
                  height="150px"
                  width="250px"
                  alt=""
                />
              ) : (
                ""
              )}
              <br />
              <span>{tenanh}</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Tóm tắt</label>
            <textarea
              name="tomtat"
              onChange={onChange}
              cols="30"
              value={tomtat}
              className="form-control w-50"
              rows="4"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="">Nội dung</label>
            <JoditEditor
              value={content}
              tabIndex={1}
              onChange={(e) => setcontent(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Tác giả</label>
            <input
              type="text"
              name="tacgia"
              value={tacgia}
              onChange={onChange}
              className="form-control w-50"
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
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Twitch</label>
            <input
              type="text"
              name="twitch"
              value={twitch}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={instagram}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Tags liên quan</label>
            <Select
              mode="tags"
              value={tag_id}
              onChange={handleChange}
              className="w-50 ml-4"
              placeholder="Tags Mode"
            >
              {data}
            </Select>
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
              {id ? "Sửa tin tức" : "Thêm tin"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

Themtintuc.propTypes = {};

export default Themtintuc;
