import React, { useState } from "react";
import { useEffect } from "react";
import { Accordion, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { secureGet } from "../HttpService/APIService";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    secureGet("/orders").then((response) => {
    //   console.log(response);
    //   console.log(response.data.results);
      setOrders(response.data.results);

      //   setProductList(response.data.results.items)
    });

    console.log(productList);
  }, []);

  const customerProductList =
    productList &&
    productList.map((element, index) => {
      return (
        <tr key={index}>
          <td className="m-1 border">{index + 1}</td>
          <td>{element.name}</td>
          {/* <td className="border">{element.qty}</td>
          <td className="border">{element.price}</td>
          <td className="border">{element.subTotal}</td> */}
        </tr>
      );
    });

  const ordersList =
    orders &&
    orders.map((element, index) => {
      // {setProductList(element.items)}
      return (
        <div key={index}>
          <Accordion.Item eventKey={index}>
            <Accordion.Header onClick={() => setProductList(element.items)}>
              <div className="d-flex justify-content-between w-100 gap-2 px-2">
                <span>{index + 1}.</span>
                <span>order id :{element._id}</span>
                <span>
                  price : <b>{element.total}</b>
                </span>
              </div>
            </Accordion.Header>

            <Accordion.Body>
              <div
                className="d-flex p-2 w-100 border border-dark justify-content-between"
                style={{ background: "#f2f2f2" }}
              >
                <div className="w-75">
                  <div className="d-flex justify-content-between">
                    <p>
                      Transaction No :- <b>{element.transactionNo}</b>
                    </p>
                    <p>
                      Seller Id :- <b>{element.sellerId}</b>
                    </p>
                  </div>

                  <div className=" p-2 w-100 border ">
                    <h6>products</h6>
                    {/* <table className="w-100">
                      <tr>
                        <th className="border border-dark">name</th>
                        <th className="border border-dark">qty</th>
                        <th className="border border-dark">price</th>
                        <th className="border border-dark">subTotal</th>
                      </tr>
                    </table> */}

                    <Table striped="columns">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          {/* <th>qty</th>
                          <th>subTotal</th> */}
                        </tr>
                      </thead>
                      <tbody>{customerProductList}</tbody>
                    </Table>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2  justify-content-end">
                  <Button
                    className="btn btn-sm "
                    variant="outline-info"
                    onClick={() => {
                      navigate("/seller/product/orderDetails",{state : {
                        orderId : element._id
                      }});
                    }}
                  >
                    Details{" "}
                  </Button>

                  {element.status === "Confirmed" ? (
                    <Button className="btn btn-sm " variant="outline-success">
                      Dispatch{" "}
                    </Button>
                  ) : (
                    <Button className="btn btn-sm" variant="outline-info">
                      Deliver{" "}
                    </Button>
                  )}

                  <Button
                    className="btn btn-sm w-100"
                    variant="outline-warning"
                  >
                    Cancel Order
                  </Button>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </div>
      );
    });
  return (
    <div>
      <Navbar />

      {/* Accordian */}

      <Accordion>
        {ordersList}

        {/* <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item> */}
      </Accordion>
    </div>
  );
}
