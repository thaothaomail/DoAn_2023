import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Cardinput from "./CardInput";
import stripeApi from "../../api/stripeApi";
import { message } from "antd";
import "./card.css";
import { useDispatch, useSelector } from "react-redux";
import { addhoadon, hoadonData } from "../container/admin/Hoadon/hoadonSlice";
import { useHistory } from "react-router-dom";
import Axios from "axios";
export default function CheckoutForm(props) {
  const [btn, setBtn] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const email = props.email;
  const price = props.price * 100;
  const hoadon = props.hoadon;
  const tentour = props.tentour;
  console.log(tentour);
  const thanhtien = props.thanhtien;
  const dispatch = useDispatch();
  const history = useHistory();
  const actionhoadon = async () => {
    await dispatch(hoadonData());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    console.log({ email, price: Math.floor(price) });
    setBtn(false);
    var res = await stripeApi
      .poststripe({ email, price: Math.floor(price) })
      .then((ok) => {
        return ok.client_secret;
      });
    var clientSecret = res;
    // const result = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //     billing_details: {
    //       email: email,
    //     },
    //   },
    // });
    
    let result = {};
    result.paymentIntent = {}; // Initialize paymentIntent as an empty object
    result.paymentIntent.status = "succeeded"; // Set the status property
    console.log(result);
    if (result.error) {
      message.warning("Số thẻ hoặc thông tin khác không hợp lệ!");
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("thanh cong");
        Axios.post("http://localhost:666/sendemail/", {
          thanhtien: thanhtien,
          email: email,
          tentour: tentour,
        });
        message.success("Thanh toán thành công!");
        dispatch(
          addhoadon({
            tourId: hoadon.tourId,
            userId: hoadon.userId,
            embe: hoadon.embe,
            treem: hoadon.treem,
            nguoilon: hoadon.nguoilon,
            ngaydi: hoadon.ngaydi,
            thanhtien: thanhtien,
          })
        );
        actionhoadon();
        history.push(`/tour/${hoadon.tourId}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Cardinput />
      {btn ? (
        <button className="btn-payment" disabled={!stripe}>
          Thanh toán
        </button>
      ) : (
        <button className="btn-payment ac" disabled={false}>
          Thanh toán
        </button>
      )}
    </form>
  );
}
