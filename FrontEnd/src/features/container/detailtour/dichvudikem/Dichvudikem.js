import React from 'react'
import { useSelector } from 'react-redux';
import './dichvudikem.css'
function Dichvudikem(props) {
    const tours = useSelector(state => state.tours.tour.data);
    const tour = [];
    if (tours) {
        for (let i = 0; i < tours.length; i++) {
            if (tours[i].id === +props.id) {
                tour.push(tours[i].Dichvus)
            }
        }
    }
    return (
        <div>
            <div className="heading-nx">
                <h3>Dịch vụ đi kèm</h3>
            </div>
            <div className="container">
                <div className="dichvudikem">
                    {tour[0].map(ok => (
                        <p key={ok.id}>
                            • {ok.name}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

Dichvudikem.propTypes = {

}

export default Dichvudikem
