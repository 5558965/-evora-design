/**
 * Protection des pages admin - EVORA DESIGN
 * Ce script vérifie que l'utilisateur est authentifié
 */

(function() {
    'use strict';

    // Vérifier si l'utilisateur est connecté
    function checkAuth() {
        const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
        const loginTime = sessionStorage.getItem('loginTime');
        const currentPage = window.location.pathname.split('/').pop();

        // Si on est sur la page de login, ne rien faire
        if (currentPage === 'login.html') {
            // Si déjà connecté, rediriger vers le dashboard
            if (isLoggedIn === 'true') {
                window.location.href = 'dashboard.html';
            }
            return;
        }

        // Vérifier si connecté
        if (isLoggedIn !== 'true') {
            // Rediriger vers la page de login
            window.location.href = 'login.html';
            return;
        }

        // Vérifier l'expiration de la session (4 heures)
        if (loginTime) {
            const fourHours = 4 * 60 * 60 * 1000; // 4 heures en millisecondes
            const elapsed = Date.now() - parseInt(loginTime);
            
            if (elapsed > fourHours) {
                // Session expirée
                logout();
                return;
            }
        }

        // Mettre à jour le temps d'activité
        sessionStorage.setItem('lastActivity', Date.now());
    }

    // Fonction de déconnexion
    function logout() {
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUsername');
        sessionStorage.removeItem('loginTime');
        sessionStorage.removeItem('lastActivity');
        window.location.href = 'login.html';
    }

    // Ajouter un bouton de déconnexion si on est sur une page admin
    function addLogoutButton() {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'login.html') return;

        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addLogoutButtonToPage);
        } else {
            addLogoutButtonToPage();
        }
    }

    function addLogoutButtonToPage() {
        // Chercher le lien de déconnexion existant
        const logoutLinks = document.querySelectorAll('a[href="login.html"]');
        
        logoutLinks.forEach(link => {
            // Vérifier si c'est un lien de déconnexion
            if (link.textContent.includes('Déconnexion') || link.querySelector('.fa-sign-out-alt')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
                        logout();
                    }
                });
            }
        });
    }

    // Vérifier l'authentification au chargement
    checkAuth();
    addLogoutButton();

    // Exporter la fonction logout pour utilisation globale
    window.adminLogout = logout;

    // Vérifier périodiquement l'activité (toutes les 5 minutes)
    setInterval(function() {
        const lastActivity = sessionStorage.getItem('lastActivity');
        if (lastActivity) {
            const thirtyMinutes = 30 * 60 * 1000; // 30 minutes
            const elapsed = Date.now() - parseInt(lastActivity);
            
            if (elapsed > thirtyMinutes) {
                alert('Session expirée pour inactivité');
                logout();
            }
        }
    }, 5 * 60 * 1000); // Vérifier toutes les 5 minutes

})();
