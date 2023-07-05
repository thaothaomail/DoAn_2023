import React from 'react'

export default function Error() {
    return (
        <div id="error">
            <div className="text-center">
                <i className="far fa-frown " style={{ fontSize: "150px", marginBottom: "2rem" }}></i>
                <h2 >404</h2>
                <br />
                <h4>Bạn không có quyền truy cập</h4>
            </div>
        </div>
    )
}
