# 📘 Guide Complet - EVORA DESIGN

## 🎯 Vue d'ensemble du système

EVORA DESIGN est un système e-commerce complet avec :
- ✅ Frontend moderne (HTML/CSS/JS)
- ✅ Base de données MySQL
- ✅ API Backend PHP
- ✅ Système d'administration
- ✅ Tracking et statistiques
- ✅ **Intégration complète frontend-backend**

## 🎉 NOUVEAU : Intégration Complète

Le système est maintenant **100% intégré** :
- ✅ Les devis sont enregistrés dans MySQL
- ✅ Les statistiques sont chargées depuis MySQL
- ✅ Le tracking des visites est automatique
- ✅ L'admin gère les données depuis MySQL
- ✅ Fallback localStorage en cas d'erreur API

**Voir :** `INTEGRATION_API.md` pour les détails

## 📁 Structure complète du projet

```
evora-design/
├── index.html                  # Page d'accueil
├── panier.html                 # Panier d'achat
├── commande.html               # Page de commande
├── confirmation.html           # Confirmation commande
├── devis.html                  # Formulaire de devis
├── test-api.html              # Page de test API
├── style.css                   # Styles CSS
├── script.js                   # JavaScript principal
│
├── js/
│   └── api-client.js          # Client API (Frontend ↔ Backend)
│
├── images/                     # Images du site
│
├── admin/                      # Back-office
│   ├── login.html             # Connexion admin
│   ├── dashboard.html         # Tableau de bord
│   ├── devis-list.html        # Gestion des devis
│   ├── admin-auth.js          # Authentification
│   ├── admin-dashboard.js     # Logique dashboard
│   ├── devis-manager.js       # Gestion devis
│   └── README_ADMIN.md        # Doc admin
│
├── api/                        # API Backend PHP
│   ├── config/
│   │   ├── database.php       # Configuration BDD
│   │   └── cors.php           # Configuration CORS
│   ├── models/
│   │   └── Devis.php          # Modèle Devis
│   ├── devis/
│   │   ├── create.php         # Créer devis
│   │   ├── read.php           # Lire devis
│   │   └── update.php         # Mettre à jour devis
│   ├── stats/
│   │   ├── dashboard.php      # Stats dashboard
│   │   └── track-visit.php    # Tracking visites
│   └── .htaccess              # Configuration Apache
│
└── database/
    ├── evora_design.sql       # Script SQL complet
    └── INSTALLATION.md        # Guide d'installation
```

## 🚀 Installation Rapide

### Étape 1 : Base de données

```bash
# Via MySQL CLI
mysql -u root -p < database/evora_design.sql

# Ou via phpMyAdmin : Importer evora_design.sql
```

### Étape 2 : Configuration API

Éditez `api/config/database.php` :

```php
private $host = "localhost";
private $db_name = "evora_design";
private $username = "root";          // Votre user MySQL
private $password = "";              // Votre password MySQL
```

### Étape 3 : Configuration Frontend

Éditez `js/api-client.js` ligne 10 :

```javascript
const API_BASE_URL = 'http://localhost/evora-design/api';
// Remplacez par votre URL
```

### Étape 4 : Test

Ouvrez `test-api.html` dans votre navigateur et testez tous les endpoints.

## 🔐 Accès Admin

**URL :** `admin/login.html`

**Identifiants par défaut :**
- Username : `admin`
- Password : `evora2026`

⚠️ **À CHANGER EN PRODUCTION !**

## 📊 Fonctionnalités Complètes

### Frontend (Site Public)

1. **Page d'accueil**
   - Catalogue de 15 produits
   - Galerie d'inspirations
   - Formulaire de contact
   - Footer professionnel

2. **Système de panier**
   - Ajout multiple d'articles
   - Aperçu au survol
   - Calcul automatique
   - Persistance localStorage

3. **Page de commande**
   - 4 moyens de paiement
   - Validation complète
   - Intégration WhatsApp

4. **Demande de devis**
   - Formulaire en 2 étapes
   - Barre de progression
   - **Enregistrement en BDD**

### Backend (API PHP)

1. **Endpoints Devis**
   - `POST /api/devis/create.php`
   - `GET /api/devis/read.php`
   - `PUT /api/devis/update.php`
   - `DELETE /api/devis/delete.php`

2. **Endpoints Statistiques**
   - `GET /api/stats/dashboard.php`
   - `POST /api/stats/track-visit.php`

3. **Sécurité**
   - Protection CORS
   - Validation des données
   - Préparation des requêtes (PDO)
   - Protection contre les injections SQL

### Base de Données MySQL

1. **12 Tables**
   - admins, categories, produits
   - devis, commandes, galerie
   - visites, activites, parametres

2. **3 Vues SQL**
   - stats_globales
   - visites_par_jour
   - produits_populaires

3. **2 Procédures stockées**
   - enregistrer_visite()
   - creer_commande()

4. **Triggers automatiques**
   - Incrémentation des vues
   - Mise à jour timestamps

### Administration

1. **Dashboard**
   - Statistiques en temps réel
   - Activités récentes
   - Demandes en attente

2. **Gestion des devis**
   - Liste complète
   - Filtres et recherche
   - Statuts (Pending, Processed, Rejected)
   - Modal de détails

