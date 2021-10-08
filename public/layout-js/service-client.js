const publicVapidKey = 'BKSvI5uBdeTlwHEewdR5CbYq58kFk5EgFRqgiT89wzcTfRHy-pwW4U0ho1OXWkhgQKgL_9dxgF2GDAGKqsD1G2g';

if ('serviceWorker' in navigator) {
    // setInterval(() => {
    //     run().catch(error => console.log(error));
    // }, 5000);

    if (!true) run().catch(error => console.log(error));
}

async function run() {
    const registration = await navigator.serviceWorker.
        register('/layout-js/service-worker.js');

    const subscription = await registration.pushManager.
        subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

    await fetch('/wp-api/hyper_web_push', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
}

// Boilerplate borrowed from https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
