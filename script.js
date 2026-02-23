/**
 * EVORA DESIGN - Script Principal
 * Gestion du panier et interactions utilisateur
 */

(function() {
    'use strict';

    // =========================
    // CONSTANTES
    // =========================
    const STORAGE_KEY = 'evoradesign_cart';
    const ANIMATION_DURATION = 300;

    // =========================
    // UTILITAIRES
    // =========================
    const Utils = {
        /**
         * Récupère un élément du DOM de manière sécurisée
         */
        getElement(selector) {
            return document.querySelector(selector);
        },

        /**
         * Récupère plusieurs éléments du DOM
         */
        getElements(selector) {
            return document.querySelectorAll(selector);
        },

        /**
         * Affiche une notification toast
         */
        showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#10b981' : '#ef4444'};
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                z-index: 9999;
                animation: slideIn 0.3s ease-out;
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), ANIMATION_DURATION);
            }, 3000);
        },

        /**
         * Valide les données du localStorage
         */
        isValidCartData(data) {
            return Array.isArray(data) && data.every(item => 
                item.name && typeof item.price === 'number'
            );
        }
    };

    // =========================
    // GESTION DU PANIER
    // =========================
    const CartManager = {
        cart: [],

        /**
         * Initialise le panier depuis le localStorage
         */
        init() {
            try {
                const storedCart = localStorage.getItem(STORAGE_KEY);
                if (storedCart) {
                    const parsedCart = JSON.parse(storedCart);
                    this.cart = Utils.isValidCartData(parsedCart) ? parsedCart : [];
                }
            } catch (error) {
                console.error('Erreur lors du chargement du panier:', error);
                this.cart = [];
            }
            this.updateDisplay();
        },

        /**
         * Ajoute un produit au panier
         */
        addItem(name, price) {
            if (!name || typeof price !== 'number') {
                console.error('Données invalides pour l\'ajout au panier');
                return false;
            }

            try {
                this.cart.push({ name, price, id: Date.now() });
                this.save();
                this.updateDisplay();
                
                // Animation du bouton panier
                const cartBtn = Utils.getElement('#cartBtn');
                if (cartBtn) {
                    cartBtn.classList.add('cart-pulse');
                    setTimeout(() => cartBtn.classList.remove('cart-pulse'), 600);
                }
                
                Utils.showNotification(`${name} ajouté au panier !`, 'success');
                return true;
            } catch (error) {
                console.error('Erreur lors de l\'ajout au panier:', error);
                Utils.showNotification('Erreur lors de l\'ajout', 'error');
                return false;
            }
        },

        /**
         * Supprime un produit du panier
         */
        removeItem(id) {
            this.cart = this.cart.filter(item => item.id !== id);
            this.save();
            this.updateDisplay();
            Utils.showNotification('Produit retiré du panier', 'success');
        },

        /**
         * Vide le panier
         */
        clear() {
            this.cart = [];
            this.save();
            this.updateDisplay();
        },

        /**
         * Sauvegarde le panier dans le localStorage
         */
        save() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cart));
            } catch (error) {
                console.error('Erreur lors de la sauvegarde du panier:', error);
                Utils.showNotification('Erreur de sauvegarde', 'error');
            }
        },

        /**
         * Met à jour l'affichage du compteur
         */
        updateDisplay() {
            const cartCount = Utils.getElement('#cartCount');
            const cartBtn = Utils.getElement('#cartBtn');
            
            if (cartCount) {
                cartCount.textContent = this.cart.length;
                cartCount.setAttribute('aria-label', `${this.cart.length} article(s) dans le panier`);
            }
            
            // Ajouter une classe visuelle si le panier contient des articles
            if (cartBtn) {
                if (this.cart.length > 0) {
                    cartBtn.classList.add('has-items');
                } else {
                    cartBtn.classList.remove('has-items');
                }
            }
            
            // Mettre à jour l'aperçu du panier
            this.updatePreview();
        },

        /**
         * Met à jour l'aperçu du panier
         */
        updatePreview() {
            const previewItems = Utils.getElement('#cartPreviewItems');
            const previewTotal = Utils.getElement('#cartPreviewTotal');
            
            if (!previewItems || !previewTotal) return;
            
            if (this.cart.length === 0) {
                previewItems.innerHTML = '<div class="cart-preview-empty">Votre panier est vide</div>';
                previewTotal.textContent = '0 FCFA';
                return;
            }
            
            previewItems.innerHTML = this.cart.map(item => `
                <div class="cart-preview-item">
                    <span class="cart-preview-item-name">${item.name}</span>
                    <span class="cart-preview-item-price">${item.price.toLocaleString('fr-FR')} FCFA</span>
                </div>
            `).join('');
            
            const total = this.getTotal();
            previewTotal.textContent = `${total.toLocaleString('fr-FR')} FCFA`;
        },

        /**
         * Calcule le total du panier
         */
        getTotal() {
            return this.cart.reduce((total, item) => total + item.price, 0);
        }
    };

    // =========================
    // GESTION DES IMAGES LAZY LOADING
    // =========================
    const LazyLoader = {
        init() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src || img.src;
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    });
                });

                Utils.getElements('img[loading="lazy"]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        }
    };

    // =========================
    // GESTION DU SMOOTH SCROLL
    // =========================
    const SmoothScroll = {
        init() {
            Utils.getElements('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;

                    const target = Utils.getElement(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    // =========================
    // GESTION DES PRODUITS DYNAMIQUES
    // =========================
    const ProductManager = {
        /**
         * Charger les produits depuis localStorage
         */
        loadProducts() {
            try {
                const stored = localStorage.getItem('evora_products');
                if (stored) {
                    return JSON.parse(stored);
                }
            } catch (error) {
                console.error('Erreur chargement produits:', error);
            }
            return [];
        },

        /**
         * Afficher les produits dans la section boutique
         */
        displayProducts() {
            console.log('=== ProductManager.displayProducts() appelé ===');
            const products = this.loadProducts();
            
            // Trouver la section boutique et son conteneur grid
            const boutiqueSection = Utils.getElement('#boutique');
            console.log('Section #boutique:', boutiqueSection ? 'TROUVÉE' : 'NON TROUVÉE');
            if (!boutiqueSection) {
                console.error('Section boutique non trouvée');
                return;
            }
            
            // Essayer plusieurs sélecteurs pour trouver le grid
            let gridContainer = boutiqueSection.querySelector('.container .grid');
            console.log('Tentative 1 (.container .grid):', gridContainer ? 'TROUVÉ' : 'NON TROUVÉ');
            
            if (!gridContainer) {
                gridContainer = boutiqueSection.querySelector('.grid');
                console.log('Tentative 2 (.grid):', gridContainer ? 'TROUVÉ' : 'NON TROUVÉ');
            }
            
            if (!gridContainer) {
                gridContainer = boutiqueSection.querySelector('div.grid');
                console.log('Tentative 3 (div.grid):', gridContainer ? 'TROUVÉ' : 'NON TROUVÉ');
            }
            
            if (!gridContainer) {
                console.error('Conteneur grid non trouvé après toutes les tentatives');
                console.log('HTML de la section:', boutiqueSection.innerHTML.substring(0, 200));
                return;
            }

            console.log('✅ Grid container trouvé!');
            console.log('Produits chargés:', products.length);
            
            if (products.length === 0) {
                console.log('Aucun produit dans localStorage, produits par défaut conservés');
                return; // Garder les produits par défaut si aucun produit admin
            }

            // Filtrer uniquement les produits actifs avec stock
            const activeProducts = products.filter(p => {
                const isActive = p.status === 'actif';
                const hasStock = p.stock > 0;
                console.log(`  Produit: ${p.name} - Status: ${p.status} (${isActive?'✅':'❌'}) - Stock: ${p.stock} (${hasStock?'✅':'❌'})`);
                return isActive && hasStock;
            });

            console.log('Produits actifs avec stock:', activeProducts.length);

            if (activeProducts.length === 0) {
                console.log('Aucun produit actif, produits par défaut conservés');
                return; // Garder les produits par défaut
            }

            // Afficher TOUS les produits actifs (pas de limite)
            const displayProducts = activeProducts;
            
            console.log('📺 Affichage de', displayProducts.length, 'produits');
            
            gridContainer.innerHTML = displayProducts.map(product => {
                // Corriger le chemin de l'image (enlever ../ si présent)
                let imagePath = product.image;
                // Si c'est une image Base64, la garder telle quelle
                if (!imagePath.startsWith('data:')) {
                    if (imagePath.startsWith('../')) {
                        imagePath = imagePath.substring(3); // Enlever '../'
                    }
                }
                console.log(`  Image: ${product.image} → ${imagePath}`);
                
                return `
                <div class="bg-[#F5F1EB] rounded-xl shadow-lg overflow-hidden card-hover">
                    <img src="${imagePath}" class="w-full h-64 object-cover" alt="${product.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23f5f1eb%22/%3E%3Ctext x=%22200%22 y=%22150%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%236b4f3a%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EImage non disponible%3C/text%3E%3C/svg%3E'">
                    <div class="p-6">
                        <h3 class="text-xl mb-2">${product.name}</h3>
                        ${product.description ? `<p class="text-gray-600 text-sm mb-2">${product.description}</p>` : ''}
                        <p class="text-[#6b4f3a] font-bold mb-4">${product.price.toLocaleString('fr-FR')} FCFA</p>
                        <button class="btn-primary w-full text-center add-to-cart" 
                                data-name="${product.name}" 
                                data-price="${product.price}" 
                                aria-label="Ajouter ${product.name} au panier">
                            Ajouter au panier
                        </button>
                    </div>
                </div>
                `;
            }).join('');

            console.log('✅ Produits affichés avec succès!');
            console.log('HTML généré, longueur:', gridContainer.innerHTML.length);

            // Réattacher les événements aux nouveaux boutons
            Utils.getElements('.add-to-cart').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const name = this.dataset.name;
                    const price = parseInt(this.dataset.price, 10);
                    
                    this.classList.add('btn-added');
                    setTimeout(() => this.classList.remove('btn-added'), 1000);
                    
                    CartManager.addItem(name, price);
                });
            });
        }
    };

    // =========================
    // INITIALISATION
    // =========================
    document.addEventListener('DOMContentLoaded', function() {
        // Initialisation du panier
        CartManager.init();

        // Charger et afficher les produits dynamiques
        ProductManager.displayProducts();

        // Gestion des boutons d'ajout au panier (pour les produits HTML statiques)
        // Les produits dynamiques ont leurs événements attachés dans ProductManager.displayProducts()
        Utils.getElements('.add-to-cart').forEach(button => {
            // Vérifier si l'événement n'est pas déjà attaché
            if (!button.hasAttribute('data-event-attached')) {
                button.setAttribute('data-event-attached', 'true');
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const name = this.dataset.name;
                    const price = parseInt(this.dataset.price, 10);
                    
                    // Animation du bouton
                    this.classList.add('btn-added');
                    setTimeout(() => this.classList.remove('btn-added'), 1000);
                    
                    CartManager.addItem(name, price);
                });
            }
        });

        // Gestion du bouton panier (clic direct sans délai)
        const cartBtn = Utils.getElement('#cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', function() {
                window.location.href = 'panier.html';
            });
        }

        // Gestion de l'aperçu du panier (hover)
        const cartPreview = Utils.getElement('#cartPreview');
        if (cartBtn && cartPreview) {
            let hideTimeout;
            
            cartBtn.addEventListener('mouseenter', function() {
                clearTimeout(hideTimeout);
                cartPreview.classList.remove('hidden');
            });
            
            cartBtn.addEventListener('mouseleave', function() {
                hideTimeout = setTimeout(() => {
                    cartPreview.classList.add('hidden');
                }, 300);
            });
            
            cartPreview.addEventListener('mouseenter', function() {
                clearTimeout(hideTimeout);
            });
            
            cartPreview.addEventListener('mouseleave', function() {
                cartPreview.classList.add('hidden');
            });
        }

        // Initialisation du lazy loading
        LazyLoader.init();

        // Initialisation du smooth scroll
        SmoothScroll.init();

        // Ajout des styles d'animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            @keyframes checkmark {
                0% { transform: scale(0) rotate(45deg); }
                50% { transform: scale(1.2) rotate(45deg); }
                100% { transform: scale(1) rotate(45deg); }
            }
            .cart-pulse {
                animation: pulse 0.6s ease-in-out;
            }
            .btn-added {
                background-color: #10b981 !important;
                position: relative;
            }
            .btn-added::after {
                content: '✓';
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 20px;
                animation: checkmark 0.4s ease-out;
            }
        `;
        document.head.appendChild(style);
    });

    // Export pour utilisation dans d'autres scripts
    window.EvoraDesign = {
        CartManager,
        Utils
    };

    // Tracking des visites pour l'admin
    trackPageVisit();

    function trackPageVisit() {
        try {
            const visits = JSON.parse(localStorage.getItem('admin_visits') || '{"total":0,"daily":{},"pages":{}}');
            
            // Incrémenter le total
            visits.total++;

            // Enregistrer par jour
            const today = new Date().toISOString().split('T')[0];
            visits.daily[today] = (visits.daily[today] || 0) + 1;

            // Enregistrer par page
            const page = window.location.pathname.split('/').pop() || 'index.html';
            visits.pages[page] = (visits.pages[page] || 0) + 1;

            localStorage.setItem('admin_visits', JSON.stringify(visits));
        } catch (error) {
            console.error('Erreur tracking:', error);
        }
    }

})();
