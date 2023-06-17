const cacheName = "shopping-cart";

const appShellFiles = [
    "/shopping-cart-vue-front/dist/",
    "/shopping-cart-vue-front/dist/index.html",
    "/shopping-cart-vue-front/dist/images/asiyajavayant.png",
    "/shopping-cart-vue-front/dist/images/asset-access.svg",
    "/shopping-cart-vue-front/dist/images/nature4.jpg",
    "/shopping-cart-vue-front/dist/images/og_good_foods.jpg",
    "/shopping-cart-vue-front/dist/images/whole-europe.svg",
    "/shopping-cart-vue-front/dist/assets/AdminSetDiscount.93c26bfc.js",
    "/shopping-cart-vue-front/dist/assets/AdminSetDiscount.760f6930.css",
    "/shopping-cart-vue-front/dist/assets/color.473bc8ca.png",
    "/shopping-cart-vue-front/dist/assets/DiscountsList.d803d3f4.js",
    "/shopping-cart-vue-front/dist/assets/Error.cfb475f1.js",
    "/shopping-cart-vue-front/dist/assets/FirstAccess.4658c832.css",
    "/shopping-cart-vue-front/dist/assets/FirstAccess.aac9c7ec.js",
    "/shopping-cart-vue-front/dist/assets/index.86aecea5.css",
    "/shopping-cart-vue-front/dist/assets/index.4889ef11.js",
    "/shopping-cart-vue-front/dist/assets/Login.559d7478.js",
    "/shopping-cart-vue-front/dist/assets/Login.15288281.css",
    "/shopping-cart-vue-front/dist/assets/NotFound.3570e00b.js",
    "/shopping-cart-vue-front/dist/assets/primeicons.5e10f102.svg",
    "/shopping-cart-vue-front/dist/assets/primeicons.90a58d3a.woff",
    "/shopping-cart-vue-front/dist/assets/primeicons.131bc3bf.ttf",
    "/shopping-cart-vue-front/dist/assets/primeicons.3824be50.woff2",
    "/shopping-cart-vue-front/dist/assets/primeicons.ce852338.eot",
    "/shopping-cart-vue-front/dist/assets/ProductsList.6d388152.css",
    "/shopping-cart-vue-front/dist/assets/ProductsList.d79a3868.js",
    "/shopping-cart-vue-front/dist/assets/WelcomePage.fefd6872.js",
    "/shopping-cart-vue-front/dist/assets/whole-europe.dcc9a741.js",
];

const contentToCache = appShellFiles;

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            console.log("[Service Worker] Caching all: app shell and content");
            await cache.addAll(contentToCache);
        })()
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
            if (r) {
                return r;
            }
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
            cache.put(e.request, response.clone());
            return response;
        })()
    );
});
