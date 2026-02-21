/**
 * Gestion des demandes de devis
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'admin_devis';
  
  // Charger les devis
  loadDevis();

  // Événements
  document.getElementById('filterStatus').addEventListener('change', loadDevis);
  document.getElementById('searchInput').addEventListener('input', loadDevis);
  document.getElementById('closeModal').addEventListener('click', closeModal);

  /**
   * Charger et afficher les devis
   */
  async function loadDevis() {
    try {
      // Charger depuis l'API
      const filterStatus = document.getElementById('filterStatus').value;
      const searchTerm = document.getElementById('searchInput').value;
      
      const filters = {};
      if (filterStatus !== 'all') {
        filters.statut = filterStatus;
      }
      if (searchTerm) {
        filters.search = searchTerm;
      }
      
      const response = await EvoraAPI.DevisAPI.getAll(filters);
      let devis = response.records || [];
      
      // Fallback localStorage si API échoue
      if (devis.length === 0) {
        devis = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        
        // Filtrer par statut
        if (filterStatus !== 'all') {
          devis = devis.filter(d => (d.status || 'pending') === filterStatus);
        }

        // Recherche
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          devis = devis.filter(d => 
            d.nom.toLowerCase().includes(term) ||
            d.email.toLowerCase().includes(term) ||
            d.typeMeuble.toLowerCase().includes(term)
          );
        }
      }

      // Afficher
      displayDevis(devis);

    } catch (error) {
      console.error('Erreur lors du chargement des devis:', error);
      
      // Fallback localStorage
      let devis = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const filterStatus = document.getElementById('filterStatus').value;
      const searchTerm = document.getElementById('searchInput').value.toLowerCase();
      
      if (filterStatus !== 'all') {
        devis = devis.filter(d => (d.status || 'pending') === filterStatus);
      }
      if (searchTerm) {
        devis = devis.filter(d => 
          d.nom.toLowerCase().includes(searchTerm) ||
          d.email.toLowerCase().includes(searchTerm) ||
          d.typeMeuble.toLowerCase().includes(searchTerm)
        );
      }
      
      displayDevis(devis);
    }
  }

  /**
   * Afficher les devis dans le tableau
   */
  function displayDevis(devis) {
    const tbody = document.getElementById('devisTableBody');

    if (devis.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-gray-500">
            Aucune demande de devis trouvée
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = devis.map((d, index) => {
      const date = new Date(d.date).toLocaleDateString('fr-FR');
      const status = d.status || 'pending';
      const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processed: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
      };
      const statusLabels = {
        pending: 'En attente',
        processed: 'Traité',
        rejected: 'Rejeté'
      };

      return `
        <tr class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 text-sm text-gray-700">${date}</td>
          <td class="px-6 py-4 text-sm font-medium text-gray-800">${d.nom}</td>
          <td class="px-6 py-4 text-sm text-gray-700">${d.typeMeuble}</td>
          <td class="px-6 py-4 text-sm text-gray-700">
            <div>${d.telephone}</div>
            <div class="text-xs text-gray-500">${d.email}</div>
          </td>
          <td class="px-6 py-4">
            <span class="px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}">
              ${statusLabels[status]}
            </span>
          </td>
          <td class="px-6 py-4">
            <div class="flex gap-2">
              <button onclick="viewDetails(${index})" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir
              </button>
              <button onclick="updateStatus(${index}, 'processed')" class="text-green-600 hover:text-green-700 text-sm font-medium">
                Traiter
              </button>
              <button onclick="deleteDevis(${index})" class="text-red-600 hover:text-red-700 text-sm font-medium">
                Supprimer
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Voir les détails d'un devis
   */
  window.viewDetails = function(index) {
    try {
      const devis = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const d = devis[index];

      if (!d) return;

      const modalContent = document.getElementById('modalContent');
      modalContent.innerHTML = `
        <div class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Nom complet</label>
              <p class="text-gray-800">${d.nom}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Téléphone</label>
              <p class="text-gray-800"><a href="tel:${d.telephone}" class="text-blue-600 hover:underline">${d.telephone}</a></p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <p class="text-gray-800"><a href="mailto:${d.email}" class="text-blue-600 hover:underline">${d.email}</a></p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Type de meuble</label>
              <p class="text-gray-800">${d.typeMeuble}</p>
            </div>
            ${d.budget ? `
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Budget</label>
              <p class="text-gray-800">${d.budget}</p>
            </div>
            ` : ''}
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Date de demande</label>
              <p class="text-gray-800">${new Date(d.date).toLocaleString('fr-FR')}</p>
            </div>
          </div>
          ${d.description ? `
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Description du projet</label>
            <p class="text-gray-800 bg-gray-50 p-4 rounded-lg">${d.description}</p>
          </div>
          ` : ''}
          <div class="flex gap-3 pt-4">
            <button onclick="updateStatus(${index}, 'processed')" class="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
              Marquer comme traité
            </button>
            <button onclick="updateStatus(${index}, 'rejected')" class="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition">
              Rejeter
            </button>
          </div>
        </div>
      `;

      document.getElementById('detailsModal').classList.remove('hidden');

    } catch (error) {
      console.error('Erreur lors de l\'affichage des détails:', error);
    }
  };

  /**
   * Mettre à jour le statut d'un devis
   */
  window.updateStatus = async function(index, status) {
    try {
      const devis = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      if (devis[index]) {
        const devisId = devis[index].id;
        
        // Mettre à jour via l'API
        try {
          await EvoraAPI.DevisAPI.update(devisId, { statut: status });
        } catch (apiError) {
          console.warn('Erreur API, mise à jour locale uniquement:', apiError);
        }
        
        // Mettre à jour localStorage
        devis[index].status = status;
        devis[index].updatedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(devis));
        
        // Log l'activité
        if (window.logActivity) {
          window.logActivity(`Devis ${status === 'processed' ? 'traité' : 'rejeté'}: ${devis[index].nom}`);
        }
        
        closeModal();
        loadDevis();
        
        alert('Statut mis à jour avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  /**
   * Supprimer un devis
   */
  window.deleteDevis = function(index) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      return;
    }

    try {
      const devis = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const deleted = devis.splice(index, 1)[0];
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(devis));
      
      // Log l'activité
      if (window.logActivity) {
        window.logActivity(`Devis supprimé: ${deleted.nom}`);
      }
      
      loadDevis();
      alert('Demande supprimée avec succès');
      
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  /**
   * Fermer le modal
   */
  function closeModal() {
    document.getElementById('detailsModal').classList.add('hidden');
  }

})();