3. **Tracking**
   - Visites par page
   - Visites par jour
   - Journal d'activités

## 🔄 Flux de Données

### Création d'un devis

```
Frontend (devis.html)
    ↓
JavaScript (api-client.js)
    ↓
API PHP (api/devis/create.php)
    ↓
Modèle (api/models/Devis.php)
    ↓
Base de données MySQL (table devis)
    ↓
Réponse JSON
    ↓
Frontend (confirmation)
```

### Consultation des stats

```
Admin Dashboard
    ↓
JavaScript (admin-dashboard.js)
    ↓
API PHP (api/stats/dashboard.php)
    ↓
Vue SQL (stats_globales)
    ↓
Base de données MySQL
    ↓
Réponse JSON
    ↓
Affichage dans le dashboard
```

## 🛠️ Utilisation de l'API

### Exemple 1 : Créer un devis

```javascript
const devisData = {
    nom: 'Jean Dupont',
    email: 'jean@example.com',
    telephone: '+225 07 00 00 00 00',
    type_meuble: 'Dressing',
    budget: '500k-1m',
    description: 'Description du projet...'
};

EvoraAPI.DevisAPI.create(devisData)
    .then(response => {
        console.log('Devis créé:', response.id);
        alert('Votre demande a été envoyée !');
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'envoi');
    });
```

### Exemple 2 : Charger les statistiques

```javascript
EvoraAPI.StatsAPI.getDashboard()
    .then(response => {
        const stats = response.data.stats_globales;
        
        document.getElementById('totalVisits').textContent = 
            stats.total_visites;
        document.getElementById('totalDevis').textContent = 
            stats.total_devis;
        document.getElementById('totalProducts').textContent = 
            stats.total_produits;
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
```

### Exemple 3 : Lire les devis

```javascript
// Tous les devis
EvoraAPI.DevisAPI.getAll()
    .then(response => {
        console.log(`${response.total} devis trouvés`);
        response.records.forEach(devis => {
            console.log(devis.nom, devis.statut);
        });
    });

// Filtrer par statut
EvoraAPI.DevisAPI.getAll({ statut: 'pending' })
    .then(response => {
        console.log('Devis en attente:', response.records);
    });

// Recherche
EvoraAPI.DevisAPI.search('Jean')
    .then(response => {
        console.log('Résultats:', response.records);
    });
```

## 🔒 Sécurité Production

### Checklist de sécurité

- [ ] Changer les identifiants MySQL
- [ ] Changer le mot de passe admin
- [ ] Activer HTTPS
- [ ] Restreindre CORS (remplacer `*` par votre domaine)
- [ ] Configurer les sauvegardes automatiques
- [ ] Activer les logs d'erreur
- [ ] Limiter les tentatives de connexion
- [ ] Valider toutes les entrées utilisateur
- [ ] Utiliser des tokens JWT pour l'authentification
- [ ] Configurer un pare-feu

### Commandes de sécurité

```sql
-- Changer le mot de passe admin
UPDATE admins 
SET password = '$2y$10$NOUVEAU_HASH' 
WHERE username = 'admin';

-- Créer un utilisateur MySQL dédié
CREATE USER 'evora_user'@'localhost' IDENTIFIED BY 'mot_de_passe_fort';
GRANT SELECT, INSERT, UPDATE, DELETE ON evora_design.* TO 'evora_user'@'localhost';
FLUSH PRIVILEGES;
```

## 📈 Optimisation

### Performance

1. **Activer le cache**
   - Cache des requêtes MySQL
   - Cache PHP (OPcache)
   - Cache navigateur

2. **Optimiser les images**
   - Compression
   - Formats modernes (WebP)
   - Lazy loading

3. **Minifier les ressources**
   - CSS minifié
   - JavaScript minifié
   - Compression Gzip

### Monitoring

1. **Logs à surveiller**
   - Erreurs PHP (`error_log`)
   - Erreurs MySQL (`mysql-error.log`)
   - Accès Apache (`access.log`)

2. **Métriques importantes**
   - Temps de réponse API
   - Nombre de requêtes/seconde
   - Utilisation CPU/RAM
   - Espace disque

## 🐛 Dépannage

### Problème : API ne répond pas

**Solutions :**
1. Vérifier que MySQL est démarré
2. Vérifier les identifiants dans `api/config/database.php`
3. Vérifier l'URL dans `js/api-client.js`
4. Consulter les logs PHP

### Problème : CORS Error

**Solutions :**
1. Vérifier `api/config/cors.php`
2. Vérifier `.htaccess`
3. Tester avec `curl` pour isoler le problème

### Problème : Devis non enregistrés

**Solutions :**
1. Vérifier la connexion BDD
2. Vérifier les permissions MySQL
3. Consulter les logs d'erreur
4. Tester avec `test-api.html`

## 📞 Support

**EVORA DESIGN**
- Email : contact@evoradesign.ci
- Téléphone : +225 07 48 65 51 20
- WhatsApp : +225 07 48 65 51 20

## 📚 Documentation

- `README.md` - Vue d'ensemble
- `database/INSTALLATION.md` - Installation BDD et API
- `admin/README_ADMIN.md` - Documentation admin
- `GUIDE_COMPLET.md` - Ce guide

---

© 2026 EVORA DESIGN - Tous droits réservés
