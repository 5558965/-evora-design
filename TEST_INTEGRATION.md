# 🧪 Tests d'Intégration - EVORA DESIGN

## ✅ Checklist de tests

### Prérequis
- [ ] MySQL installé et démarré
- [ ] Base de données `evora_design` créée
- [ ] Serveur web (Apache/Nginx) démarré
- [ ] PHP 7.4+ installé avec extension PDO_MySQL

---

## 📋 Tests à effectuer

### Test 1 : Configuration de base

#### 1.1 Vérifier la base de données
```sql
-- Se connecter à MySQL
mysql -u root -p

-- Vérifier que la base existe
SHOW DATABASES LIKE 'evora_design';

-- Utiliser la base
USE evora_design;

-- Vérifier les tables
SHOW TABLES;
-- Devrait afficher 12 tables

-- Vérifier la vue stats
SELECT * FROM stats_globales;
```

**Résultat attendu :** 
- Base de données existe
- 12 tables présentes
- Vue stats_globales fonctionne

#### 1.2 Vérifier la configuration API
```bash
# Ouvrir le fichier
notepad api/config/database.php

# Vérifier :
# - host = "localhost"
# - db_name = "evora_design"
# - username = votre utilisateur MySQL
# - password = votre mot de passe MySQL
```

#### 1.3 Vérifier l'URL API
```bash
# Ouvrir le fichier
notepad js/api-client.js

# Ligne 10, vérifier :
# const API_BASE_URL = 'http://localhost/evora-design/api';
# Adapter selon votre configuration
```

---

### Test 2 : API Backend

#### 2.1 Test endpoint stats
```bash
# Dans le navigateur, ouvrir :
http://localhost/evora-design/api/stats/dashboard.php
```

**Résultat attendu :**
```json
{
  "success": true,
  "data": {
    "stats_globales": {
      "total_visites": 0,
      "total_devis": 0,
      "total_produits": 0,
      "total_photos": 0
    },
    "visites_recentes": [],
    "devis_recents": []
  }
}
```

#### 2.2 Test création de devis
```bash
# Utiliser curl ou Postman
curl -X POST http://localhost/evora-design/api/devis/create.php \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test User",
    "email": "test@example.com",
    "telephone": "+225 07 00 00 00 00",
    "type_meuble": "Dressing",
    "description": "Test de création"
  }'
```

**Résultat attendu :**
```json
{
  "success": true,
  "message": "Devis créé avec succès",
  "id": 1
}
```

#### 2.3 Test lecture des devis
```bash
# Dans le navigateur
http://localhost/evora-design/api/devis/read.php
```

**Résultat attendu :**
```json
{
  "success": true,
  "total": 1,
  "records": [
    {
      "id": "1",
      "nom": "Test User",
      "email": "test@example.com",
      ...
    }
  ]
}
```

---

### Test 3 : Page de test API

#### 3.1 Ouvrir la page de test
```
http://localhost/evora-design/test-api.html
```

#### 3.2 Tester chaque endpoint
1. Cliquer sur "Tester Stats Dashboard"
   - ✅ Devrait afficher les statistiques
   
2. Cliquer sur "Créer un Devis Test"
   - ✅ Devrait créer un devis et afficher l'ID
   
3. Cliquer sur "Lire tous les Devis"
   - ✅ Devrait afficher la liste des devis
   
4. Cliquer sur "Enregistrer une Visite"
   - ✅ Devrait confirmer l'enregistrement

**Vérifier dans la console :**
- Aucune erreur JavaScript
- Toutes les réponses sont des objets JSON valides

---

### Test 4 : Frontend - Création de devis

#### 4.1 Ouvrir la page devis
```
http://localhost/evora-design/devis.html
```

#### 4.2 Remplir le formulaire
- Nom : Jean Dupont
- Téléphone : +225 07 00 00 00 00
- Email : jean@example.com
- Type de meuble : Dressing
- Budget : 500k-1m
- Description : Je souhaite un dressing sur mesure

#### 4.3 Soumettre
- ✅ Message de succès s'affiche
- ✅ Redirection WhatsApp après 2 secondes

#### 4.4 Vérifier dans la BDD
```sql
SELECT * FROM devis ORDER BY date_creation DESC LIMIT 1;
```

**Résultat attendu :**
- Le devis est enregistré dans la table
- Toutes les informations sont correctes
- Statut = 'pending'

---

### Test 5 : Admin - Connexion

#### 5.1 Ouvrir la page de connexion
```
http://localhost/evora-design/admin/login.html
```

#### 5.2 Se connecter
- Username : `admin`
- Password : `evora2026`

#### 5.3 Vérifier
- ✅ Redirection vers dashboard.html
- ✅ Pas d'erreur dans la console

---

### Test 6 : Admin - Dashboard

#### 6.1 Vérifier les statistiques
- ✅ Total visites s'affiche
- ✅ Total devis s'affiche (devrait être > 0)
- ✅ Total produits s'affiche
- ✅ Total photos s'affiche

#### 6.2 Vérifier les activités récentes
- ✅ Liste des activités s'affiche
- ✅ "Connexion administrateur" est présent

