/**
 * Dashboard Admin - Gestion des données
 */

(function() {
  'use strict';

  // Clés de stockage
  const STORAGE_KEYS = {
    visits: 'admin_visits',
    devis: 'admin_devis',
    products: 'admin_products',
    photos: 'admin_photos',
    activities: 'admin_activities'
  };

  // Initialiser les données
  initializeData();
  loadDashboardData();

  /**
   * Initialiser les données si elles n'existent pas
   */
  function initializeData() {
    // Visites
    if (!localStorage.getItem(STORAGE_KEYS.visits)) {
      const visits = {
        total: 0,
        daily: {},
        pages: {}
      };
      localStorage.setItem(STORAGE_KEYS.visits, JSON.stringify(visits));
    }

    // Devis
    if (!localStorage.getItem(STORAGE_KEYS.devis)) {
      localStorage.setItem(STORAGE_KEYS.devis, JSON.stringify([]));
    }

    // Produits
    if (!localStorage.getItem(STORAGE_KEYS.products)) {
      const products = [
        { id: 1, name: 'Canapé Bois Noble', price: 450000, category: 'Salon', image: 'Canapé Bois Noble.jpg' },
        { id: 2, name: 'Table Artisanale', price: 380000, category: 'Salon', image: 'Table Artisanale.jpg' },
        { id: 3, name: 'Lit Moderne', price: 520000, category: 'Chambre', image: 'Lit Moderne.jpg' }
      ];
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
    }

    // Photos
    if (!localStorage.getItem(STORAGE_KEYS.photos)) {
      localStorage.setItem(STORAGE_KEYS.photos, JSON.stringify([]));
    }

    // Activités
    if (!localStorage.getItem(STORAGE_KEYS.activities)) {
      const activities = [
        { date: new Date().toISOString(), action: 'Connexion administrateur', user: 'admin' }
      ];
      localStorage.setItem(STORAGE_KEYS.activities, JSON.stringify(activities));
    }
  }

  /**
   * Charger les données du dashboard
   */
  function loadDashboardData() {
    // Charger les statistiques
    loadStatistics();
    
    // Charger les activités récentes
    loadRecentActivities();
    
    // Charger les demandes en attente
    loadPendingRequests();
  }

  /**
   * Charger les statistiques
   */
  async function loadStatistics() {
    try {
      // Charger depuis l'API
      const response = await EvoraAPI.StatsAPI.getDashboard();
      const stats = response.data.stats_globales;
      
      // Afficher les stats
      document.getElementById('totalVisits').textContent = stats.total_visites.toLocaleString('fr-FR');
      document.getElementById('totalDevis').textContent = stats.total_devis;
      document.getElementById('totalProducts').textContent = stats.total_produits;
      document.getElementById('totalPhotos').textContent = stats.total_photos;

    } catch (error) {
      console.error('Erreur API, utilisation localStorage:', error);
      
      // Fallback localStorage
      const visits = JSON.parse(localStorage.getItem(STORAGE_KEYS.visits) || '{"total":0}');
      document.getElementById('totalVisits').textContent = visits.total.toLocaleString('fr-FR');

      const devis = JSON.parse(localStorage.getItem(STORAGE_KEYS.devis) || '[]');
      document.getElementById('totalDevis').textContent = devis.length;

      const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.products) || '[]');
      document.getElementById('totalProducts').textContent = products.length;

      const photos = JSON.parse(localStorage.getItem(STORAGE_KEYS.photos) || '[]');
      document.getElementById('totalPhotos').textContent = photos.length;
    }
  }

  /**
   * Charger les activités récentes
   */
  function loadRecentActivities() {
    try {
      const activities = JSON.parse(localStorage.getItem(STORAGE_KEYS.activities) || '[]');
      const container = document.getElementById('recentActivities');

      if (activities.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">Aucune activité récente</p>';
        return;
      }

      // Afficher les 5 dernières activités
      const recentActivities = activities.slice(-5).reverse();
      
      container.innerHTML = recentActivities.map(activity => {
        const date = new Date(activity.date);
        const timeAgo = getTimeAgo(date);

        return `
          <div class="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div class="flex-1">
              <p class="text-sm text-gray-800">${activity.action}</p>
              <p class="text-xs text-gray-500">${timeAgo}</p>
            </div>
          </div>
        `;
      }).join('');

    } catch (error) {
      console.error('Erreur lors du chargement des activités:', error);
    }
  }

  /**
   * Charger les demandes en attente
   */
  function loadPendingRequests() {
    try {
      const devis = JSON.parse(localStorage.getItem(STORAGE_KEYS.devis) || '[]');
      const container = document.getElementById('pendingRequests');

      // Filtrer les demandes en attente
      const pending = devis.filter(d => d.status === 'pending' || !d.status);

      if (pending.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">Aucune demande en attente</p>';
        return;
      }

      // Afficher les 5 premières demandes
      const recentPending = pending.slice(0, 5);

      container.innerHTML = recentPending.map(request => {
        const date = new Date(request.date);
        const timeAgo = getTimeAgo(date);

        return `
          <div class="flex items-start justify-between pb-3 border-b border-gray-100 last:border-0">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-800">${request.nom}</p>
              <p class="text-xs text-gray-500">${request.typeMeuble} - ${timeAgo}</p>
            </div>
            <a href="devis-list.html" class="text-blue-600 hover:text-blue-700 text-sm">Voir</a>
          </div>
        `;
      }).join('');

    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
    }
  }

  /**
   * Calculer le temps écoulé
   */
  function getTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days}j`;
    return date.toLocaleDateString('fr-FR');
  }

  /**
   * Enregistrer une visite (à appeler depuis le site principal)
   */
  window.trackVisit = async function(page) {
    try {
      // Enregistrer via l'API
      await EvoraAPI.StatsAPI.trackVisit(page);
      
      // Fallback localStorage
      const visits = JSON.parse(localStorage.getItem(STORAGE_KEYS.visits) || '{"total":0,"daily":{},"pages":{}}');
      visits.total++;
      const today = new Date().toISOString().split('T')[0];
      visits.daily[today] = (visits.daily[today] || 0) + 1;
      visits.pages[page] = (visits.pages[page] || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.visits, JSON.stringify(visits));
      
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la visite:', error);
      
      // Fallback localStorage uniquement
      const visits = JSON.parse(localStorage.getItem(STORAGE_KEYS.visits) || '{"total":0,"daily":{},"pages":{}}');
      visits.total++;
      const today = new Date().toISOString().split('T')[0];
      visits.daily[today] = (visits.daily[today] || 0) + 1;
      visits.pages[page] = (visits.pages[page] || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.visits, JSON.stringify(visits));
    }
  };

  /**
   * Enregistrer une activité
   */
  window.logActivity = function(action, user = 'admin') {
    try {
      const activities = JSON.parse(localStorage.getItem(STORAGE_KEYS.activities) || '[]');
      
      activities.push({
        date: new Date().toISOString(),
        action: action,
        user: user
      });

      // Garder seulement les 100 dernières activités
      if (activities.length > 100) {
        activities.splice(0, activities.length - 100);
      }

      localStorage.setItem(STORAGE_KEYS.activities, JSON.stringify(activities));
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'activité:', error);
    }
  };

})();
