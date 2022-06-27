import React, { useState } from "react";
import "./Addproduct.css";
import axios from "axios";
import { color } from "@mui/system";

function Addproduct(props) {
  let setOpen = props.setOpenProductPage;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState("");
  const [vendorId, setvendorId] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState("");
  const [color, setColor] = useState("");
  const [size, setSIze] = useState("");

  const handlename = (e) => {
    setName(e.target.value);
  };

  const handleVendorId = (e) => {
    setvendorId(e.target.value);
  };

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const handleSize = (e) => {
    setSIze(e.target.value);
  };

  const handlePrice = (e) => {
    setprice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var userId = JSON.parse(localStorage.getItem("user")).id;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("vendorId", userId);
    formData.append("color", color);
    formData.append("size", size);

    const response = await axios({
      method: "post",
      url: "http://localhost:3000/",
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    if (response.status === 200) {
      console.log("data saved succesfully");
      handleToClose();
    } else {
      console.log("error in inserting user");
    }
  };

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h1>ADD PRODUCT</h1>
        <label>
          Name:
          <input
            type="text"
            value={name}
            required
            onChange={(e) => {
              handlename(e);
            }}
          />
        </label>
        <label>
          Size:
          <input
            type="text"
            value={size}
            required
            onChange={(e) => {
              handleSize(e);
            }}
          />
        </label>
        <label>
          color:
          <input
            type="text"
            value={color}
            required
            onChange={(e) => {
              handleColor(e);
            }}
          />
        </label>
        <label>
          price:
          <input
            type="text"
            value={price}
            required
            onChange={(e) => {
              handlePrice(e);
            }}
          />
        </label>
        <div>
          <input
            type="file"
            onChange={(e) => {
              if (e) {
                const file = e.target.files;
                if (file) {
                  setimage(file[0]);
                }
              }
            }}
          />
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default Addproduct;
