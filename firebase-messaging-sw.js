importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDsf4bzIHvtI-D9FkBY5ImYf9E7cmZc9R8",
  authDomain: "bb-staff.firebaseapp.com",
  databaseURL: "https://bb-staff-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "bb-staff",
  storageBucket: "bb-staff.firebasestorage.app",
  messagingSenderId: "799545974014",
  appId: "1:799545974014:web:dbb2dbfd44e53cedbbd9af"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notification = payload.notification || {};
  self.registration.showNotification(notification.title || 'Beaconblitz Staff', {
    body: notification.body || 'You have a new update.',
    icon: notification.icon || 'icon-192.png',
    badge: 'icon-192.png',
    data: payload.data || {}
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/staff/'));
});
