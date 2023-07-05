import React from 'react'
import { useSelector } from 'react-redux';
function Chitietgia(props) {
    const tours = useSelector(state => state.tours.tour.data);
    const tour = [];
    if (tours) {
        for (let i = 0; i < tours.length; i++) {
            if (tours[i].id === +props.id) {
                tour.push(tours[i])
            }
        }
    }
    const tinhkhuyenmai = (money, km) => {
        return ((money) - ((money) * (km / 100)))
    }
    const checkKhuyenmai = () => {
        if (tour[0].Khuyenmais.length === 0) {
            return tour[0].gianguoilon;
        } else {
            if (tour[0].Khuyenmais[0].status === 0) {
                return tour[0].gianguoilon;
            } else {
                return tinhkhuyenmai(tour[0].gianguoilon, tour[0].Khuyenmais[0].khuyenmai);
            }
        }
    }
    
    return (
        <div>
            <div className="heading-nx">
                <h3>Chi tiết giá</h3>
            </div>
            <div className="container">
                <div className="Chitietgia">
                    {tour.map(ok => (
                        <div key={ok.id}>
                            <p>
                                - Giá tiền người lớn: {checkKhuyenmai().toLocaleString()} vnd
                            </p>
                            <p>
                                - Giá tiền trẻ em: {(ok.giatreem).toLocaleString()} vnd
                            </p>
                            <p>
                                - Giá tiền em bé: {(ok.giaembe).toLocaleString()} vnd
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

Chitietgia.propTypes = {

}

export default Chitietgia
