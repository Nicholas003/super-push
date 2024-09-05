
self.addEventListener('install', function (event) {

  // self.skipWaiting();

});

self.addEventListener('push', function (event) {
    console.log('222',event.data.json())
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        url: data.url,
        icon: data.icon,
        data:data.data
      })
    );

});

self.addEventListener('notificationclick', function (event) {

  console.log('notificationclick',event)
  event.notification.close();
  
  clients.openWindow(event.notification.data.url||'/');

})