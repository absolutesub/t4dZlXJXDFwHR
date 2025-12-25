/**
 * ABSOLUTE FANSUB - REGISTRO DO SERVICE WORKER
 * Registra e gerencia o service worker para PWA
 */

(function() {
    'use strict';

    /**
     * Registra o service worker
     */
    async function registerServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            console.log('Service Worker não suportado neste navegador');
            return;
        }

        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });

            console.log('✅ Service Worker registrado com sucesso:', registration.scope);

            // Verifica atualizações
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                console.log('🔄 Nova versão do Service Worker encontrada');

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // Nova versão disponível
                        showUpdateNotification(registration);
                    }
                });
            });

            // Recarrega quando novo service worker assume controle
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('🔄 Service Worker atualizado');
                window.location.reload();
            });

        } catch (error) {
            console.error('❌ Erro ao registrar Service Worker:', error);
        }
    }

    /**
     * Mostra notificação de atualização disponível
     */
    function showUpdateNotification(registration) {
        if (window.AbsoluteUtils) {
            // Cria notificação customizada
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #1997d3;
                color: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10001;
                max-width: 350px;
                font-family: "Poppins", sans-serif;
            `;
            
            notification.innerHTML = `
                <div style="font-size: 16px; font-weight: 600; margin-bottom: 10px;">
                    🎉 Nova versão disponível!
                </div>
                <div style="font-size: 14px; margin-bottom: 15px; opacity: 0.9;">
                    Uma nova versão do site está disponível. Clique em atualizar para obter as últimas melhorias.
                </div>
                <div style="display: flex; gap: 10px;">
                    <button onclick="updateServiceWorker()" style="
                        flex: 1;
                        padding: 8px 16px;
                        background: white;
                        color: #1997d3;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: 600;
                        font-family: inherit;
                    ">
                        Atualizar Agora
                    </button>
                    <button onclick="this.closest('div[style*=fixed]').remove()" style="
                        padding: 8px 16px;
                        background: rgba(255,255,255,0.2);
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-family: inherit;
                    ">
                        Depois
                    </button>
                </div>
            `;

            document.body.appendChild(notification);

            // Função global para atualizar
            window.updateServiceWorker = () => {
                const waiting = registration.waiting;
                if (waiting) {
                    waiting.postMessage({ type: 'SKIP_WAITING' });
                    waiting.addEventListener('statechange', (e) => {
                        if (e.target.state === 'activated') {
                            window.location.reload();
                        }
                    });
                }
            };
        }
    }

    /**
     * Verifica se está online/offline
     */
    function setupOnlineOfflineHandlers() {
        window.addEventListener('online', () => {
            console.log('🌐 Conexão restaurada');
            
            // Tenta sincronizar dados
            if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
                navigator.serviceWorker.ready.then((registration) => {
                    return registration.sync.register('sync-data');
                }).catch((error) => {
                    console.log('Sync registration failed:', error);
                });
            }
        });

        window.addEventListener('offline', () => {
            console.log('📡 Conexão perdida - Modo offline');
        });
    }

    /**
     * Pre-cache de páginas importantes
     */
    function precacheImportantPages() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.controller?.postMessage({
                type: 'CACHE_URLS',
                urls: [
                    '/anime.html',
                    '/projetos.html',
                    '/equipe.html'
                ]
            });
        }
    }

    /**
     * Limpa cache antigo (útil para debug)
     */
    window.clearAppCache = async function() {
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            
            for (const registration of registrations) {
                await registration.unregister();
            }

            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
            }

            console.log('🧹 Cache limpo com sucesso');
            window.location.reload();
        }
    };

    /**
     * Verifica suporte a notificações push
     */
    async function checkPushNotificationSupport() {
        if (!('PushManager' in window)) {
            console.log('Push notifications não suportadas');
            return;
        }

        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            
            if (subscription) {
                console.log('✅ Push notifications ativadas');
            } else {
                console.log('ℹ️ Push notifications disponíveis mas não ativadas');
            }
        }
    }

    /**
     * Solicita permissão para notificações (opcional)
     */
    window.requestPushNotifications = async function() {
        if (!('PushManager' in window)) {
            alert('Notificações push não são suportadas neste navegador.');
            return;
        }

        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
            console.log('✅ Permissão para notificações concedida');
            
            const registration = await navigator.serviceWorker.ready;
            
            // Aqui você configuraria a subscrição push com seu servidor
            // Por enquanto, apenas registramos a capacidade
            
            if (window.AbsoluteUtils) {
                window.AbsoluteUtils.showNotification('Notificações ativadas!', 'success');
            }
        } else {
            console.log('❌ Permissão para notificações negada');
        }
    };

    /**
     * Mostra informações sobre PWA
     */
    window.showPWAInfo = function() {
        const info = `
📱 INFORMAÇÕES PWA

✅ Service Worker: ${('serviceWorker' in navigator) ? 'Suportado' : 'Não suportado'}
✅ Cache API: ${('caches' in window) ? 'Suportado' : 'Não suportado'}
✅ Push API: ${('PushManager' in window) ? 'Suportado' : 'Não suportado'}
✅ Notifications: ${('Notification' in window) ? 'Suportado' : 'Não suportado'}
✅ Background Sync: ${('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) ? 'Suportado' : 'Não suportado'}

Status: ${navigator.onLine ? '🌐 Online' : '📡 Offline'}

Para limpar cache: clearAppCache()
Para ativar notificações: requestPushNotifications()
        `.trim();

        console.log(info);
        alert(info);
    };

    // ==================== INICIALIZAÇÃO ====================

    // Registra service worker quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerServiceWorker);
    } else {
        registerServiceWorker();
    }

    // Setup de handlers
    setupOnlineOfflineHandlers();

    // Pre-cache após 5 segundos
    setTimeout(precacheImportantPages, 5000);

    // Verifica suporte a push
    setTimeout(checkPushNotificationSupport, 3000);

    // Log de status
    console.log('🚀 PWA Manager inicializado');
    console.log('💡 Digite showPWAInfo() no console para ver informações');

})();
