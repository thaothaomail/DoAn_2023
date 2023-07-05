import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../container/trangchu/banner/Banner";
import Camnangdulich from "../container/trangchu/camnangdulich/Camnangdulich";
import Tourtrongnuoc from "../container/trangchu/tourtrongnuoc/Tourtrongnuoc";
import Tournuocngoai from "../container/trangchu/tournuocngoai/Tournuocngoai";
import Tintuc from "../container/trangchu/tintuc/Tintuc";
import Ykienkhachhang from "../container/trangchu/ykienkhachhang/ykienkhachhang";
import Dichvu from "../container/trangchu/dichvu/Dichvu";
import Footer from "../container/trangchu/footer/Footer";
import CreateTour from "../container/trangchu/createTour/CreateTour";
export class Trangchu extends Component {
  render() {
    return (
      <div>
        <Banner />
        {/* <Camnangdulich /> */}
        <CreateTour />
        <Tourtrongnuoc />
        <Tournuocngoai />
        <Dichvu />
        <Tintuc />
        <Ykienkhachhang />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Trangchu);
