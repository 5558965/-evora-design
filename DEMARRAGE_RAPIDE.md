# ⚡ Démarrage Rapide - EVORA DESIGN

## 🚀 Installation en 5 minutes

### Prérequis
- MySQL installé
- PHP 7.4+ installé
- Serveur web (Apache/Nginx) démarré

---

## 📋 Étapes d'installation

### 1️⃣ Créer la base de données (2 min)

**Option A : Via phpMyAdmin**
1. Ouvrez phpMyAdmin
2. Cliquez sur "Importer"
3. Sélectionnez `database/evora_design.sql`
4. Cliquez sur "Exécuter"

**Option B : Via ligne de commande**
```bash
mysql -u root -p < database/evora_design.sql
```

✅ **Vérification :**
```sql
USE evora_design;
SHOW TABLES;
-- Devrait afficher 12 tables
```

---

### 2️⃣ Configurer l'API (1 min)

Ouvrez `api/config/database.php` et modifiez :

```php
private $host = "localhost";        // Votre hôte MySQL
private $db_name = "evora_design";  // Nom de la base
private $username = "root";         // Votre utilisateur MySQL
private $password = "";             // Votre mot de passe MySQL
```

---

### 3️⃣ Configurer l'URL API (30 sec)

Ouvrez `js/api-client.js` ligne 10 et modifiez :

```javascript
const API_BASE_URL = 'http://localhost/evora-design/api';
// Remplacez par votre URL réelle
```

**Exemples d'URL :**
- Local XAMPP : `http://localhost/evora-design/api`
- Local WAMP : `http://localhost/evora-design/api`
- Serveur local : `http://192.168.1.100/evora-design/api`
- Production : `https://votresite.com/api`

---

### 4️⃣ Tester l'API (1 min)

Ouvrez dans votre navigateur :
```
http://localhost/evora-design/test-api.html
```

Cliquez sur tous les boutons de test :
- ✅ Tester Stats Dashboard
- ✅ Créer un Devis Test
- ✅ Lire tous les Devis
- ✅ Enregistrer une Visite

**Résultat attendu :** Tous les tests affichent des réponses JSON

---

### 5️⃣ Tester le site (30 sec)

Ouvrez dans votre navigateur :
```
http://localhost/evora-design/index.html
```

✅ Le site s'affiche correctement

---

## 🎯 Premiers pas

### Accéder à l'administration

1. Ouvrez : `http://localhost/evora-design/admin/login.html`

2. Connectez-vous avec :
   - Username : `admin`
   - Password : `evora2026`

3. Vous êtes sur le dashboard !

### Créer votre premier devis

1. Ouvrez : `http://localhost/evora-design/devis.html`

2. Remplissez le formulaire :
   - Nom : Jean Dupont
   - Téléphone : +225 07 00 00 00 00
   - Email : jean@example.com
   - Type : Dressing
   - Budget : 500k-1m
   - Description : Test

3. Cliquez sur "Envoyer ma demande"

4. ✅ Message de succès s'affiche

5. Vérifiez dans l'admin :
   - Allez sur `admin/devis-list.html`
   - Le devis apparaît dans la liste

### Vérifier les statistiques

1. Allez sur `admin/dashboard.html`

2. Vérifiez les 4 statistiques :
   - Visites totales
   - Demandes de devis
   - Produits
   - Photos

3. Naviguez sur plusieurs pages du site

4. Rechargez le dashboard

5. ✅ Les visites ont augmenté

---

## 🔧 Configuration Avancée

### Changer le mot de passe admin

**Méthode 1 : Via SQL**
```sql
-- Générer un hash pour "nouveau_mot_de_passe"
-- Utilisez : https://bcrypt-generator.com/

UPDATE admins 
SET password = '$2y$10$VOTRE_NOUVEAU_HASH' 
WHERE username = 'admin';
```

**Méthode 2 : Via PHP**
```php
<?php
echo password_hash('nouveau_mot_de_passe', PASSWORD_DEFAULT);
?>
```

### Personnaliser les coordonnées

Recherchez et remplacez dans tous les fichiers :
- `+225 07 48 65 51 20` → Votre numéro
- `contact@evoradesign.ci` → Votre email
- `+2250748655120` → Votre WhatsApp (sans +)

### Ajouter vos images

1. Placez vos images dans le dossier `images/`
2. Modifiez les chemins dans `index.html`
3. Optimisez les images (compression)

---

## 🐛 Problèmes Courants

### ❌ Erreur : "Access denied for user"

**Solution :**
1. Vérifiez les identifiants dans `api/config/database.php`
2. Vérifiez que MySQL est démarré
3. Testez la connexion :
```bash
mysql -u root -p
```

### ❌ Erreur : "CORS policy"

**Solution :**
1. Vérifiez que le fichier `api/.htaccess` existe
2. Vérifiez que mod_rewrite est activé dans Apache
3. Redémarrez Apache

### ❌ Erreur : "Call to undefined function"

**Solution :**
1. Vérifiez que l'extension PDO_MySQL est activée
2. Ouvrez `php.ini` et décommentez :
```ini
extension=pdo_mysql
```
3. Redémarrez Apache

### ❌ Les stats ne s'affichent pas

**Solution :**
1. Ouvrez la console du navigateur (F12)
2. Vérifiez les erreurs JavaScript
3. Vérifiez que l'URL API est correcte
4. Testez l'endpoint directement :
```
http://localhost/evora-design/api/stats/dashboard.php
```

### ❌ Les devis ne s'enregistrent pas

**Solution :**
1. Ouvrez la console du navigateur (F12)
2. Vérifiez les erreurs
3. Testez avec `test-api.html`
4. Vérifiez les logs PHP

---

## ✅ Checklist de Vérification

Après l'installation, vérifiez :

### Base de données
- [ ] MySQL démarré
- [ ] Base `evora_design` créée
- [ ] 12 tables présentes
- [ ] Vue `stats_globales` fonctionne

### API
- [ ] Configuration BDD correcte
- [ ] URL API configurée
- [ ] Tous les tests API passent
- [ ] Pas d'erreur dans les logs

### Frontend
- [ ] Site s'affiche correctement
- [ ] Formulaire de devis fonctionne
- [ ] Panier fonctionne
- [ ] Tracking des visites actif

### Admin
- [ ] Connexion fonctionne
- [ ] Dashboard affiche les stats
- [ ] Liste des devis fonctionne
- [ ] Filtres et recherche fonctionnent

---

## 📚 Documentation Complète

Pour aller plus loin :

1. **Installation détaillée**
   → `database/INSTALLATION.md`

2. **Guide complet du système**
   → `GUIDE_COMPLET.md`

3. **Documentation API**
   → `INTEGRATION_API.md`

4. **Guide de tests**
   → `TEST_INTEGRATION.md`

5. **Récapitulatif complet**
   → `RECAPITULATIF_FINAL.md`

---

## 🎉 Félicitations !

Votre système EVORA DESIGN est maintenant opérationnel !

**Prochaines étapes :**
1. Personnalisez les contenus
2. Ajoutez vos images
3. Configurez les moyens de paiement
4. Testez avec des utilisateurs réels
5. Déployez en production

---

## 📞 Besoin d'aide ?

**EVORA DESIGN**
- Email : contact@evoradesign.ci
- Téléphone : +225 07 48 65 51 20
- WhatsApp : +225 07 48 65 51 20

---

© 2026 EVORA DESIGN - Tous droits réservés
