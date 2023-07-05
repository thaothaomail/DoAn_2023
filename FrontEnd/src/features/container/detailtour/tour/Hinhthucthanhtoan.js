import React, { useState } from 'react'
import { Radio } from 'antd';

export default function Hinhthucthanhtoan(props) {

    const [value, setvalue] = useState(1);
    const sendData = (e) => {
        props.callback(e)
    }
    const onChange = e => {
        sendData(e.target.value)
        setvalue(e.target.value)
    };
    const style = {
        width: "100%",
    }
    return (
        <div>
            <Radio.Group onChange={onChange} value={value}>
                {/* <Radio style={style} value={1}>Thanh toán trực tiếp</Radio> */}
                {/* <Radio style={style} value={2}>Thanh toán phương thức chuyển khoản</Radio> */}
                <Radio style={style} value={3}>Thanh toán thẻ tín dụng</Radio>
            </Radio.Group>
        </div>
    )
}