import mitt from 'mitt'
import { ref } from 'vue';

export function requestNotificationPermission() {
    // console.log('Notification' in window && navigator.serviceWorker)
    if ('Notification' in window && navigator.serviceWorker) {
        return Notification.requestPermission(function (status) {
            console.log('Notification permission status:', status);

            if (status === 'granted') {
                // subscribeToPushNotifications();

                return true
            }
        });
    }
    return Promise.reject(false)
}
export function subscribeToPushNotifications(publicKey: string) {


    return navigator.serviceWorker.ready.then(function (registration) {
        return registration.pushManager.getSubscription().then(function (subscription) {

            return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey)
            }).then(function (subscription) {
                // console.log('成功订阅了推送服务，Endpoint:', subscription.endpoint);
                console.log('成功', JSON.stringify(subscription));
                return subscription
            })
        });
    });

}


export function urlBase64ToUint8Array(base64String: string) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

type busType = {
    push: any
}

export const bus = mitt<busType>()

export const useSwitch = (initState: boolean) => {

    const state = ref(initState)

    const open = () => {
        state.value = true
    }
    const close = () => {
        state.value = false
    }
    return [
        state,
        open,
        close
    ] as const
}