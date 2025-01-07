import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAPYz-ViydrRDN2RxUKU7rD1LW-2Wkz25Y",
  authDomain: "snu-dolting-fd737.firebaseapp.com",
  projectId: "snu-dolting-fd737",
  storageBucket: "snu-dolting-fd737.firebasestorage.app",
  messagingSenderId: "307291527013",
  appId: "1:307291527013:web:3ef92527361554a9c2338c",
  measurementId: "G-X5NW20WVG5",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/app-icon/android/android-launchericon-48-48.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
