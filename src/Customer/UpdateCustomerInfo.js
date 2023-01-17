import axios from "axios";

import React, { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiImageEditFill } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import Swal from "sweetalert2";

import { securePost, secureDelete, secureGet } from "../HttpService/APIService";
import getToken from "../HttpService/LocalStorageService";
import UpdateCustomerProfile from "./UpdateCustomerProfile";
import UpdateCustomerProfilePhoto from "./UpdateCustomerProfilePhoto";

export default function UpdateCustomerInfo() {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updatePhoto, setUpdatePhoto] = useState(false);
  const [addressArr, setAddressArr] = useState([]);
  const { register, handleSubmit } = useForm();
  const [eventKey, setEventKey] = useState("1");
  const [updateAddress, setUpdateAddress] = useState({});

  useEffect(() => {
    secureGet("shop/auth/self").then((response) => {
      console.log(response);
      setCurrentLoggedInUser(response.data);
    });

    secureGet("/customers/address").then((response) => {
      // console.log(response.data);
      setAddressArr(response.data);
    });
  }, [updatePhoto, updateProfile, eventKey]);

  // delete profile photo
  function deleteProfilePhoto() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your photo has been deleted.", "success");
        axios
          .delete("https://shop-api.ngminds.com/customers/profile-picture", {
            headers: {
              Authorization: `Bearer ${getToken("activeCustomerToken")}`,
            },
          })
          .then((response) => {
            console.log(response);
            // toast.success("deleted profile photo successfully ");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  // add adresss to API
  const addUpdatedAdd = (data) => {
    console.log(data);
    console.log("clicked");
    axios
      .put(
        `https://shop-api.ngminds.com/customers/address/${updateAddress.data._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getToken("activeCustomerToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success("address changed");
        setAddressArr((prev) =>
          prev.map((item) => {
            if (item._id === updateAddress.data._id) {
              item = response.data;
            }
            return item;
          })
        );
        setUpdateAddress({ index: -1 });
      });
  };

  // remove address from API
  function removeAdd(id) {
    secureDelete(`/customers/address/${id}}`).then((response) => {
      setAddressArr((prev) => prev.filter((item) => item._id !== id));
    });
  }

  // all addressess
  const alladdresses =
    addressArr &&
    addressArr.map((element, index) => {
      return index === updateAddress?.index ? (
        <div
          key={index}
          className="border border-secondary p-2 rounded w-75"
          style={{ backgroundColor: "#dbdbdb" }}
        >
          <form className="h-100" onSubmit={handleSubmit(addUpdatedAdd)}>
            <div className="d-flex flex-column justify-content-evenly h-100">
              {/* <p>update new address</p> */}
              <input
                className="w-100 border-0 border-bottom"
                placeholder={updateAddress.data.addressLine2}
                // defaultValue={updateAddress.data.addressLine2}
                // value = {updateAddress.data.addressLine2}
                {...register("addressLine2")}
              />
              <input
                className="w-100 border-0 border-bottom"
                placeholder={updateAddress.data.city}
                // defaultValue={updateAddress.data.city}
                // value={updateAddress.data.city}
                // value="hii"
                {...register("city")}
              />
              <input
                className="w-100 border-0 border-bottom"
                placeholder={updateAddress.data.street}
                // defaultValue={updateAddress.data.street}
                {...register("street")}
              />
              <input
                className="w-100 border-0 border-bottom"
                placeholder={updateAddress.data.pin}
                // defaultValue={updateAddress.data.pin}
                {...register("pin")}
              />
              <input
                className="w-100 border-0 border-bottom"
                placeholder={updateAddress.data.state}
                // defaultValue={updateAddress.data.state}
                {...register("state")}
              />
              <div className="d-flex justify-content-evenly">
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setUpdateAddress({ index: -1, data: element });
                  }}
                >
                  cancel
                </Button>
                <Button variant="outline-primary" type="submit">
                  save
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div
          key={index}
          className="border border-secondary py-3 px-2 rounded w-75 "
          style={{ backgroundColor: "#edf6fc" }}
        >
          <p>
            area : <b>{element.addressLine2}</b>
          </p>
          <p>
            street : <b>{element.street}</b>{" "}
          </p>
          <p>
            city : <b>{element.city}</b>
          </p>
          <p>
            State : <b>{element.state}</b>
          </p>
          <p>
            pin-code :<b>{element.pin}</b>
          </p>

          <div className="d-flex justify-content-evenly">
            <Button
              className="border"
              variant="outline-secondary"
              onClick={() => {
                setUpdateAddress({ index: Number(index), data: element });
              }}
            >
              update
            </Button>

            <Button variant="danger" onClick={() => removeAdd(element._id)}>
              Remove
            </Button>
          </div>
        </div>
      );
    });

  const onSubmit = (data) => {
    console.log(data);
    securePost("/customers/address", data).then((response) => {
      console.log(response);
      eventKey === "1" ? setEventKey("0") : setEventKey("1"); // eventKey for accordian
    });
  };

  return (
    <div className="d-flex">
      {/* customer information */}
      <div
        className="border border-primary d-flex flex-column gap-4 align-items-start w-25 vh-100 p-3"
        style={{ background: "#FCF9BE" }}
      >
        <div className=" d-flex w-100 p-1 " style={{ height: "250px" }}>
          <img
            title="profile photo"
            src={currentLoggedInUser?.picture}
            className=" h-100 rounded-3 border border-secondary p-1"
            style={{ width: "90%" }}
          />
          <div>
            <AiTwotoneDelete
              title="delete profile"
              style={{ cursor: "pointer" }}
              size={30}
              color="red"
              onClick={() => {
                deleteProfilePhoto();
              }}
            />

            {/* update profile photo */}
            <RiImageEditFill
              title="edit profile"
              size={30}
              onClick={() => {
                setUpdatePhoto(true);
              }}
            />
          </div>
        </div>

        <div className=" d-flex border w-100 border-dark rounded-3 p-2">
          <div className="w-100">
            <p>username : {currentLoggedInUser?.name}</p>
            <p>mail-id : {currentLoggedInUser?.email}</p>
          </div>
          <div>
            <TiEdit
              title="edit info"
              size={20}
              onClick={() => {
                setUpdateProfile(true);
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-100">
        {/* accordian for add  new address */}

        <div
          className=" d-flex justify-content-center"
          style={{ background: "#FAAB78" }}
        >
          <Accordion className="" defaultActiveKey="0">
            <Accordion.Item eventKey={eventKey}>
              <Accordion.Header>Add new address</Accordion.Header>
              <Accordion.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="d-flex flex-column">
                    <input placeholder="street" {...register("street")} />
                    <input
                      placeholder="address Line 2"
                      {...register("addressLine2")}
                    />
                    <input placeholder="city" {...register("city")} />
                    <input placeholder="state" {...register("state")} />
                    <input placeholder="pin" {...register("pin")} />
                  </div>

                  <div className="d-flex justify-content-end gap-1 p-1">
                    <Button
                      className="btn btn-sm"
                      variant="secondary"
                      onClick={() => {
                        eventKey === "1" ? setEventKey("0") : setEventKey("1");
                      }}
                    >
                      close
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      type="submit"
                      variant="primary"
                    >
                      add
                    </Button>{" "}
                  </div>
                </form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>{" "}
        </div>

        {/* all addressses */}
        <div
          className="p-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,33%)",
            boxSizing: "border-box",
            // background:'#F5D5AE'
          }}
          // style={{}}
        >
          {alladdresses}
        </div>
      </div>

      {updatePhoto ? (
        <UpdateCustomerProfilePhoto
          setUpdatePhoto={setUpdatePhoto}
          updatePhoto={updatePhoto}
        />
      ) : (
        ""
      )}

      {updateProfile ? (
        <UpdateCustomerProfile
          setUpdateProfile={setUpdateProfile}
          updateProfile={updateProfile}
          userName={currentLoggedInUser.name}
          userMail={currentLoggedInUser.email}
        />
      ) : (
        ""
      )}
    </div>
  );
}
