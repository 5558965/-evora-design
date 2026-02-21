/**
 * Client API pour EVORA DESIGN
 * Gestion des appels vers le backend PHP
 */

(function() {
    'use strict';

    // Configuration de l'API
    const API_BASE_URL = 'http://localhost/evora-design/api'; // À adapter selon votre configuration

    /**
     * Classe APIClient
     */
    class APIClient {
        
        /**
         * Requête HTTP générique
         */
        static async request(endpoint, options = {}) {
            const url = `${API_BASE_URL}${endpoint}`;
            
            const defaultOptions = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const config = { ...defaultOptions, ...options };

            try {
                const response = await fetch(url, config);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Erreur API');
                }

                return data;
            } catch (error) {
                console.error('Erreur API:', error);
                throw error;
            }
        }

        /**
         * GET request
         */
        static async get(endpoint, params = {}) {
            const queryString = new URLSearchParams(params).toString();
            const url = queryString ? `${endpoint}?${queryString}` : endpoint;
            
            return this.request(url, {
                method: 'GET',
            });
        }

        /**
         * POST request
         */
        static async post(endpoint, data) {
            return this.request(endpoint, {
                method: 'POST',
                body: JSON.stringify(data),
            });
        }

        /**
         * PUT request
         */
        static async put(endpoint, data) {
            return this.request(endpoint, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
        }

        /**
         * DELETE request
         */
        static async delete(endpoint) {
            return this.request(endpoint, {
                method: 'DELETE',
            });
        }
    }

    /**
     * API Devis
     */
    class DevisAPI {
        
        /**
         * Créer un devis
         */
        static async create(devisData) {
            return APIClient.post('/devis/create.php', devisData);
        }

        /**
         * Lire les devis
         */
        static async getAll(filters = {}) {
            return APIClient.get('/devis/read.php', filters);
        }

        /**
         * Lire un devis
         */
        static async getOne(id) {
            return APIClient.get('/devis/read.php', { id });
        }

        /**
         * Mettre à jour un devis
         */
        static async update(id, data) {
            return APIClient.put('/devis/update.php', { id, ...data });
        }

        /**
         * Supprimer un devis
         */
        static async delete(id) {
            return APIClient.delete(`/devis/delete.php?id=${id}`);
        }

        /**
         * Rechercher des devis
         */
        static async search(term) {
            return APIClient.get('/devis/read.php', { search: term });
        }
    }

    /**
     * API Statistiques
     */
    class StatsAPI {
        
        /**
         * Obtenir les stats du dashboard
         */
        static async getDashboard() {
            return APIClient.get('/stats/dashboard.php');
        }

        /**
         * Enregistrer une visite
         */
        static async trackVisit(page) {
            return APIClient.post('/stats/track-visit.php', { page });
        }
    }

    /**
     * API Produits
     */
    class ProduitsAPI {
        
        /**
         * Lire tous les produits
         */
        static async getAll(filters = {}) {
            return APIClient.get('/produits/read.php', filters);
        }

        /**
         * Lire un produit
         */
        static async getOne(id) {
            return APIClient.get('/produits/read.php', { id });
        }

        /**
         * Créer un produit
         */
        static async create(produitData) {
            return APIClient.post('/produits/create.php', produitData);
        }

        /**
         * Mettre à jour un produit
         */
        static async update(id, data) {
            return APIClient.put('/produits/update.php', { id, ...data });
        }

        /**
         * Supprimer un produit
         */
        static async delete(id) {
            return APIClient.delete(`/produits/delete.php?id=${id}`);
        }
    }

    /**
     * Tracking automatique des visites
     */
    function initTracking() {
        // Désactivé temporairement - utiliser localStorage uniquement
        console.log('Tracking API désactivé - mode localStorage');
        /*
        // Enregistrer la visite de la page actuelle
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        StatsAPI.trackVisit(currentPage)
            .then(() => console.log('Visite enregistrée'))
            .catch(error => console.error('Erreur tracking:', error));
        */
    }

    /**
     * Initialisation au chargement de la page
     */
    // Désactivé pour éviter les erreurs CORS
    /*
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTracking);
    } else {
        initTracking();
    }
    */

    // Export global
    window.EvoraAPI = {
        APIClient,
        DevisAPI,
        StatsAPI,
        ProduitsAPI
    };

})();
