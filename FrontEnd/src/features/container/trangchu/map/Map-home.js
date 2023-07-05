import React, { Component } from 'react'
import { connect } from 'react-redux'
import './map.css'
export class Map_home extends Component {
    render() {
        return (
            <div id="map_home">
                <div id="map-container-google-1" className="z-depth-1-half map-container">
                    <iframe src="https://maps.google.com/maps?q=daihocvinh&t=&z=18&ie=UTF8&iwloc=&output=embed" frameBorder={0} style={{ border: 0 }} allowFullScreen />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Map_home)
