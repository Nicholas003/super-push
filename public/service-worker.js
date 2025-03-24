
importScripts('./localforage.min.js')

const storageKey = 'pushList'

localforage.setDriver([localforage.WEBSQL, localforage.INDEXEDDB])

self.addEventListener('push', function (event) {
  const data = event.data.json();
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
      }),
  );

})