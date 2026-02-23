/**
 * Optimisation des Performances - EVORA DESIGN
 * Lazy Loading, Compression, Cache
 */

(function() {
    'use strict';

    // ========== LAZY LOADING IMAGES ==========
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Charger l'image
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        
                        // Ajouter classe loaded
                        img.classList.add('loaded');
                        
                        // Arrêter d'observer
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px', // Charger 50px avant d'être visible
                threshold: 0.01
            });

            // Observer toutes les images avec loading="lazy"
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // ========== PRELOAD CRITICAL RESOURCES ==========
    function preloadCriticalResources() {
        // Précharger les images critiques (hero, logo)
        const criticalImages = [
            'Images/evora.png',
            'Images/presentation.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // ========== DEFER NON-CRITICAL CSS ==========
    function deferNonCriticalCSS() {
        const loadCSS = (href) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
            document.head.appendChild(link);
        };

        // Charger les polices de manière asynchrone
        // (déjà fait avec display=swap dans le HTML)
    }

    // ========== COMPRESSION LOCALSTORAGE ==========
    function compressLocalStorage() {
        try {
            // Vérifier la taille du localStorage
            let totalSize = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length + key.length;
                }
            }

            // Si > 4MB, nettoyer les anciennes données
            if (totalSize > 4 * 1024 * 1024) {
                console.warn('⚠️ localStorage proche de la limite, nettoyage...');
                
                // Supprimer les anciennes sauvegardes
                const backupHistory = JSON.parse(localStorage.getItem('evora_backup_history') || '[]');
                if (backupHistory.length > 2) {
                    backupHistory.splice(0, backupHistory.length - 2);
                    localStorage.setItem('evora_backup_history', JSON.stringify(backupHistory));
                }
            }
        } catch (error) {
            console.error('Erreur compression localStorage:', error);
        }
    }

    // ========== CACHE API (Service Worker Ready) ==========
    function initCacheStrategy() {
        // Préparer pour un futur Service Worker
        if ('serviceWorker' in navigator) {
            // Service Worker sera ajouté plus tard
            console.log('✅ Service Worker supporté');
        }
    }

    // ========== PERFORMANCE MONITORING ==========
    function monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const connectTime = perfData.responseEnd - perfData.requestStart;
                    const renderTime = perfData.domComplete - perfData.domLoading;

                    console.log('📊 Performance Metrics:');
                    console.log(`  ⏱️ Temps de chargement total: ${(pageLoadTime / 1000).toFixed(2)}s`);
                    console.log(`  🌐 Temps de connexion: ${(connectTime / 1000).toFixed(2)}s`);
                    console.log(`  🎨 Temps de rendu: ${(renderTime / 1000).toFixed(2)}s`);

                    // Alerte si > 3 secondes
                    if (pageLoadTime > 3000) {
                        console.warn('⚠️ Temps de chargement > 3s, optimisation recommandée');
                    } else {
                        console.log('✅ Performance optimale (< 3s)');
                    }
                }, 0);
            });
        }
    }

    // ========== RESPONSIVE IMAGES ==========
    function optimizeImages() {
        // Ajouter srcset pour images responsives
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('srcset') && img.src) {
                // Marquer pour optimisation future
                img.setAttribute('data-optimize', 'true');
            }
        });
    }

    // ========== REDUCE REFLOWS ==========
    function optimizeDOM() {
        // Utiliser requestAnimationFrame pour les animations
        window.requestAnimationFrame = window.requestAnimationFrame || 
                                       window.mozRequestAnimationFrame || 
                                       window.webkitRequestAnimationFrame || 
                                       window.msRequestAnimationFrame ||
                                       function(callback) { setTimeout(callback, 16); };
    }

    // ========== INITIALISATION ==========
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('🚀 Optimisation des performances...');
        
        initLazyLoading();
        preloadCriticalResources();
        deferNonCriticalCSS();
        compressLocalStorage();
        initCacheStrategy();
        monitorPerformance();
        optimizeImages();
        optimizeDOM();
        
        console.log('✅ Optimisations appliquées');
    }

    // Export pour utilisation externe
    window.EvoraPerformance = {
        monitorPerformance,
        compressLocalStorage
    };

})();
