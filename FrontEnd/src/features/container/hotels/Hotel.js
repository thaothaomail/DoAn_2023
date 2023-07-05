import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../trangchu/footer/Footer'
import "./hotel.css"
import img2 from "./img/2.jpg"
import img4 from "./img/4.jpg"
import img5 from "./img/5.jpg"
import img10 from "./img/10.jpg"
import img11 from "./img/11.jpg"
import img12 from "./img/12.jpg"
export default function Hotel() {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div id="hotel">
            <div className="breadcrumb">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/"><i className="fas fa-home mr-2"></i>Trang chủ</Link></li>
                        <li className="breadcrumb-item">Khách sạn</li>
                    </ol>
                </nav>
            </div>
            <div className="container">
                <div className="heading text-center">
                    <span>Khách sạn</span>
                    <div className="hr"></div>
                    <p className="mb-4">
                        Các khách sạn hàng đầu trong nghành du lịch được nhiều du khách ghé qua.
                    </p>
                </div>
                <div className="content row">
                    <div className="col-md-4">
                        <div className="content___box">
                            <div className="content___box---img">
                                <img src={img2} alt="" />
                            </div>
                            <div className="content___box---title">
                                <div className="content___box---title---name">
                                    <span>vinpeart resort & spa đà nẵng</span>
                                </div>
                                <div className="content___box---title---price">
                                    <span>Giá từ: <span className="price-text">8.550.000 vnđ</span></span>
                                </div>
                            </div>
                            <div className="content___box---btn">
                                <button><Link to="/detailhotel/3">Book ngay</Link></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="content___box">
                            <div className="content___box---img">
                                <img src={img11} alt="" />
                            </div>
                            <div className="content___box---title">
                                <div className="content___box---title---name">
                                    <span>vinpeart resort & spa đà nẵng</span>
                                </div>
                                <div className="content___box---title---price">
                                    <span>Giá từ: <span className="price-text">8.550.000 vnđ</span></span>
                                </div>
                            </div>
                            <div className="content___box---btn">
                                <button><Link to="/detailhotel/3">Book ngay</Link></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="content___box">
                            <div className="content___box---img">
                                <img src={img10} alt="" />
                            </div>
                            <div className="content___box---title">
                                <div className="content___box---title---name">
                                    <span>vinpeart resort & spa đà nẵng</span>
                                </div>
                                <div className="content___box---title---price">
                                    <span>Giá từ: <span className="price-text">8.550.000 vnđ</span></span>
                                </div>
                            </div>
                            <div className="content___box---btn">
                                <button><Link to="/detailhotel/3">Book ngay</Link></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="content___box">
                            <div className="content___box---img">
                                <img src={img12} alt="" />
                            </div>
                            <div className="content___box---title">
                                <div className="content___box---title---name">
                                    <span>vinpeart resort & spa đà nẵng</span>
                                </div>
                                <div className="content___box---title---price">
                                    <span>Giá từ: <span className="price-text">8.550.000 vnđ</span></span>
                                </div>
                            </div>
                            <div className="content___box---btn">
                                <button><Link to="/detailhotel/3">Book ngay</Link></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="content___box">
                            <div className="content___box---img">
                                <img src={img4} alt="" />
                            </div>
                            <div className="content___box---title">
                                <div className="content___box---title---name">
                                    <span>vinpeart resort & spa đà nẵng</span>
                                </div>
                                <div className="content___box---title---price">
                                    <span>Giá từ: <span className="price-text">8.550.000 vnđ</span></span>
                                </div>
                            </div>
                            <div className="content___box---btn">
                                <button><Link to="/detailhotel/3">Book ngay</Link></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="content___box">
                            <div className="content___box---img">
                                <img src={img5} alt="" />
                            </div>
                            <div className="content___box---title">
                                <div className="content___box---title---name">
                                    <span>vinpeart resort & spa đà nẵng</span>
                                </div>
                                <div className="content___box---title---price">
                                    <span>Giá từ: <span className="price-text">8.550.000 vnđ</span></span>
                                </div>
                            </div>
                            <div className="content___box---btn">
                                <button><Link to="/detailhotel/3">Book ngay</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
