import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { secureGet } from "../HttpService/APIService";

export default function OrderDetails() {
  const navigateProps = useLocation().state;

  const [orderDetails, setOrderDetails] = useState();
  const [productList, setProductList] = useState([])

  //   console.log(navigateProps);
  console.log(orderDetails);

  useEffect(() => {
    secureGet(`/orders/${navigateProps.orderId}`).then((response) => {
      //   console.log(response);
      setOrderDetails(response.data[0]);
      setProductList(response.data[0].items)
    //  console.log(response.data[0].items)
    });
  }, []);

  return (
    <div className="w-75 mx-auto border p-4">
      <div className="p-3" style={{background:'#e6e6e6'}}>
        <div className="d-flex justify-content-between">
          <span>seller-Id : <b>{orderDetails?.sellerId}</b> </span>
          <span>transaction No -<b>{orderDetails?.transactionNo}</b> </span>
        </div>

        <div className="d-flex justify-content-between">
          <div>
            <p className="m-0">
              <b>Billing address</b>
            </p>
            <p className="m-0">{orderDetails?.address?.street}</p>
            <p className="m-0">{orderDetails?.address?.addressLine2}</p>
            <p className="m-0">{orderDetails?.address?.city}</p>
            <p className="m-0">{orderDetails?.address?.state}</p>
            <p className="m-0">{orderDetails?.address?.pin}</p>
          </div>
          <p>
            delivery Fee : <b>{orderDetails?.deliveryFee}</b>{" "}
          </p>
          <p>
            Total : <b>{orderDetails?.total}</b>
          </p>
        </div>
        <div>
            productList
        </div>

      </div>
    </div>
  );
}
