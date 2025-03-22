
importScripts('./localforage.min.js')

self.addEventListener('install', function (event) {

  // self.skipWaiting();

});

const storageKey = 'pushList'

localforage.setDriver([localforage.WEBSQL, localforage.INDEXEDDB])

self.addEventListener('push', function (event) {
  console.log('222', event, clients)
  const data = event.data.json();
  // localforage.setItem('pushList',data)
  localforage.getItem(storageKey).then((res) => {
    console.log('res', res)
    const list = res || []
    list.unshift(data)
    localforage.setItem(storageKey, list)
  })
    .then(() => {
      clients.matchAll({
        type: "window",
      }).then((clientList) => {
        console.log(clientList)
        clientList[0].postMessage(data)
      })
    })




  // console.log('push',data)
  // self.registration.active.postMessage(data);
  // clients.active.postMessage(data);
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      url: data.url,
      icon: data.icon,
      data: data.data
    })
  );

});

self.addEventListener('notificationclick', function (event) {

  console.log('notificationclick', event, location)
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        if (clientList.length) {
          clientList[0].focus()
        } else {
          clients.openWindow("/")
        }
        // for (const client of clientList) {
        //   console.log(client)
        //   if (client.url === "/" && "focus" in client) return client.focus();
        // }
        // if (clients.openWindow) return clients.openWindow("/");
      }),
  );

  // clients.openWindow('/');

})