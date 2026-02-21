# ✅ Intégration API Complète - EVORA DESIGN

## 🎉 État de l'intégration

L'intégration entre le frontend et le backend est maintenant **COMPLÈTE** !

## 📋 Ce qui a été fait

### 1. ✅ Client API JavaScript (`js/api-client.js`)
- Client API complet avec méthodes GET, POST, PUT, DELETE
- Classes dédiées : `DevisAPI`, `StatsAPI`, `ProduitsAPI`
- Tracking automatique des visites sur toutes les pages
- Gestion d'erreurs robuste

### 2. ✅ Intégration Frontend

#### Pages modifiées :
- ✅ `index.html` - Script API ajouté
- ✅ `panier.html` - Script API ajouté
- ✅ `devis.html` - Enregistrement des devis via API
- ✅ `commande.html` - Script API ajouté
- ✅ `confirmation.html` - Script API ajouté

#### Pages admin modifiées :
- ✅ `admin/dashboard.html` - Chargement stats via API
- ✅ `admin/devis-list.html` - Lecture devis via API
- ✅ `admin/admin-dashboard.js` - Intégration API stats
- ✅ `admin/devis-manager.js` - CRUD devis via API

### 3. ✅ Fonctionnalités implémentées

#### Tracking automatique
```javascript
// Automatique sur toutes les pages
EvoraAPI.StatsAPI.trackVisit(currentPage)
```

#### Création de devis
```javascript
// Dans devis.html
EvoraAPI.DevisAPI.create(devisData)
  .then(response => {
    console.log('Devis créé:', response.id);
  });
```

#### Chargement des statistiques
```javascript
// Dans admin/dashboard.html
EvoraAPI.StatsAPI.getDashboard()
  .then(response => {
    const stats = response.data.stats_globales;
    // Affichage des stats
  });
```

#### Gestion des devis
```javascript
// Lire tous les devis
EvoraAPI.DevisAPI.getAll()

// Filtrer par statut
EvoraAPI.DevisAPI.getAll({ statut: 'pending' })

// Rechercher
EvoraAPI.DevisAPI.search('Jean')

// Mettre à jour
EvoraAPI.DevisAPI.update(id, { statut: 'processed' })
```

### 4. ✅ Fallback localStorage

Toutes les fonctions ont un **fallback localStorage** :
- Si l'API échoue, le système utilise localStorage
- Garantit la continuité du service
- Permet de tester sans serveur

## 🚀 Installation et Configuration

### Étape 1 : Base de données MySQL

```bash
mysql -u root -p < database/evora_design.sql
```

### Étape 2 : Configuration API

Éditez `api/config/database.php` :

```php
private $host = "localhost";
private $db_name = "evora_design";
private $username = "root";          // Votre utilisateur MySQL
private $password = "";              // Votre mot de passe MySQL
```

### Étape 3 : Configuration Frontend

Éditez `js/api-client.js` ligne 10 :

```javascript
const API_BASE_URL = 'http://localhost/evora-design/api';
// Remplacez par votre URL réelle
```

### Étape 4 : Test

1. Ouvrez `test-api.html` dans votre navigateur
2. Testez tous les endpoints
3. Vérifiez les réponses dans la console

## 🧪 Tests à effectuer

### Test 1 : Création de devis
1. Allez sur `devis.html`
2. Remplissez le formulaire
3. Soumettez
4. Vérifiez dans `admin/devis-list.html`
5. Vérifiez dans la table MySQL `devis`

### Test 2 : Statistiques
1. Connectez-vous à `admin/login.html`
2. Allez sur `admin/dashboard.html`
3. Vérifiez que les stats s'affichent
4. Naviguez sur plusieurs pages du site
5. Rechargez le dashboard, les visites doivent augmenter

### Test 3 : Gestion des devis
1. Allez sur `admin/devis-list.html`
2. Vérifiez que les devis s'affichent
3. Cliquez sur "Voir" pour voir les détails
4. Changez le statut d'un devis
5. Vérifiez dans la BDD que le statut a changé

### Test 4 : Recherche et filtres
1. Sur `admin/devis-list.html`
2. Utilisez le filtre de statut
3. Utilisez la barre de recherche
4. Vérifiez que les résultats sont corrects

## 📊 Flux de données

### Création d'un devis

