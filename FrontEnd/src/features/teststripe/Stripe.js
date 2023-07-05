import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './Checkoutform';
import "./card.css"
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Spin, Tooltip } from 'antd';
const stripePromise = loadStripe("pk_test_51I0p5CE2oIGbiAkNsd7EJ9VZNaxZXtDMMfkcDD7s5WyP2PXM4hQ6qcSWGwlGtG4DFwWTFTVzr5AAxEaPYiAQBe6Z008USzew3a");
function Stripe(props) {
    const [usd, setusd] = useState(23060);
    const [email, setemail] = useState();
    const thanhtoans = useSelector(state => state.thanhtoans);
    var thanhtoan = [];
    if (thanhtoan) {
        for (let i = 0; i < thanhtoans.length; i++) {
            thanhtoan.unshift(thanhtoans[i]);
        }
    }
    // console.log(thanhtoan);
    const infor = useSelector(state => state.infor.infor.data);
    useEffect(() => {
        // Axios.get("https://free.currconv.com/api/v7/convert?q=USD_VND&compact=ultra&apiKey=6c24709f2cfc058a0499").then(data => {
        //     setusd(data.data.USD_VND)
        // })
        if (infor) {
            Axios.get(`http://localhost:666/users/${infor.id}`).then(data => {
                setemail(data.data.data.email);
            });
        }
    }, [infor])
    const tinhSoNguoi = (nguoilon, treem, embe) => {
        return +nguoilon + +treem + +embe;
    }
    const tinhTongTien = (nguoilon, treem, embe, gianguoilon, giatreem, giaembe) => {
        return ((nguoilon * +gianguoilon) + (treem * +giatreem) + (embe * +giaembe));
    }
    const quyDoi = (tien, usd) => {
        return (tien / usd).toFixed(2)
    }
    return (
        <div className="thanhtoan">
            {thanhtoan.length === 0 ?
                <div>
                    <h2 className="mt-5 text-center">Thanh toán online</h2>
                    <div className="container text-center">
                        <h5 className="text-danger">Chưa nhận được thông tin, bạn vui lòng đặt lại tour!</h5>
                        <div className="spin"><Spin /></div>
                    </div>
                </div>
                :
                <div>
                    <h2 className="mt-5 text-center">Thanh toán online</h2>
                    <div className="container">
                        <div className="row mt-4">
                            <div className="col-md-6"><div>
                                <p><strong>Tên tour</strong>: {thanhtoan[0].name}</p>

                                <p><strong>Số người</strong>:
                                 <Tooltip placement="right" title={<div>người lớn: {thanhtoan[0].nguoilon}, trẻ em: {thanhtoan[0].treem}, em bé: {thanhtoan[0].embe}</div>}>
                                        &nbsp; {tinhSoNguoi(thanhtoan[0].nguoilon, thanhtoan[0].treem, thanhtoan[0].embe)} người
                                </Tooltip></p>

                                <p><strong>Tổng tiền</strong>: {tinhTongTien(thanhtoan[0].nguoilon, thanhtoan[0].treem, thanhtoan[0].embe, thanhtoan[0].gianguoilon, thanhtoan[0].giatreem, thanhtoan[0].giaembe).toLocaleString()} vnđ</p>
                                <p><strong>Quy đổi</strong>: {quyDoi(tinhTongTien(thanhtoan[0].nguoilon, thanhtoan[0].treem, thanhtoan[0].embe, thanhtoan[0].gianguoilon, thanhtoan[0].giatreem, thanhtoan[0].giaembe), usd)} $</p>
                            </div>
                            </div>
                            <div className="col-md-6 text-center">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm hoadon={thanhtoan[0].hoadon} tentour={thanhtoan[0].name} thanhtien={thanhtoan[0].tongtien} email={email} price={quyDoi(tinhTongTien(thanhtoan[0].nguoilon, thanhtoan[0].treem, thanhtoan[0].embe, thanhtoan[0].gianguoilon, thanhtoan[0].giatreem, thanhtoan[0].giaembe), usd)} />
                                </Elements>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

Stripe.propTypes = {

}

export default Stripe

