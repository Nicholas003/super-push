if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>i(e,o),d={module:{uri:o},exports:t,require:l};s[o]=Promise.all(r.map((e=>d[e]||l(e)))).then((e=>(n(...e),t)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/home-tB0BWJaG.js",revision:null},{url:"assets/index-BMTRAcdn.css",revision:null},{url:"assets/index-GdU3qJUI.js",revision:null},{url:"assets/workbox-window.prod.es5-D5gOYdM7.js",revision:null},{url:"index.html",revision:"91a9f0ad9779ca2de58df31f3526bfca"},{url:"registerSW.js",revision:"00a8a855b34f8eaca4ed14d9fca14e0b"},{url:"service-worker.js",revision:"82a14d8e4a489d86a60c114f0066a2da"},{url:"manifest.webmanifest",revision:"0ffb60a256f30854f39df0789aacddab"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
