import React from "react";
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import "antd/dist/antd.css";
import Danhgia from "../danhgia/Danhgia";
import Chitiettour from "../chitiettour/Chitiettour";
import Dichvudikem from "../dichvudikem/Dichvudikem";
import Luuy from "../luuy/Luuy";
import Maps from "./../map/Maps";
import Chitietgia from "../gia/Chitietgia";
import "./detail.css";
import Trailer from "../trailer/Trailer";
function Detail(props) {
  const { TabPane } = Tabs;
  const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar
          {...props}
          className="site-custom-tab-bar"
          style={{ ...style }}
        />
      )}
    </Sticky>
  );
  return (
    <div className="mb-5 ">
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          <TabPane tab="Chi tiết tour" key="1">
            <Chitiettour id={props.id} />
          </TabPane>
          <TabPane tab="Giá" key="2">
            <Chitietgia id={props.id} />
          </TabPane>
          <TabPane tab="Dịch vụ đi kèm" key="3">
            <Dichvudikem id={props.id} />
          </TabPane>
          <TabPane tab="Lưu ý" key="4">
            <Luuy id={props.id} />
          </TabPane>
          <TabPane tab="Bản đồ" key="5">
            <div className="container">
              <Maps id={props.id} />
            </div>
          </TabPane>
          <TabPane tab="Trailer" key="6">
            <Trailer id={props.id} />
          </TabPane>
          <TabPane tab="Đánh giá khách hàng" key="7">
            <Danhgia id={props.id} />
          </TabPane>
        </Tabs>
      </StickyContainer>
    </div>
  );
}

Detail.propTypes = {};

export default Detail;
