self.addEventListener("install", () => {
  console.log("Service Worker installed.");
});

self.addEventListener("activate", () => {
  console.log("Service Worker activated.");
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        for (const client of clients) {
          if (client.url === new URL(targetUrl, self.location.origin).href) {
            if ("focus" in client) {
              return client.focus();
            }
          }
        }

        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      }),
  );
});
