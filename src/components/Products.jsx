import styled from "styled-components";
import React, { useState, useEffect } from "react";
// import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Products() {
  const [res, setresJson] = useState([]);

  useEffect(() => {
    console.log("Products");
    getProducts();
  }, []);

  const getProducts = async () => {
    var userId = JSON.parse(localStorage.getItem("user")).id;
    console.log("userId", userId);
    let res = await fetch("http://localhost:3000/getproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userId,
      }),
    });
    let resJson = await res.json();
    console.log("resJson", resJson);
    if (res.status === 201) {
      setresJson(resJson);
      console.log("Product get succesafully");
    } else {
      console.log("error in inserting user");
    }
  };

  return (
    <Container>
      {res.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
}

export default Products;
