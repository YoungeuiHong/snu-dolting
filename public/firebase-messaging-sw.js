importScripts(
  "https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-compat.js",
);

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAPYz-ViydrRDN2RxUKU7rD1LW-2Wkz25Y",
  authDomain: "snu-dolting-fd737.firebaseapp.com",
  projectId: "snu-dolting-fd737",
  storageBucket: "snu-dolting-fd737.firebasestorage.app",
  messagingSenderId: "307291527013",
  appId: "1:307291527013:web:3ef92527361554a9c2338c",
  measurementId: "G-X5NW20WVG5",
});

const messaging = firebase.messaging(firebaseApp);

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon:
      payload.data.image || "/app-icon/android/android-launchericon-48-48.png",
    data: {
      url: payload.data.url || "/",
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        for (const client of clients) {
          if (client.url.includes(targetUrl) && "focus" in client) {
            return client.focus();
          }
        }

        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      }),
  );
});
