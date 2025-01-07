"use client";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAPYz-ViydrRDN2RxUKU7rD1LW-2Wkz25Y",
  authDomain: "snu-dolting-fd737.firebaseapp.com",
  projectId: "snu-dolting-fd737",
  storageBucket: "snu-dolting-fd737.firebasestorage.app",
  messagingSenderId: "307291527013",
  appId: "1:307291527013:web:3ef92527361554a9c2338c",
  measurementId: "G-X5NW20WVG5",
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export { app, messaging };
