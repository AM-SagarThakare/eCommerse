// import React from "react";

import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { secureDelete, secureGet } from "../HttpService/APIService";
import { deleteToken } from "../HttpService/LocalStorageService";
import ChangeCustomerPassword from "./ChangeCustomerPassword";
import { CgLogOut } from "react-icons/cg";
import { MdSettingsSuggest } from "react-icons/md";
import {RiUserUnfollowLine, RiLockPasswordLine} from 'react-icons/ri'


export default function OffCanvas({ showCanvas, setShowCanvas }) {
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState();
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState();

  useEffect(() => {
    secureGet("shop/auth/self").then((response) => {
      console.log(response.data);
      setCurrentLoggedInUser(response.data);
      console.log("in useEffect");
    });
  }, []);
  console.log(currentLoggedInUser);
  // }, [updateProfile, updatePhoto]);

  function logOutCustomer() {
    deleteToken("activeCustomerToken");
    setShowCanvas(false);
  }

  return (
    <>
      <div>
        <Offcanvas
          show={showCanvas}
          onHide={() => {
            setShowCanvas(false);
          }}
          placement="end"
          className="w-25 text-light"
          // backdrop="true"
          style={{ backgroundColor: "#050e36" }}
        >
          <Offcanvas.Header closeButton style={{ background: "#434375" }}>
            <Offcanvas.Title>User profile</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex flex-column justify-content-center align-items-center ">
              <div className="d-flex justify-content-center rounded-circle overflow-hidden border border-light p-1"  style={{width:'200px', height:'200px'}} >
                <img className="w-100 h-100 object-fit-cover"  src={currentLoggedInUser?.picture}></img>
              </div>
              <p>{currentLoggedInUser?.name}</p>
              <p> {currentLoggedInUser?.email}</p>

              <div className=" w-100" role='button'>
                <h6
                  variant="secondary"
                  onClick={() => {
                    setChangePassword(true);
                  }}
                >
                  <RiLockPasswordLine />{" "}
                  Change password
                </h6>
                <h6 variant="danger"><RiUserUnfollowLine /> delete user</h6>
                <h6
                  variant="light"
                  // className="border border-secondary"
                  onClick={() => {
                    navigate("/update");
                  }}
                >
                  {" "}
                  <MdSettingsSuggest />{" "}
                  setting
                </h6>
                <h6 onClick={() => logOutCustomer()}>
                  <CgLogOut /> log out
                </h6>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        {changePassword ? (
          <ChangeCustomerPassword
            changePassword={changePassword}
            setChangePassword={setChangePassword}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
