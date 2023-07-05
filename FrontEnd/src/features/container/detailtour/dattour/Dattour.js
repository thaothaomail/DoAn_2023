import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Steps } from 'antd'

export class Dattour extends Component {
    render() {
        const { Step } = Steps
        return (
            <div id="dattour">
                <div className="breadcrumb">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/"><i className="fas fa-home mr-2"></i>Trang chủ</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Đặt tour</li>
                        </ol>
                    </nav>
                </div>
                <div className="container">
                    <div className="steps">
                        <Steps size="small" current={1}>
                            <Step title="Nhập thông tin" />
                            <Step title="Xác nhận" />
                            <Step title="Thanh toán" />
                        </Steps>
                    </div>
                </div>
                <div className="thongtintour">
                    <h3 className="text-center mt-3">Thông tin tour</h3>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Dattour)
