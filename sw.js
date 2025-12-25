/**
 * ABSOLUTE FANSUB - SERVICE WORKER
 * Cache de assets e funcionalidade offline
 * @version 1.0.0
 */

const CACHE_NAME = 'absolute-fansub-v1.0.0';
const RUNTIME_CACHE = 'absolute-runtime';

// Assets para cache na instalação
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/styledn.css',
    '/css/improvements.css',
    '/js/utils.js',
    '/js/favorites.js',
    '/js/theme-toggle.js',
    '/js/ux-improvements.js',
    '/js/loading.js',
    '/js/header.js',
    '/js/footer.js',
    '/data.js',
    '/img/assets/loadinglogo.png',
    '/img/assets/favicon.ico',
    '/img/assets/bg.jpg'
];

// ==================== INSTALAÇÃO ====================

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Pre-caching assets');
                return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, {cache: 'reload'})));
            })
            .then(() => self.skipWaiting())
            .catch((error) => {
                console.error('[Service Worker] Pre-cache failed:', error);
            })
    );
});

// ==================== ATIVAÇÃO ====================

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Ativando...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                        console.log('[Service Worker] Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// ==================== FETCH ====================

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignora requisições não-GET
    if (request.method !== 'GET') return;

    // Ignora requisições externas (Google Forms, Analytics, etc.)
    if (url.origin !== location.origin) {
        return;
    }

    // Estratégia: Cache First para assets, Network First para HTML
    if (request.destination === 'document') {
        // Network First para páginas HTML
        event.respondWith(networkFirst(request));
    } else if (
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'image'
    ) {
        // Cache First para assets estáticos
        event.respondWith(cacheFirst(request));
    } else {
        // Stale While Revalidate para outros recursos
        event.respondWith(staleWhileRevalidate(request));
    }
});

// ==================== ESTRATÉGIAS DE CACHE ====================

/**
 * Cache First: Tenta cache primeiro, depois network
 */
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(request);
        
        // Adiciona ao cache se response for válida
        if (response && response.status === 200) {
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        console.error('[Service Worker] Fetch failed:', error);
        
        // Retorna página offline se disponível
        return caches.match('/offline.html');
    }
}

/**
 * Network First: Tenta network primeiro, depois cache
 */
async function networkFirst(request) {
    const cache = await caches.open(RUNTIME_CACHE);

    try {
        const response = await fetch(request);
        
        // Atualiza cache com nova versão
        if (response && response.status === 200) {
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        console.error('[Service Worker] Network failed, trying cache:', error);
        
        const cached = await cache.match(request);
        return cached || caches.match('/offline.html');
    }
}

/**
 * Stale While Revalidate: Retorna cache imediatamente e atualiza em background
 */
async function staleWhileRevalidate(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(request);

    // Fetch em background e atualiza cache
    const fetchPromise = fetch(request).then((response) => {
        if (response && response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    });

    // Retorna cache imediatamente se disponível
    return cached || fetchPromise;
}

// ==================== MENSAGENS ====================

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        const { urls } = event.data;
        caches.open(RUNTIME_CACHE).then((cache) => {
            cache.addAll(urls);
        });
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => caches.delete(cacheName))
            );
        }).then(() => {
            event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
        });
    }
});

// ==================== SYNC BACKGROUND ====================

self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);
    
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

async function syncData() {
    try {
        // Sincroniza dados quando online
        console.log('[Service Worker] Syncing data...');
        // Implementar lógica de sincronização se necessário
    } catch (error) {
        console.error('[Service Worker] Sync failed:', error);
    }
}

// ==================== NOTIFICAÇÕES PUSH (PREPARAÇÃO) ====================

self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push received:', event);
    
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Absolute Fansub';
    const options = {
        body: data.body || 'Nova atualização disponível!',
        icon: '/img/assets/favicon.ico',
        badge: '/img/assets/badge.png',
        data: data.url || '/',
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification clicked');
    
    event.notification.close();
    
    const urlToOpen = event.notification.data || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                // Verifica se já existe uma janela aberta
                for (let client of windowClients) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Abre nova janela se não existir
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

console.log('[Service Worker] Loaded successfully');
