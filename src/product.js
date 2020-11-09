import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import firebase from "./firebase";
import { withRouter } from "react-router-dom";

const db = firebase.firestore();

function Product() {
  const [products, setProducts] = useState([]);
  const [userID, setUserID] = useState("");

  useEffect(async () => {
    // set user ID in local storage
    setUserID(localStorage.getItem("user-ID"));

    // fetch all product IDs
    const snapshot = await db.collection("products").get();
    let productArr = [];
    snapshot.forEach(doc => {
      productArr.push(doc.data().id);
    });
    setProducts(productArr);
  }, []);

  return (
    <div className="product-page">
      <h2>Select Product ID</h2>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Product ID
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {products.map(productID => (
            <Dropdown.Item href={"../reviews/" + productID + "/" + userID}>
              {productID}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default withRouter(Product);
