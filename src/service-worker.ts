/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import * as navigationPreload from 'workbox-navigation-preload'
import { clientsClaim, setCacheNameDetails } from 'workbox-core'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkOnly,
} from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

clientsClaim()

// Precache all of the assets generated by the build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in the service worker file.
precacheAndRoute(self.__WB_MANIFEST)

// // Set up App Shell-style routing, so that all navigation requests
// // are fulfilled with the index.html shell.
// const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$')
// registerRoute(
//   // Return false to exempt requests from being fulfilled by index.html.
//   ({ request, url }: { request: Request; url: URL }) => {
//     // If this isn't a navigation, skip.
//     if (request.mode !== 'navigate') {
//       return false
//     }

//     // If this is a URL that starts with /_, skip.
//     if (url.pathname.startsWith('/_')) {
//       return false
//     }

//     // If this looks like a URL for a resource, because it contains
//     // a file extension, skip.
//     if (url.pathname.match(fileExtensionRegexp)) {
//       return false
//     }

//     // Return true to signal that we want to use the handler.
//     return true
//   },
//   createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
// )

setCacheNameDetails({
  prefix: 'pf-app',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime',
})

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({ type: 'SKIP_WAITING' })
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
)

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

navigationPreload.enable()

const networkOnly = new NetworkOnly()
const navigationHandler = async (params) => {
  try {
    // Attempt a network request.
    return await networkOnly.handle(params)
  } catch (error) {
    // If it fails, return the cached HTML.
    return caches.match('/offline', {
      cacheName: 'offline',
    })
  }
}

// Register this strategy to handle all navigations.
registerRoute(new NavigationRoute(navigationHandler))
