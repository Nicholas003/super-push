if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),u={module:{uri:t},exports:o,require:l};s[t]=Promise.all(r.map((e=>u[e]||l(e)))).then((e=>(n(...e),o)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/AboutView-C6Dx7pxG.css",revision:null},{url:"assets/AboutView-u9r8mg8V.js",revision:null},{url:"assets/index-BCz5srHP.css",revision:null},{url:"assets/index-DRA1Hpr9.js",revision:null},{url:"index.html",revision:"668944def7bd748ec6ae05267fdf29c1"},{url:"registerSW.js",revision:"00a8a855b34f8eaca4ed14d9fca14e0b"},{url:"manifest.webmanifest",revision:"6163d5efd648c7da87e91d541da6a5c0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
