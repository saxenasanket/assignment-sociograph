const firebase = require("firebase");
//Change config to use different db
var firebaseConfig = {
  apiKey: "AIzaSyAPye3CG26B-TSn8xq99r6wBIHqC90fukQ",
  authDomain: "sociograph-assignment.firebaseapp.com",
  databaseURL: "https://sociograph-assignment.firebaseio.com",
  projectId: "sociograph-assignment",
  storageBucket: "sociograph-assignment.appspot.com",
  messagingSenderId: "873756072653",
  appId: "1:873756072653:web:fe70ab6f59c4401ca46784",
  measurementId: "G-CYZP2P8C0Z"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
