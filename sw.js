if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>r(e,o),f={module:{uri:o},exports:t,require:l};s[o]=Promise.all(i.map((e=>f[e]||l(e)))).then((e=>(n(...e),t)))}}define(["./workbox-7cfec069"],(function(e){"use strict";importScripts("./service-worker.js"),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/home--lhdj1hm.js",revision:null},{url:"assets/index-BFTKvHco.js",revision:null},{url:"assets/index-BMTRAcdn.css",revision:null},{url:"assets/workbox-window.prod.es5-D5gOYdM7.js",revision:null},{url:"index.html",revision:"9d1aa21ff6e282e9e06594a1bfd6c532"},{url:"registerSW.js",revision:"00a8a855b34f8eaca4ed14d9fca14e0b"},{url:"service-worker.js",revision:"3aa43f69c66df897fca1ae3b461fe1af"},{url:"manifest.webmanifest",revision:"0ffb60a256f30854f39df0789aacddab"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
