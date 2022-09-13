
self.addEventListener("install", (event) => {
  console.log("service worker: install", event);
});

self.addEventListener('activate', async event => {
  console.log("service worker: activate", event);
});

self.addEventListener("fetch", (event) => {
  console.debug("network fetch:", event);
});

self.addEventListener("notificationclick", e => {
  console.log("service worker: notificationclick", e.notification);
});