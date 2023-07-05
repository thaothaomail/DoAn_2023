import React from 'react'
import { useSelector } from 'react-redux';
import renderHTML from 'react-render-html'
import './map.css'
function Maps(props) {
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
        <div id="map-container-google-1" className="z-depth-1-half map-container mb-3">
            {tour.map(ok => (
                <div key={ok.id}>
                    {renderHTML(ok.bando)}
                </div>
            ))}
        </div>
    )
}

Maps.propTypes = {

}

export default Maps
