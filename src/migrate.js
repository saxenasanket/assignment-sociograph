import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import firebase from "./firebase";

const db = firebase.firestore();

function Migrate() {
  const migrate = async () => {
    // add 10 new users with random friend IDs from 1-20 and user name
    for (let index = 1; index <= 10; index++) {
      const name = "user" + index;
      let friends = [];

      //gernerate random count of friends
      const countOfFriends = [Math.floor(Math.random() * 20) + 1];

      // for each friend...
      for (let idx = 0; idx < countOfFriends; idx++) {
        //gernerate random user IDs and assign as friend
        friends.push(Math.floor(Math.random() * 20) + 1);
      }
      const coll = db.collection("users");
      const docID = index.toString();
      await coll.doc(docID).set({
        name: name,
        friends: friends
      });
    }

    // for each product add n random reviews(1-20) with title, comment, random rating(1-5), usefulness(1-5), random userID(1-10)

    for (let index = 1; index <= 20; index++) {
      const name = "product" + index;

      //gerenrate random reviews
      const numberOfReviews = [Math.floor(Math.random() * 10) + 1];

      // for each review...
      for (let idx = 1; idx <= numberOfReviews; idx++) {
        //generate random rating
        const rating = Math.floor(Math.random() * 5) + 1;
        //generate random usefulness
        const usefulness = Math.floor(Math.random() * 5) + 1;
        const path = db.collection(`products/${name}/reviews`);

        await db
          .collection("products")
          .doc(name.toString())
          .set({
            id: index
          });

        const docID = "review" + idx;

        const title = `title for review number ${idx} on product id ${index}`;
        const comment = `comment for review number ${idx} on product id ${index}`;
        const user = Math.floor(Math.random() * 10) + 1;

        await path.doc(docID).set({
          rating,
          usefulness,
          title,
          comment,
          user
        });
      }
    }
  };

  return (
    <div className="migrate-page">
      <center>
        <Button variant="danger" onClick={migrate}>
          Run migration script to store data in db
        </Button>
      </center>
    </div>
  );
}

export default Migrate;
