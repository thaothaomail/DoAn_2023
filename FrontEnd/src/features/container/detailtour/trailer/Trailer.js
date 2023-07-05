import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import renderHTML from "react-render-html";
import "./../map/map.css";
function Trailer(props) {
  const tours = useSelector((state) => state.tours.tour.data);
  const tour = [];
  if (tours) {
    for (let i = 0; i < tours.length; i++) {
      if (tours[i].id === +props.id) {
        tour.push(tours[i]);
      }
    }
  }
  return (
    <div className="z-depth-1-half map-container mb-3">
      {tour.map((ok) => (
        <div key={ok.id}>{renderHTML(ok.trailer)}</div>
      ))}
    </div>
    // <div>

    //   <div className="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    //         <div className="modal-dialog modal-lg" role="document">
    //         <div className="modal-content">
    //         <div className="modal-body mb-0 p-0">
    //         <div className="embed-responsive embed-responsive-16by9 z-depth-1-half">
    //         <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/A3PDXmYoF5U"
    //                         allowfullscreen></iframe>
    //                 </div >
    //             </div >
    //     <div className="modal-footer justify-content-center" >
    //         <span className="mr-4" > Spread the word!</span >
    //             <a type="button" className="btn-floating btn-sm btn-fb" > <i className="fab fa-facebook-f" ></i ></a >
    //                 <a type="button" className="btn-floating btn-sm btn-tw" > <i className="fab fa-twitter" ></i ></a >
    //                     <a type="button" className="btn-floating btn-sm btn-gplus" > <i className="fab fa-google-plus-g" ></i ></a >
    //                         <a type="button" className="btn-floating btn-sm btn-ins" > <i className="fab fa-aedin-in" ></i ></a >
    //                             <button type="button" className="btn btn-outline-primary btn-rounded btn-md ml-4" data - dismiss="modal" > Close</button >
    //             </div >
    //         </div >
    //     </div >
    //         </div >
    //     <a><button data-toggle="modal" data-target="#modal1">
    //         ok
    //   </button></a>
    // </div>
  );
}

Trailer.propTypes = {};

export default Trailer;
