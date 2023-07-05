import React, { useEffect, useState } from 'react'
import { Rate, Select, Spin } from 'antd'
import { Option } from 'antd/lib/mentions';
import Search from 'antd/lib/input/Search';
import { Link } from 'react-router-dom';
import Footer from '../trangchu/footer/Footer'
import './listtour.css'
import { useSelector } from 'react-redux';
import "./checkactive.js";
export default function Listtour() {
    const binhluans = useSelector(state => state.binhluans.binhluan.data);
    const tours = useSelector(state => state.tours.tour.data);
    const [state, setState] = useState({
        check: "trong",
        statetrongnuoc: "",
        statenuocngoai: ""
    })
    const [star, setstar] = useState('')

    const formatdate = e => {
        if (e) {
            var ngay = e.substr(0, 2)
            var thang = e.substr(3, 2)
            var nam = e.substr(6, 4)
            return nam + '-' + thang + '-' + ngay;
        }
    }
    const maxDate = e => {
        if (e) {
            var ngayMax = formatdate(e[0].ngay)
            for (let i = 0; i < e.length; i++) {
                if (ngayMax <= formatdate(e[i].ngay)) {
                    ngayMax = formatdate(e[i].ngay)
                }
            }
            return ngayMax
        }
    }
    const tinhdiem = (id) => {
        var binhluanload = [];
        if (binhluans) {
            for (let i = 0; i < binhluans.length; i++) {
                if (binhluans[i].status === +1 && binhluans[i].tourId === id) {
                    binhluanload.push(binhluans[i]);
                }
            }
        }
        var tong = new Number();
        if (binhluans) {
            for (let i = 0; i < binhluanload.length; i++) {
                tong += binhluanload[i].star;
            }
        }
        var diem = Math.round((tong / +binhluanload.length) * 10) / 10;
        if (isNaN(diem)) {
            diem = 0;
        }
        return diem;
    }
    var tourtrongnuoc = []
    if (tours) {
        var sort = []
        for (let i = 0; i < tours.length; i++) {
            sort.unshift(tours[i])
        }
        var date = new Date();
        var today = date.getFullYear() + "-" + ((date.getMonth() + 1) > 10 ? date.getMonth() + 1 : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() > 10 ? date.getDate() : ("0" + date.getDate()));
        for (let i = 0; i < sort.length; i++) {
            if (sort[i].status === 1 && sort[i].vitri === 1 ) {
                tourtrongnuoc.push(sort[i])
            }
        }
    }
    var tournuocngoai = []
    if (tours) {
        var sort = []
        for (let i = 0; i < tours.length; i++) {
            sort.unshift(tours[i])
        }
        var date = new Date();
        var today = date.getFullYear() + "-" + ((date.getMonth() + 1) > 10 ? date.getMonth() + 1 : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() > 10 ? date.getDate() : ("0" + date.getDate()));
        for (let i = 0; i < sort.length; i++) {
            if (sort[i].status === 1 && sort[i].vitri === 2) {
                tournuocngoai.push(sort[i])
            }
        }
    }
    useEffect(() => {
        //actionNgaydi();
        window.scrollTo(0, 0);
    }, [])

    const handleChange = (value) => {
        setState({
            ...state,
            check: value
        })
    }
    const search = e => {
        const { check } = state
        if (check === "trong") {
            var tourtrongnuoc = []
            if (tours) {
                var sort = []
                for (let i = 0; i < tours.length; i++) {
                    sort.unshift(tours[i])
                }
                console.log(sort);
                var date = new Date();
                var today = date.getFullYear() + "-" + ((date.getMonth() + 1) > 10 ? date.getMonth() + 1 : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() > 10 ? date.getDate() : ("0" + date.getDate()));
                for (let i = 0; i < sort.length; i++) {
                    if (sort[i].status === 1 && sort[i].vitri === 1 && (sort[i].name).toLowerCase().search(e) === 0 && maxDate(sort[i].Ngaydis) >= today) {
                        tourtrongnuoc.push(sort[i])
                    }
                }
                console.log(tourtrongnuoc);
            }
            setState({
                ...state,
                statetrongnuoc: tourtrongnuoc
            })
        } else {
            var tournuocngoai = []
            if (tours) {
                var sort = []
                for (let i = 0; i < tours.length; i++) {
                    sort.unshift(tours[i])
                }
                var date = new Date();
                var today = date.getFullYear() + "-" + ((date.getMonth() + 1) > 10 ? date.getMonth() + 1 : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() > 10 ? date.getDate() : ("0" + date.getDate()));
                for (let i = 0; i < sort.length; i++) {
                    if (sort[i].status === 1 && sort[i].vitri === 2 && (sort[i].name).toLowerCase().search(e) === 0 && maxDate(sort[i].Ngaydis) >= today) {
                        tournuocngoai.push(sort[i])
                    }
                }
            }
            setState({
                ...state,
                statenuocngoai: tournuocngoai
            })
        }
    }

    const checkstar = value => {
        // setstar(value)
        // search()
    }
    // let actives = document.querySelectorAll('li');
    // actives.forEach(active => {
    //     active.addEventListener('click', function () {
    //         console.log("ok");
    //         actives.forEach(btn => btn.classList.remove('active'));
    //         this.classList.add('active');
    //     })
    // })
    return (
        <div id="list-tour">
            <div className="breadcrumb">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/"><i className="fas fa-home mr-2"></i>Trang chủ</Link></li>
                        <li className="breadcrumb-item"><Link to="/list-tour" disabled>Tour du lịch</Link></li>
                    </ol>
                </nav>
            </div>
            <div className="container">
                <div className="row mb-4 bg-white rounded">
                    <div className="col-md-3 border-right pb-3 bg ">
                        <h4 className="pt-4">Tìm Kiếm tour</h4>
                        <Search placeholder="Tìm kiếm tour" onSearch={search} enterButton />

                        <h4 className="mt-3">Loại tour</h4>
                        <Select className="w-100" defaultValue="trong" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="trong">Tour trong nước</Option>
                            <Option value="ngoai">Tour nước ngoài</Option>
                        </Select>
                        {state.check === "trong" ?
                            <div>
                                <h4 className="mt-3">Vùng</h4>
                                <Select className="w-100" defaultValue="trung" style={{ width: 120 }}>
                                    <Option value="bac">Miền Bắc</Option>
                                    <Option value="trung">Miền Trung</Option>
                                    <Option value="nam">Miền Nam</Option>
                                </Select>
                            </div> : ""
                        }
                        <h4 className="mt-3">Đánh giá</h4>
                        <div className="star-mid text-primary">
                            <ul>
                                <li className="active"><span onClick={() => checkstar(5)} style={{ cursor: "pointer" }}><Rate value="5" disabled /><span className="ml-2">từ 5 sao</span><br /></span></li>
                                <li><span onClick={() => checkstar(4)} style={{ cursor: "pointer" }}><Rate value="4" disabled /><span className="ml-2">từ 4 sao</span><br /></span></li>
                                <li><span onClick={() => checkstar(3)} style={{ cursor: "pointer" }}><Rate value="3" disabled /><span className="ml-2">từ 3 sao</span><br /></span></li>
                                <li><span onClick={() => checkstar(2)} style={{ cursor: "pointer" }}><Rate value="2" disabled /><span className="ml-2">từ 2 sao</span><br /></span></li>
                                <li><span onClick={() => checkstar(1)} style={{ cursor: "pointer" }}><Rate value="1" disabled /><span className="ml-2">từ 1 sao</span><br /></span></li>
                            </ul>
                        </div>
                        {/* <div className="star-mid text-primary">
                            <span onClick={() => checkstar(5)} style={{ cursor: "pointer" }}><Rate value="5" disabled /><span className="ml-2">từ 5 sao</span><br /></span>
                            <span onClick={() => checkstar(4)} style={{ cursor: "pointer" }}><Rate value="4" disabled /><span className="ml-2">từ 4 sao</span><br /></span>
                            <span onClick={() => checkstar(3)} style={{ cursor: "pointer" }}><Rate value="3" disabled /><span className="ml-2">từ 3 sao</span><br /></span>
                            <span onClick={() => checkstar(2)} style={{ cursor: "pointer" }}><Rate value="2" disabled /><span className="ml-2">từ 2 sao</span><br /></span>
                            <span onClick={() => checkstar(1)} style={{ cursor: "pointer" }}><Rate value="1" disabled /><span className="ml-2">từ 1 sao</span><br /></span>
                        </div> */}
                    </div>
                    <div className="col-md-9">
                        <div className="title text-center mt-3">
                            {state.check === 'trong' ? <h3>Tour trong nước</h3> : <h3>Tour nước ngoài</h3>}
                            <div className="hr w-25"></div>
                        </div>
                        <div className="box-tour">
                            <div className="container">
                                <div className="row mt-4 ">
                                    {state.check === 'trong' ?
                                        state.statetrongnuoc === "" ?
                                            tourtrongnuoc.map((ok, index) => (
                                                <div className="col-md-6 mb-3">
                                                    <Link to={`/tour/${ok.id}`}>
                                                        <div className="img rounded">
                                                            <img src={ok.avatar} className="img-fluid" alt="" />
                                                        </div>
                                                        <div className="content_tour">
                                                            <div className="title_tour text-capitalize">{ok.name}</div>
                                                            <div className="star float-left">
                                                                <Rate value={tinhdiem(ok.id)} disabled />
                                                            </div>
                                                            <div className="money float-left ml-3 text-warning">
                                                                {(ok.gianguoilon).toLocaleString()} VNĐ<br />
                                                                <del> 4.000.000 VNĐ</del>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )) :
                                            state.statetrongnuoc.map((ok, index) => (
                                                <div className="col-md-6 mb-3">
                                                    <Link to={`/tour/${ok.id}`}>
                                                        <div className="img rounded">
                                                            <img src={ok.avatar} className="img-fluid" alt="" />
                                                        </div>
                                                        <div className="content_tour">
                                                            <div className="title_tour text-capitalize">{ok.name}</div>
                                                            <div className="star float-left">
                                                                <Rate value={tinhdiem(ok.id)} disabled />
                                                            </div>
                                                            <div className="money float-left ml-3 text-warning">
                                                                {(ok.gianguoilon).toLocaleString()} VNĐ<br />
                                                                <del> 4.000.000 VNĐ</del>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))
                                        :
                                        state.statenuocngoai === "" ?
                                            tournuocngoai.map((ok, index) => (
                                                <div className="col-md-6 mb-3">
                                                    <Link to={`/tour/${ok.id}`}>
                                                        <div className="img rounded">
                                                            <img src={ok.avatar} className="img-fluid" alt="" />
                                                        </div>
                                                        <div className="content_tour">
                                                            <div className="title_tour text-capitalize">{ok.name}</div>
                                                            <div className="star float-left">
                                                                <Rate value={tinhdiem(ok.id)} disabled />
                                                            </div>
                                                            <div className="money float-left ml-3 text-warning">
                                                                {(ok.gianguoilon).toLocaleString()} VNĐ<br />
                                                                <del> 4.000.000 VNĐ</del>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )) :
                                            state.statenuocngoai.map((ok, index) => (
                                                <div className="col-md-6 mb-3">
                                                    <Link to={`/tour/${ok.id}`}>
                                                        <div className="img rounded">
                                                            <img src={ok.avatar} className="img-fluid" alt="" />
                                                        </div>
                                                        <div className="content_tour">
                                                            <div className="title_tour text-capitalize">{ok.name}</div>
                                                            <div className="star float-left">
                                                                <Rate value={tinhdiem(ok.id)} disabled />
                                                            </div>
                                                            <div className="money float-left ml-3 text-warning">
                                                                {(ok.gianguoilon).toLocaleString()} VNĐ<br />
                                                                <del> 4.000.000 VNĐ</del>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
