import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey:process.env.REACT_APP_apiKey,
  // authDomain:process.env.REACT_APP_authDomain,
  // projectId:process.env.REACT_APP_projectId,
  // storageBucket:process.env.REACT_APP_storageBucket,
  // messagingSenderId:process.env.REACT_APP_messagingSenderId,
  // appId:process.env.REACT_APP_appId
  apiKey: "AIzaSyDwqWTFLuer1nxqybcSe2I7toImkvcZt6M",
  authDomain: "genius-car-service-d7a12.firebaseapp.com",
  projectId: "genius-car-service-d7a12",
  storageBucket: "genius-car-service-d7a12.appspot.com",
  messagingSenderId: "132746501553",
  appId: "1:132746501553:web:dac61522e5bedf3d2f3190",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
