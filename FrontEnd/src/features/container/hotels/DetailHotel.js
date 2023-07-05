import { Button } from '@material-ui/core'
import { Carousel, Rate } from 'antd'
import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Footer from '../trangchu/footer/Footer'
import "./detailHotel.css"
import img1 from "./img/1.jpg"
import img6 from "./img/6.jpg"
import Tabss from './Tabs'
export default function DetailHotel() {
    const history = useHistory();
    const onClickLienHe = () => {
        history.push("/lienhe_khachsan");
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div id="detailHotel">
            <div className="breadcrumb">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/"><i className="fas fa-home mr-2"></i>Trang chủ</Link></li>
                        <li className="breadcrumb-item"><Link to="/hotels">Khách sạn</Link></li>
                        <li className="breadcrumb-item">Tên khách sạn</li>
                    </ol>
                </nav>
            </div>
            <div className="content container">
                <div className="content___title">
                    <div className="content___title---name">
                        <h3>Vinpearl Resort & Spa Đà Nẵng</h3>
                    </div>
                    <div className="content___title---star">
                        Đánh giá:<Rate className="pl-2 mr-3" disabled defaultValue={4} /> 4/5 trong Đánh giá
                </div>
                </div>
                <hr />
                <div className="content___box row">
                    <div className="col-md-8">
                        <div className="content___box---slide">
                            <Carousel autoplay >
                                <div className="w-100 h-100">
                                    <img src={img1} width="760px" height="400px" alt="" />
                                </div>
                                <div>
                                    <img src={img6} width="760px" height="400px" alt="" />
                                </div>
                                <div>
                                    <img src={img1} width="760px" height="400px" alt="" />
                                </div>
                                <div>
                                    <img src={img6} width="760px" height="400px" alt="" />
                                </div>
                            </Carousel>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="pdBox">
                            <div className="content___box---map">
                                <div id="map-container-google-1" className="z-depth-1-half map-container">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.1542471033904!2d108.26391011436755!3d16.00548398892034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314210cbebc12213%3A0xc6fc741592df54ec!2zVmlucGVhcmwgTHV4dXJ5IMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1621498278098!5m2!1svi!2s"
                                        frameborder="0" allowfullscreen></iframe>
                                </div>
                            </div>
                            <div className="content___box---infor">
                                <div className="content___box---infor---address">
                                    23 Trường Sa, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng 550000
                            </div>
                                <div className="content___box---infor---table">
                                    <table>
                                        <tr>
                                            <td className="pr-5">Số sao</td>
                                            <td><Rate disabled defaultValue={4} /></td>
                                        </tr>
                                        <tr>
                                            <td className="pr-5">Giá từ</td>
                                            <td>8.500.000 vnđ</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="content___box---infor---btn">
                                    {/* <a href="">Liên hệ</a> */}
                                    <Button onClick={onClickLienHe} className="btn-dt pl-5 pr-5" variant="contained" color="secondary">
                                        Liên hệ
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="content___box---contact">
                            <span className="text-danger">Tp. HCM</span>: (028) 7305 6789 - HOTLINE: 0902.976.588<br />
                            <span className="text-danger">Hà Nội</span>: (024) 3512 3388 - HOTLINE: 0932.659.588
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <Tabss />
            </div>
            <Footer />
        </div>
    )
}