```
Utilisateur remplit formulaire (devis.html)
    ↓
JavaScript capture la soumission
    ↓
EvoraAPI.DevisAPI.create(data)
    ↓
Requête POST vers api/devis/create.php
    ↓
Validation des données
    ↓
Insertion dans MySQL (table devis)
    ↓
Réponse JSON avec ID du devis
    ↓
Confirmation à l'utilisateur
    ↓
Redirection WhatsApp
```

### Consultation des statistiques

```
Admin ouvre dashboard.html
    ↓
admin-dashboard.js s'exécute
    ↓
EvoraAPI.StatsAPI.getDashboard()
    ↓
Requête GET vers api/stats/dashboard.php
    ↓
Requête SQL vers vue stats_globales
    ↓
Agrégation des données
    ↓
Réponse JSON avec toutes les stats
    ↓
Affichage dans le dashboard
```

## 🔒 Sécurité

### Implémenté
- ✅ Validation des données côté serveur
- ✅ Requêtes préparées (PDO) contre injection SQL
- ✅ Configuration CORS
- ✅ Gestion d'erreurs
- ✅ Authentification admin (session 24h)

### À faire en production
- [ ] Activer HTTPS
- [ ] Restreindre CORS à votre domaine
- [ ] Changer les identifiants MySQL
- [ ] Changer le mot de passe admin
- [ ] Ajouter rate limiting
- [ ] Ajouter tokens JWT pour l'API
- [ ] Configurer les sauvegardes automatiques

## 🐛 Dépannage

### Problème : API ne répond pas

**Vérifications :**
1. MySQL est démarré ?
2. Identifiants corrects dans `api/config/database.php` ?
3. URL correcte dans `js/api-client.js` ?
4. Serveur web (Apache/Nginx) démarré ?

**Test :**
```bash
# Tester directement l'endpoint
curl http://localhost/evora-design/api/stats/dashboard.php
```

### Problème : CORS Error

**Solution :**
1. Vérifiez que `api/config/cors.php` est inclus
2. Vérifiez le fichier `.htaccess`
3. Redémarrez Apache

### Problème : Devis non enregistrés

**Vérifications :**
1. Console navigateur : erreurs JavaScript ?
2. Console PHP : erreurs dans `error_log` ?
3. Permissions MySQL correctes ?
4. Table `devis` existe ?

**Test :**
```javascript
// Dans la console du navigateur
EvoraAPI.DevisAPI.create({
  nom: 'Test',
  email: 'test@test.com',
  telephone: '0700000000',
  type_meuble: 'Test'
}).then(console.log).catch(console.error);
```

### Problème : Stats ne s'affichent pas

**Vérifications :**
1. Données existent dans la BDD ?
2. Vue `stats_globales` créée ?
3. Console navigateur : erreurs ?

**Test SQL :**
```sql
SELECT * FROM stats_globales;
```

## 📈 Prochaines étapes

### Endpoints à créer

1. **Produits**
   - `GET /api/produits/read.php` ✅ (structure prête)
   - `POST /api/produits/create.php`
   - `PUT /api/produits/update.php`
   - `DELETE /api/produits/delete.php`

2. **Catégories**
   - `GET /api/categories/read.php`
   - `POST /api/categories/create.php`
   - `PUT /api/categories/update.php`
   - `DELETE /api/categories/delete.php`

3. **Galerie**
   - `GET /api/galerie/read.php`
   - `POST /api/galerie/upload.php`
   - `DELETE /api/galerie/delete.php`

4. **Commandes**
   - `POST /api/commandes/create.php`
   - `GET /api/commandes/read.php`
   - `PUT /api/commandes/update.php`

### Améliorations possibles

1. **Cache**
   - Implémenter un cache Redis
   - Cache des statistiques (5 minutes)
   - Cache des produits

2. **Optimisation**
   - Pagination des résultats
   - Lazy loading des images
   - Compression des réponses

3. **Monitoring**
   - Logs structurés
   - Alertes email
   - Dashboard de monitoring

4. **Tests**
   - Tests unitaires PHP (PHPUnit)
   - Tests d'intégration
   - Tests E2E (Cypress)

## 📞 Support

**EVORA DESIGN**
- Email : contact@evoradesign.ci
- Téléphone : +225 07 48 65 51 20
- WhatsApp : +225 07 48 65 51 20

## 📚 Documentation

- `README.md` - Vue d'ensemble du projet
- `database/INSTALLATION.md` - Installation BDD et API
- `admin/README_ADMIN.md` - Documentation administration
- `GUIDE_COMPLET.md` - Guide complet du système
- `INTEGRATION_API.md` - Ce document

---

© 2026 EVORA DESIGN - Tous droits réservés
