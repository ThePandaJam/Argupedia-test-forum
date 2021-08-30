import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//firebase
import { initializeApp } from "firebase/app";

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBI8EqTVZZiYSQb_kdwbm60-Qzmp-8D_4c",
  authDomain: "test-forum-995a7.firebaseapp.com",
  projectId: "test-forum-995a7",
  storageBucket: "test-forum-995a7.appspot.com",
  messagingSenderId: "152503019495",
  appId: "1:152503019495:web:2ca3c794ea56c423eaff42",
  measurementId: "G-7RH8ZW42J4"
};
//initialise firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
