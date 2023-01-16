import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
// import ReactCrop from "react-image-crop/dist/ReactCrop";
import ReactCrop from "react-image-crop";
import { securePost } from "../HttpService/APIService";
import ImageCropper from "../ImageCropper/ImageCropper";

export default function UpdateCustomerProfilePhoto({
  setUpdatePhoto,
  updatePhoto,
}) {
  const { register, handleSubmit } = useForm();
  const [src, setFile] = useState(null);
  var images = [];
  const formData = new FormData();

  const onSubmit = (data) => {
    console.log(images);
    console.log("in data");

    formData.append("picture", images[0]);
    securePost("/customers/profile-picture", formData).then((response) => {
      console.log(response);

      setUpdatePhoto(false);
      toast.success("new profile photo uploaded successfully");
    });
  };

  // ===================================================================
  const [crop, setCrop] = useState({ aspect: 16 / 9 });

  const onExitCall = () => {
    setUpdatePhoto(false);
  };
  const handleFileChange = (e) => {
     setFile(e.target.files[0]);
    // setFile(URL.createObjectURL(e.target.files[0]));
    console.log('hiiii');
  };
  const [image, setImage] = useState(null);

  const onLoad = (image) => {};

  return (
    <div>
      <Modal
        show={updatePhoto}
        onExit={() => onExitCall}
        onHide={() => setUpdatePhoto(false)}
      >
        <Modal.Header closeButton style={{ background: "#FAAB78" }}>
          <Modal.Title>Update profile photo </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div>
              {/* <input
                type="file"
                onChange={(event) => {
                  images = event.target.files;
                }}
              /> */}

              {/* <input
                type="file"
                onChange={(event) => {
                  // handleFileChange
                   console.log(event.target.files[0]);
                  //  setFile(event.target.files[0])
                }}  
              /> */}
              <ImageCropper />
              {/* <div>
                <p>euuuu</p>
                {
                  <ReactCrop
                    onImageLoaded={setImage}
                    crop={crop}
                    onChange={setCrop}
                    src={src}
                  >
                    <img src={src} alt="profile" />
                  </ReactCrop>
                }
              </div> */}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setUpdatePhoto(false)}>
              Close
            </Button>

            <Button
              variant="primary"
              type="submit"
              //   onClick={() => setUpdatePhoto(false)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
