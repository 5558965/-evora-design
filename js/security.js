/**
 * Module de Sécurité - EVORA DESIGN
 * CAPTCHA Anti-Spam + Sauvegardes Automatiques
 */

// ========== CAPTCHA ANTI-SPAM ==========
let captchaResult = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    const questionEl = document.getElementById('captchaQuestion');
    if (questionEl) {
        questionEl.textContent = `${num1} ${operation} ${num2}`;
    }
    
    // Calculer le résultat
    switch(operation) {
        case '+': captchaResult = num1 + num2; break;
        case '-': captchaResult = num1 - num2; break;
        case '×': captchaResult = num1 * num2; break;
    }
    
    const answerEl = document.getElementById('captchaAnswer');
    if (answerEl) {
        answerEl.value = '';
    }
}

// Rendre la fonction globale
window.generateCaptcha = generateCaptcha;

// ========== SAUVEGARDES AUTOMATIQUES ==========
(function() {
    'use strict';
    
    const BACKUP_KEY = 'evora_backup';
    const BACKUP_INTERVAL = 30 * 60 * 1000; // 30 minutes
    
    // Fonction de sauvegarde
    function createBackup() {
        try {
            const backup = {
                timestamp: new Date().toISOString(),
                products: localStorage.getItem('evora_products'),
                cart: localStorage.getItem('evoradesign_cart'),
                devis: localStorage.getItem('admin_devis'),
                visits: localStorage.getItem('admin_visits')
            };
            
            // Sauvegarder
            localStorage.setItem(BACKUP_KEY, JSON.stringify(backup));
            console.log('✅ Sauvegarde automatique créée:', new Date().toLocaleString());
            
            // Garder aussi un historique des 5 dernières sauvegardes
            const history = JSON.parse(localStorage.getItem(BACKUP_KEY + '_history') || '[]');
            history.push(backup);
            if (history.length > 5) history.shift(); // Garder seulement les 5 dernières
            localStorage.setItem(BACKUP_KEY + '_history', JSON.stringify(history));
            
        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde:', error);
        }
    }
    
    // Fonction de restauration
    window.restoreBackup = function() {
        try {
            const backup = JSON.parse(localStorage.getItem(BACKUP_KEY));
            if (!backup) {
                alert('Aucune sauvegarde disponible');
                return;
            }
            
            if (confirm(`Restaurer la sauvegarde du ${new Date(backup.timestamp).toLocaleString()} ?`)) {
                if (backup.products) localStorage.setItem('evora_products', backup.products);
                if (backup.cart) localStorage.setItem('evoradesign_cart', backup.cart);
                if (backup.devis) localStorage.setItem('admin_devis', backup.devis);
                if (backup.visits) localStorage.setItem('admin_visits', backup.visits);
                
                alert('✅ Sauvegarde restaurée avec succès !');
                location.reload();
            }
        } catch (error) {
            alert('❌ Erreur lors de la restauration: ' + error.message);
        }
    };
    
    // Exporter les sauvegardes
    window.exportBackup = function() {
        try {
            const backup = JSON.parse(localStorage.getItem(BACKUP_KEY));
            if (!backup) {
                alert('Aucune sauvegarde disponible');
                return;
            }
            
            const dataStr = JSON.stringify(backup, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `evora-backup-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);
            
            alert('✅ Sauvegarde exportée avec succès !');
        } catch (error) {
            alert('❌ Erreur lors de l\'export: ' + error.message);
        }
    };
    
    // Créer une sauvegarde au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createBackup);
    } else {
        createBackup();
    }
    
    // Sauvegardes automatiques toutes les 30 minutes
    setInterval(createBackup, BACKUP_INTERVAL);
    
    // Sauvegarde avant de quitter la page
    window.addEventListener('beforeunload', createBackup);
    
})();

// ========== INITIALISATION CAPTCHA ==========
document.addEventListener('DOMContentLoaded', function() {
    // Générer le CAPTCHA
    generateCaptcha();
    
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('section[style*="background-color: #1e3a8a"] form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Vérifier le CAPTCHA
            const userAnswer = parseInt(document.getElementById('captchaAnswer').value);
            if (userAnswer !== captchaResult) {
                alert('❌ Erreur : La réponse au CAPTCHA est incorrecte. Veuillez réessayer.');
                generateCaptcha();
                return;
            }
            
            // Si CAPTCHA correct, envoyer le message
            alert('✅ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
            contactForm.reset();
            generateCaptcha();
        });
    }
});
