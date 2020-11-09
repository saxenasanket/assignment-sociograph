import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "react-bootstrap/Button";
import Typography from "@material-ui/core/Typography";
import StarRatings from "react-star-ratings";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "./firebase";

const useStyles = makeStyles({
  root: {
    textAlign: "center"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 25,
    color: "black"
  },
  pos: {
    marginBottom: 12,
    color: "black"
  }
});

const db = firebase.firestore();

function Reviews(props) {
  const [reviews, setReviews] = useState([]);
  const [friends, setFriends] = useState([]);
  const [count, setCount] = useState(3);
  const [paginatedReviews, setPaginatedReviews] = useState([]);

  // get product_id and viewer_id from URL
  const { match } = props;
  const productID = match.params.product_id;
  const viewerID = match.params.viewer_id;

  const min = (a, b) => (a < b ? a : b);

  useEffect(async () => {
    // fetch reviews for given product ID
    let path = db.collection(`products/product${productID}/reviews`);
    let snapshot = await path.get();
    let arr = [];

    snapshot.forEach(doc => {
      arr.push(doc.data());
    });

    // get user ids of friends
    const userRef = db.collection("users").doc(viewerID.toString());
    const doc = await userRef.get();
    const friendsArr = doc.data().friends;

    // if comment is done by friend of user, get friend's name
    await Promise.all(
      arr.map(async rv => {
        if (friendsArr.includes(rv.user)) {
          let friendID = rv.user;
          friendID = friendID.toString();
          const frinedRef = db.collection("users").doc(friendID);
          const document = await frinedRef.get();
          rv.username = document.data().name;
        }
      })
    );

    // set reviews and friends array
    setReviews(arr);
    setFriends(friendsArr);
  }, []);

  // whenever count is changed
  useEffect(() => {
    setPaginatedReviews(reviews.slice(0, min(count, reviews.length)));
  }, [reviews, count]);

  const sortByRating = () => {
    let displayedReviews = [...paginatedReviews];
    displayedReviews.sort((x, y) => y.rating - x.rating);
    setPaginatedReviews(displayedReviews);
  };

  const sortByUsefulness = () => {
    let displayedReviews = [...paginatedReviews];
    displayedReviews.sort((x, y) => y.usefulness - x.usefulness);
    setPaginatedReviews(displayedReviews);
  };

  const classes = useStyles();

  return (
    <div className="review-page">
      <div className="row">
        <h3>Reviews on product id: {productID}</h3>
        <Button onClick={sortByRating} variant="info">
          Sort by Rating
        </Button>
        <Button onClick={sortByUsefulness} variant="warning" id="useful-btn">
          Sort by Usefulness
        </Button>
      </div>
      <div className="row">
        {paginatedReviews.map((review, idx) => (
          <div className="col-md-4">
            <Card
              className={classes.root}
              style={{
                marginTop: "4vh",
                borderStyle: "solid",
                borderWidth: "1px"
              }}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {review.title}
                </Typography>
                <Typography variant="h5" component="h2"></Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="chocolate"
                    numberOfStars={5}
                    name="rating"
                  />
                  <br></br>
                  <br></br>
                  Usefulness: <b>{review.usefulness}</b>
                </Typography>
                <Typography variant="body2" component="p">
                  {review.comment}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  {friends.includes(review.user) ? (
                    <>User Name: {review.username}</>
                  ) : (
                    <>User ID: {review.user}</>
                  )}
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>

      {count < reviews.length && (
        <center>
          <Button
            variant="outline-success"
            onClick={() => setCount(count + 3)}
            style={{ marginTop: "5vh" }}
          >
            Load More
          </Button>
        </center>
      )}
    </div>
  );
}

export default Reviews;
