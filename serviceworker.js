const CACHE_NAME = "VERSION-1";
const urlsToCache = [ 'index.html', 'offline.html'];
const self = this;
//install sw
self.addEventListener('install', (event) =>{
     event.waitUntil(
         caches.open(CACHE_NAME)
         .then((cache) =>{
             console.log('Open cache');

            return cache.addAll(urlsToCache)
         })
     )
});
//listen to request
self.addEventListener('fetch', (event)=> {
     event.respondWith(
         caches.match(event.request)
         .then(()=>{
             return fetch(event.request)
             .catch(()=> caches.match('offline.html'))
         })

     )
});
//active the sw 
self.addEventListener('activate', (event)=> {
     const cachewhitelist =[]
     cachewhitelist.push(CACHE_NAME);

     event.waitUntil(
         caches.keys()
         .then((cacheNames)=>Promise.all(
             cacheNames.map((cacheNames)=>{
                 if(!cachewhitelist.includes(cacheNames)){
                     return caches.delete(cacheNames)
                 }
             })
         ))
     )
});