// Naksha service worker: works offline and shows the daily reminder notification.
const CACHE = "naksha-v7";
const SHELL = ["./", "index.html", "map-data.js", "map-extra.js", "places.js", "world-data.js", "world-places.js", "globe-data.js", "earth-2k.jpg", "vendor/d3-array.min.js", "vendor/d3-geo.min.js", "vendor/topojson-client.min.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== "naksha-meta").map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Serve from cache straight away, refresh the cache in the background (stale-while-revalidate).
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !/fonts\.(googleapis|gstatic)\.com$/.test(url.host)) return;
  e.respondWith(caches.open(CACHE).then(async (cache) => {
    const hit = await cache.match(req, { ignoreSearch: sameOrigin });
    const net = fetch(req).then((res) => { if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone()); return res; }).catch(() => hit);
    if (hit) { e.waitUntil(net); return hit; }
    return net;
  }));
});
// Daily nudge (Chrome, installed app, after the player allowed notifications). At most once per IST day.
self.addEventListener("periodicsync", (e) => {
  if (e.tag !== "daily-5") return;
  e.waitUntil((async () => {
    const day = new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
    const meta = await caches.open("naksha-meta");
    if (await meta.match("/notified-" + day)) return;
    await self.registration.showNotification("Today's 5 is ready", {
      body: "Five new places on the map. Keep your streak going.",
      icon: "icon-192.png", badge: "icon-192.png", tag: "daily-5",
    });
    await meta.put("/notified-" + day, new Response("1"));
  })());
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window" }).then((list) => list.length ? list[0].focus() : self.clients.openWindow("./")));
});
