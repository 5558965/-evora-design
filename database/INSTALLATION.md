# 📦 Installation de la Base de Données et de l'API

## 🗄️ Installation de la Base de Données MySQL

### Prérequis
- MySQL 5.7+ ou MariaDB 10.3+
- PHP 7.4+ avec extension PDO_MySQL
- Serveur web (Apache, Nginx)

### Étape 1 : Créer la base de données

**Option A : Via phpMyAdmin**
1. Ouvrez phpMyAdmin
2. Cliquez sur "Importer"
3. Sélectionnez le fichier `database/evora_design.sql`
4. Cliquez sur "Exécuter"

**Option B : Via ligne de commande**
```bash
mysql -u root -p < database/evora_design.sql
```

### Étape 2 : Vérifier la création

```sql
USE evora_design;
SHOW TABLES;
```

Vous devriez voir 12 tables :
- admins
- categories
- produits
- produits_images
- devis
- commandes
- commandes_items
- galerie
- visites
- activites
- parametres

## ⚙️ Configuration de l'API PHP

### Étape 1 : Configuration de la base de données

Éditez le fichier `api/config/database.php` :

```php
private $host = "localhost";        // Votre hôte MySQL
private $db_name = "evora_design";  // Nom de la base
private $username = "root";         // Votre utilisateur MySQL
private $password = "";             // Votre mot de passe MySQL
```

### Étape 2 : Configuration du serveur web

**Apache (.htaccess)**

Créez un fichier `.htaccess` dans le dossier `api/` :

```apache
# Activer la réécriture d'URL
RewriteEngine On

# Autoriser les requêtes CORS
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"

# Rediriger toutes les requêtes vers index.php
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php?request=$1 [QSA,L]
```

**Nginx**

Ajoutez dans votre configuration :

```nginx
location /api {
    try_files $uri $uri/ /api/index.php?$query_string;
    
    # CORS
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
}
```

### Étape 3 : Tester l'API

Ouvrez votre navigateur et testez :

```
http://localhost/evora-design/api/stats/dashboard.php
```

Vous devriez voir un JSON avec les statistiques.

## 🔗 Intégration Frontend-Backend

### Étape 1 : Configurer l'URL de l'API

Éditez `js/api-client.js` ligne 10 :

```javascript
const API_BASE_URL = 'http://localhost/evora-design/api';
```

Remplacez par votre URL réelle :
- Local : `http://localhost/evora-design/api`
- Production : `https://votresite.com/api`

### Étape 2 : Inclure le script dans vos pages HTML

Ajoutez avant la fermeture de `</body>` :

```html
<script src="js/api-client.js"></script>
```

### Étape 3 : Utiliser l'API dans votre code

**Exemple : Créer un devis**

```javascript
// Dans devis.html
const devisData = {
    nom: 'Jean Dupont',
    email: 'jean@example.com',
    telephone: '+225 07 00 00 00 00',
    type_meuble: 'Dressing',
    budget: '500k-1m',
    description: 'Je souhaite un dressing sur mesure...'
};

EvoraAPI.DevisAPI.create(devisData)
    .then(response => {
        console.log('Devis créé:', response);
        alert('Votre demande a été envoyée !');
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'envoi');
    });
```

**Exemple : Charger les statistiques**

```javascript
// Dans admin/dashboard.html
EvoraAPI.StatsAPI.getDashboard()
    .then(response => {
        const stats = response.data.stats_globales;
        document.getElementById('totalVisits').textContent = stats.total_visites;
        document.getElementById('totalDevis').textContent = stats.total_devis;
        // etc...
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
```

## 🔐 Sécurité

### 1. Changer le mot de passe admin

```sql
-- Générer un nouveau hash (utilisez un outil en ligne ou PHP)
UPDATE admins 
SET password = '$2y$10$VOTRE_NOUVEAU_HASH' 
WHERE username = 'admin';
```

Pour générer un hash en PHP :
```php
echo password_hash('votre_nouveau_mot_de_passe', PASSWORD_DEFAULT);
```

### 2. Restreindre CORS en production

Dans `api/config/cors.php`, remplacez :

```php
header("Access-Control-Allow-Origin: *");
```

Par :

```php
header("Access-Control-Allow-Origin: https://votresite.com");
```

### 3. Activer HTTPS

En production, utilisez TOUJOURS HTTPS :
- Obtenez un certificat SSL (Let's Encrypt gratuit)
- Forcez HTTPS dans `.htaccess` :

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 4. Protéger le dossier API

Ajoutez un fichier `.htaccess` dans `api/` :

```apache
# Bloquer l'accès direct aux fichiers PHP
<FilesMatch "\.(php)$">
    Order Allow,Deny
    Allow from all
</FilesMatch>

# Autoriser uniquement les endpoints publics
<Files "create.php">
    Allow from all
</Files>
```

## 📊 Structure de l'API

### Endpoints disponibles

**Devis**
- `POST /api/devis/create.php` - Créer un devis
- `GET /api/devis/read.php` - Lire les devis
- `PUT /api/devis/update.php` - Mettre à jour un devis
- `DELETE /api/devis/delete.php` - Supprimer un devis

**Statistiques**
- `GET /api/stats/dashboard.php` - Stats du dashboard
- `POST /api/stats/track-visit.php` - Enregistrer une visite

**Produits** (à créer)
- `GET /api/produits/read.php` - Lire les produits
- `POST /api/produits/create.php` - Créer un produit
- `PUT /api/produits/update.php` - Mettre à jour un produit
- `DELETE /api/produits/delete.php` - Supprimer un produit

## 🧪 Tests

### Test manuel avec cURL

**Créer un devis :**
```bash
curl -X POST http://localhost/evora-design/api/devis/create.php \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test User",
    "email": "test@example.com",
    "telephone": "+225 07 00 00 00 00",
    "type_meuble": "Dressing",
    "description": "Test"
  }'
```

**Lire les devis :**
```bash
curl http://localhost/evora-design/api/devis/read.php
```

**Obtenir les stats :**
```bash
curl http://localhost/evora-design/api/stats/dashboard.php
```

## 🐛 Dépannage

### Erreur : "Access denied for user"
- Vérifiez les identifiants dans `api/config/database.php`
- Vérifiez que l'utilisateur MySQL a les droits sur la base

### Erreur : "CORS policy"
- Vérifiez que `api/config/cors.php` est bien inclus
- Vérifiez la configuration de votre serveur web

### Erreur : "Call to undefined function"
- Vérifiez que l'extension PDO_MySQL est activée dans PHP
- Vérifiez `php.ini` : `extension=pdo_mysql`

### Les visites ne sont pas enregistrées
- Vérifiez que `session_start()` fonctionne
- Vérifiez les permissions d'écriture sur le dossier de sessions

## 📞 Support

Pour toute question :
- Email : contact@evoradesign.ci
- Téléphone : +225 07 48 65 51 20

---

© 2026 EVORA DESIGN - Tous droits réservés
