"use strict";var precacheConfig=[["/RoyalGameOfUr/index.html","9fa69d28c941206ef461f37a2fa938fc"],["/RoyalGameOfUr/static/css/main.d18c8206.css","e56ca5ed5b83f9d46dd264064971e7f5"],["/RoyalGameOfUr/static/js/main.9e4c376a.js","41b923761672e089b7096f344bbf733c"],["/RoyalGameOfUr/static/media/beige_finish.ed4d03dc.svg","ed4d03dc0c9492810cd2391bc3976a56"],["/RoyalGameOfUr/static/media/beige_marker.adff8bf7.svg","adff8bf774c3df04b0d4bbb3fbebf6b1"],["/RoyalGameOfUr/static/media/beige_marker_highlighted.2d89b7e9.svg","2d89b7e9494664672d89da0c63ccfc2e"],["/RoyalGameOfUr/static/media/diceone.350eba77.svg","350eba7702db2ec8f05d593f0ca7b68b"],["/RoyalGameOfUr/static/media/dicezero.a7106055.svg","a710605574bc9f6064deee31a3e318a8"],["/RoyalGameOfUr/static/media/flower.2cb2c287.svg","2cb2c28748a951b4e766263bc9ac881f"],["/RoyalGameOfUr/static/media/grey_finish.5fad4c26.svg","5fad4c264892fd3bb6f8bdfb6e3e8f35"],["/RoyalGameOfUr/static/media/grey_marker.19104f78.svg","19104f7868a9c43c990a82e2cddc7d71"],["/RoyalGameOfUr/static/media/grey_marker_highlighted.9f4f2ba3.svg","9f4f2ba3aa2a394434d9430bcaa5e892"],["/RoyalGameOfUr/static/media/player_route.87b581e2.PNG","87b581e2e0cc03924aad5741d04dc062"],["/RoyalGameOfUr/static/media/roll_dice_button.b377a005.svg","b377a005884c5b14beb35fac9eb0311f"],["/RoyalGameOfUr/static/media/roll_dice_button_hover.4b094924.svg","4b0949249fe4047f139f18ea96be14a7"],["/RoyalGameOfUr/static/media/stoneonstone.6f279720.mp3","6f27972061e00ee1d3c5e9c8b4fc5162"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,r){var n=new URL(e);return r&&n.pathname.match(r)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],r=new URL(a,self.location),n=createCacheKey(r,hashParamName,t,/\.\w{8}\./);return[r.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(r){return setOfCachedUrls(r).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return r.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),r="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,r),e=urlsToCacheKeys.has(t));var n="/RoyalGameOfUr/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});