if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),f={module:{uri:t},exports:c,require:r};s[t]=Promise.all(i.map((e=>f[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"5a3f8ca3c46348f5997086114d97844f"},{url:"/_next/dynamic-css-manifest.json",revision:"d751713988987e9331980363e24189ce"},{url:"/_next/static/FvvayLir6CfO1GamrzOTy/_buildManifest.js",revision:"c575101dce140c8867f6f91496ff005d"},{url:"/_next/static/FvvayLir6CfO1GamrzOTy/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",revision:"2b4c1ee4fbe3a7cf"},{url:"/_next/static/chunks/218.57a830a2c55ba802.js",revision:"57a830a2c55ba802"},{url:"/_next/static/chunks/4bd1b696-f4e4a7fe856b7615.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/501-3fb91c8ce0561406.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/517-c8d5eef76d0af2f8.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/607-f81719161d7ee51e.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/722-f807955ee622eb4d.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/779-ca47ad78ad339d14.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/988-c151464534799b49.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/app/_not-found/page-b60f205c5b8b186d.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/app/add-order/page-077f4510df54b7fa.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/app/items/page-201fdc92b1164a2f.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/app/layout-ec53f3404ebe4f6a.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/app/orders/page-af2c0206a30c95d9.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/app/page-f1509eadb2f7d3e8.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/main-app-dfb544b4421eb0ef.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/main-f1c09bbf785d49da.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/pages/_app-430fec730128923e.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/pages/_error-2d7241423c4a35ba.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-27653ebb39f8a6dd.js",revision:"FvvayLir6CfO1GamrzOTy"},{url:"/_next/static/css/27db687e5f5e2544.css",revision:"27db687e5f5e2544"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icon512_maskable.png",revision:"1e5df8c5bf8be075d61da916d9258300"},{url:"/icon512_rounded.png",revision:"a563ba299749d71d816855330bb5aafa"},{url:"/manifest.json",revision:"5e37ca7c2e161e2e7abed915d8c8d170"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/service-worker.js",revision:"54330475697ae48c32e8d17ca3a9d296"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
