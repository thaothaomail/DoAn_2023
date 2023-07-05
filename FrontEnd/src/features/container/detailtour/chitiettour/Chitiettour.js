import React from 'react'
import { useSelector } from 'react-redux';
import renderHTML from 'react-render-html';
import './chitiettour.css'
function Chitiettour(props) {
    const tours = useSelector(state => state.tours.tour.data);
    const tour = [];
    if (tours) {
        for (let i = 0; i < tours.length; i++) {
            if (tours[i].id === +props.id) {
                tour.push(tours[i])
            }
        }
    }
    return (
        <div id="ct-tour">
            <div className="heading-nx">
                <h3>Chi tiết</h3>
            </div>
            <div className="container">
                <div className="content-tour">
                    {tour.map(ok => (
                        <div key={ok.id}>{renderHTML(ok.chitiettour)}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

Chitiettour.propTypes = {

}

export default Chitiettour