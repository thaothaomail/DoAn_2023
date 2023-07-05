import React, { Component } from 'react'
import renderHTML from 'react-render-html';
import { useSelector } from 'react-redux';
import './luuy.css'
function Luuy(props) {
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
        <div>
            <div className="heading-nx">
                <h3>Lưu ý</h3>
            </div>
            <div className="container">
                <div className="luuy">
                    {tour.map(ok => (
                        <div key={ok.id}>{renderHTML(ok.luuy)}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

Luuy.propTypes = {

}

export default Luuy