import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const [res, setresJson] = useState([]);

  // console.log("resJson",resJson[0].price);

  //   console.log("map",resJson.map(response =>(
  //     response[0].price
  //   )));
  // const [res, setresJson] = useState({price:`${res.price}`,brand:"Shirts"});

  useEffect(() => {
    getCartItems();
  }, []);

  const removeproduct = async (_id) => {
    console.log("_id", _id);
    try {
      console.log("API fetch");

      let res = await fetch("http://localhost:3000/delete-cart-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: _id,
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        console.log("res", resJson);
        console.log("Product deleted successfully");
      } else {
        console.log("error in deleting");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const history = useNavigate();

  const moveToHomePage = () => {
    history("/home");
  };

  const getCartItems = async () => {
    var userlogin = JSON.parse(localStorage.getItem("user"));

    console.log("userlogin", userlogin);
    try {
      console.log("API fetch");
      let res = await fetch("http://localhost:3000/get-cart-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_id: userlogin.email_id,
        }),
      });
      console.log("res.body", res);
      let resJson = await res.json();
      console.log("resJson", resJson);
      if (res.status === 201) {
        setresJson(resJson);
        console.log("Cart list fetch Succesfully", resJson);
      } else {
        // alert(resJson.message);
        console.log("error in fetching cart list");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <section className="section-pagetop bg">
        <div className="container">
          <h2 className="title-page">Shopping cart</h2>
        </div>
      </section>

      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <div className="card">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">ProductID</th>
                      <th scope="col" width="120">
                        Quantity
                      </th>
                      <th scope="col" width="120">
                        Price
                      </th>
                      <th scope="col" className="text-right" width="200">
                        {" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {res.map(({ price, _id }) => {
                      return (
                        <tr>
                          <td>
                            <figure className="itemside">
                              <div className="aside">
                                {/* <img
                              src="/public/images/items/1.jpg"
                              className="img-sm"
                            /> */}
                              </div>
                              {/* <div className="aside"><img src="https://m.media-amazon.com/images/I/819qvacQhiL._AC_SX255_.jpg" className="img-sm" /></div> */}
                              <figcaption className="info">
                                <a href="#" className="title text-dark">
                                  {_id}
                                </a>
                                <br></br>
                                {/* <p className="text-muted small">*/}
                                Size: XL, Color: blue,
                                {/* <br /> Brand: Gucci
                            </p>  */}
                              </figcaption>
                            </figure>
                          </td>
                          <td>
                            <select className="form-control">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </select>
                          </td>
                          <td>
                            <div className="price-wrap">
                              <var className="price">${price}</var>
                              <br></br>
                              <small className="text-muted">
                                {/* {res.map(response => response.productId)} each */}
                              </small>
                            </div>
                          </td>
                          <td className="text-right">
                            <a
                              data-original-title="Save to Wishlist"
                              title=""
                              href=""
                              className="btn btn-light mr-2"
                              data-toggle="tooltip"
                            >
                              {" "}
                              <i className="fa fa-heart"></i>
                            </a>
                            {/* <a href="" className="btn btn-light"> */}
                              {/* {" "} */}
                              {/* remove  */}
                              <button onClick={() => removeproduct(_id)}>
                                Remove
                              </button>
                            {/* </a> */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="card-body border-top">
                  {/* <a href="#" className="btn btn-primary float-md-right"> */}
                    {/* {" "} */}
                    <button> Make Purchase </button>
                    {/* <i className="fa fa-chevron-right"></i>{" "} */}
                  {/* </a>s */}
                  <a href="#" className="btn btn-light">
                    {" "}
                    {/* <i className="fa fa-chevron-left"></i> Continue shopping{" "} */}
                    <button onClick={moveToHomePage}>Continue shopping </button>
                  </a>
                </div>
              </div>

              <div className="alert alert-success mt-3">
                <p className="icontext">
                  <i className="icon text-success fa fa-truck"></i> Free
                  Delivery within 1-2 weeks
                </p>
              </div>
            </main>
            <aside className="col-md-3">
              <div className="card mb-3">
                {/* <div className="card-body"> */}
                {/* <form>
                        <div className="form-group">
                            <label>Have coupon?</label>
                            <div className="input-group">
                                <input type="text" className="form-control" name="" placeholder="Coupon code" />
                                <span className="input-group-append"> 
                                    <button className="btn btn-primary">Apply</button>
                                </span>
                            </div>
                        </div>
                    </form> */}
                {/* </div>  */}
              </div>
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Total price:</dt>
                    <dd className="text-right">USD 568</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Discount:</dt>
                    <dd className="text-right">USD 0</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="text-right  h5">
                      {/* <strong>$1,650</strong> */}
                      {/* <strong>$  { res.map(({price, productId})=>{
                        
                      })}</strong> */}

                      {/* {res.map(price =>{

                        let sum=0; */}

                      {/* } )} */}

                      {/* { const Total = res.map(item => item.price).reduce((prev, curr) => prev + curr, 0);} */}
                      {/* {  price.forEach(element => { */}
                      {/* let sum =0;
                             sum += element;

                             console.log("Total",Total); */}
                      {/* })}
                       
                            })} */}

                      {/* }); */}
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    {/* <img src="public/images/misc/payments.png" height="26" /> */}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-name bg padding-y">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>

      <footer className="section-footer border-top padding-y">
        <div className="container">
          <p className="float-md-right">
            &copy; Copyright 2020 All rights reserved
          </p>
          <p>
            <a href="#">Terms and conditions</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
