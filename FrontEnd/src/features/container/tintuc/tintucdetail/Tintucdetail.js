import React, { useEffect } from 'react'
import './Tintucdetail.css'
import { Link, useParams } from 'react-router-dom';
import Footer from '../../trangchu/footer/Footer';
import { useSelector } from 'react-redux';
import renderHTML from 'react-render-html';
function Tintucdetail(props) {
    localStorage.setItem("menu", "nothome");
    const { id } = useParams()
    const tintucs = useSelector(state => state.tintucs.tintuc.data);
    var sx = []
    if (tintucs) {
        for (let i = 0; i < tintucs.length; i++) {
            if (tintucs[i].id !== +id) {
                if (tintucs[i].status === 1 && sx.length < 4) {
                    sx.unshift(tintucs[i])
                }
            }
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    const tintuc = [];
    if (tintucs) {
        for (let i = 0; i < tintucs.length; i++) {
            if (tintucs[i].id === +id) {
                tintuc.push(tintucs[i])
            }
        }
    }
    const formatdate = e => {
        if (e) {
            var ngay = e.substr(8, 2)
            var thang = e.substr(5, 2)
            var nam = e.substr(0, 4)
            var gio = e.substr(11, 2);
            var phut = e.substr(14, 2);
            return ngay + '/' + thang + '/' + nam + " " + gio + ":" + phut;
        }
    }
    return (
        <div id="new-detail">
            <div className="breadcrumb">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/"><i className="fas fa-home mr-2"></i>Trang chủ</Link></li>
                        <li className="breadcrumb-item"><Link to="/listtintuc">Tin tức</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{tintucs ? tintucs.find(x => x.id === +id).name : ''}</li>
                    </ol>
                </nav>
            </div>
            <div className="content-new">
                <div className="container bg-white">
                    <div className="row mt-5 mb-5">
                        {tintuc.map(ok => (
                            <div className="col-md-9" key={ok.id}>
                                <div className="name-new mb-4">
                                    <h2>{ok.name}</h2>
                                </div>
                                <div className="content">
                                    {renderHTML(ok.content)}
                                    <Link>
                                        <div className="icon-new float-left">
                                            <span className="fab fa-facebook-f"></span>
                                        </div>
                                    </Link>
                                    <Link>
                                        <div className="icon-new float-left">
                                            <i className="fab fa-twitter"></i>
                                        </div>
                                    </Link>
                                    <Link>
                                        <div className="icon-new float-left">
                                            <i className="fab fa-instagram"></i>
                                        </div>
                                    </Link>
                                    <div className="text-right">
                                        <p><i>Tác giả:</i> <strong><i>{ok.tacgia}</i></strong></p>
                                        <p>Ngày đăng: <i><strong>{formatdate(ok.createdAt)}</strong></i></p>
                                    </div>
                                    <div>
                                        <div className="tags mb-4 font-weight-bold">
                                            <h5>tag:
                                                {ok.Tags.map(oki => (
                                                <Link><span className="tag">{oki.name}</span></Link>
                                            ))}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-md-3" >
                            <h3 className="border-bottom">Tin mới</h3>

                            {sx.map(ok => (
                                <div className="box-tinhot" key={ok.id}>
                                    <div className="img-new">
                                        <img
                                            src={ok.anh}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                    <div className="title-new">
                                        <p className="mb-2"><Link to={`/detail-new/${ok.id}`} className="title-new-hot">{ok.name}</Link></p>
                                        <span><i className="far fa-clock"></i> {formatdate(ok.createdAt)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >

    )
}
export default Tintucdetail