#### 6.3 Vérifier les demandes en attente
- ✅ Le devis créé précédemment s'affiche
- ✅ Statut "En attente"

---

### Test 7 : Admin - Gestion des devis

#### 7.1 Ouvrir la page devis
```
http://localhost/evora-design/admin/devis-list.html
```

#### 7.2 Vérifier la liste
- ✅ Tous les devis s'affichent
- ✅ Informations correctes (nom, email, téléphone, type)

#### 7.3 Tester les filtres
1. Sélectionner "En attente" dans le filtre
   - ✅ Seuls les devis en attente s'affichent
   
2. Taper "Jean" dans la recherche
   - ✅ Seuls les devis contenant "Jean" s'affichent

#### 7.4 Voir les détails
1. Cliquer sur "Voir" pour un devis
   - ✅ Modal s'ouvre
   - ✅ Toutes les informations s'affichent
   
2. Cliquer sur "Marquer comme traité"
   - ✅ Statut change
   - ✅ Message de confirmation
   - ✅ Modal se ferme

#### 7.5 Vérifier dans la BDD
```sql
SELECT id, nom, statut FROM devis WHERE nom = 'Jean Dupont';
```

**Résultat attendu :**
- Statut = 'processed'

---

### Test 8 : Tracking des visites

#### 8.1 Ouvrir plusieurs pages
1. `index.html`
2. `panier.html`
3. `devis.html`
4. `commande.html`

#### 8.2 Vérifier dans la BDD
```sql
SELECT * FROM visites ORDER BY date_visite DESC LIMIT 10;
```

**Résultat attendu :**
- 4 nouvelles visites enregistrées
- Pages correctes
- Dates récentes

#### 8.3 Vérifier dans le dashboard
1. Recharger `admin/dashboard.html`
2. ✅ Total visites a augmenté de 4

---

### Test 9 : Fallback localStorage

#### 9.1 Arrêter MySQL
```bash
# Windows
net stop MySQL80

# Linux/Mac
sudo systemctl stop mysql
```

#### 9.2 Créer un devis
1. Aller sur `devis.html`
2. Remplir et soumettre
3. ✅ Devrait fonctionner (localStorage)
4. ✅ Message dans la console : "Erreur API"

#### 9.3 Vérifier localStorage
```javascript
// Dans la console du navigateur
console.log(JSON.parse(localStorage.getItem('admin_devis')));
```

**Résultat attendu :**
- Le devis est dans localStorage
- Pas de crash de l'application

#### 9.4 Redémarrer MySQL
```bash
# Windows
net start MySQL80

# Linux/Mac
sudo systemctl start mysql
```

---

### Test 10 : Performance

#### 10.1 Tester le temps de réponse
```javascript
// Dans la console du navigateur sur test-api.html
console.time('API Stats');
EvoraAPI.StatsAPI.getDashboard()
  .then(() => console.timeEnd('API Stats'));
```

**Résultat attendu :**
- Temps < 500ms

#### 10.2 Tester avec beaucoup de données
```sql
-- Insérer 100 devis de test
DELIMITER //
CREATE PROCEDURE insert_test_devis()
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= 100 DO
    INSERT INTO devis (nom, email, telephone, type_meuble, description, statut)
    VALUES (
      CONCAT('Test User ', i),
      CONCAT('test', i, '@example.com'),
      '+225 07 00 00 00 00',
      'Dressing',
      'Test description',
      'pending'
    );
    SET i = i + 1;
  END WHILE;
END//
DELIMITER ;

CALL insert_test_devis();
```

#### 10.3 Vérifier la performance
1. Recharger `admin/devis-list.html`
2. ✅ Chargement rapide (< 1s)
3. ✅ Filtres fonctionnent
4. ✅ Recherche fonctionne

---

## 🐛 Problèmes courants

### Erreur : "Access denied for user"
**Solution :**
1. Vérifier les identifiants dans `api/config/database.php`
2. Vérifier que l'utilisateur MySQL existe
3. Vérifier les permissions

### Erreur : "CORS policy"
**Solution :**
1. Vérifier que `api/config/cors.php` est inclus
2. Vérifier le fichier `.htaccess`
3. Redémarrer Apache

### Erreur : "Call to undefined function"
**Solution :**
1. Vérifier que PDO_MySQL est activé
2. Vérifier `php.ini` : `extension=pdo_mysql`
3. Redémarrer Apache

### Stats ne s'affichent pas
**Solution :**
1. Vérifier que la vue `stats_globales` existe
2. Vérifier les données dans les tables
3. Vérifier la console navigateur

---

## ✅ Résultat final

Si tous les tests passent :
- ✅ Base de données fonctionnelle
- ✅ API backend opérationnelle
- ✅ Frontend intégré
- ✅ Admin fonctionnel
- ✅ Tracking actif
- ✅ Fallback localStorage opérationnel

**Le système est prêt pour la production !**

---

## 📞 Support

En cas de problème :
1. Vérifier les logs PHP (`error_log`)
2. Vérifier la console navigateur
3. Consulter `INTEGRATION_API.md`
4. Consulter `database/INSTALLATION.md`

---

© 2026 EVORA DESIGN - Tous droits réservés
