# 👨‍💻 Guide pour le Développeur - EVORA DESIGN

## 🎯 Vous reprenez ce projet ?

Ce guide est fait pour vous ! Voici tout ce que vous devez savoir pour travailler efficacement sur EVORA DESIGN.

---

## 📊 État Actuel du Projet

### ✅ Ce qui est fait (100% fonctionnel)

**Frontend :**
- ✅ 5 pages HTML complètes et responsive
- ✅ Design moderne avec Tailwind CSS
- ✅ JavaScript vanilla (ES6+)
- ✅ Système de panier fonctionnel
- ✅ Formulaires avec validation
- ✅ Animations et transitions

**Backend :**
- ✅ API REST PHP complète
- ✅ Base de données MySQL (12 tables)
- ✅ CRUD complet pour les devis
- ✅ Système de statistiques
- ✅ Tracking des visites

**Administration :**
- ✅ Système d'authentification
- ✅ Dashboard avec stats en temps réel
- ✅ Gestion des devis
- ✅ Filtres et recherche

**Intégration :**
- ✅ Frontend ↔ Backend 100% intégré
- ✅ Client API JavaScript
- ✅ Fallback localStorage
- ✅ Tracking automatique

### 🚧 Ce qui reste à faire

**Endpoints API à créer :**
- [ ] Produits (CRUD)
- [ ] Catégories (CRUD)
- [ ] Galerie (CRUD + upload)
- [ ] Commandes (CRUD)

**Pages admin à créer :**
- [ ] Gestion des produits
- [ ] Gestion des catégories
- [ ] Gestion de la galerie
- [ ] Gestion des commandes
- [ ] Paramètres du site

**Fonctionnalités à ajouter :**
- [ ] Paiement en ligne (CinetPay, FedaPay)
- [ ] Newsletter
- [ ] Blog
- [ ] Avis clients
- [ ] Chat en direct

---

## 🏗️ Architecture du Projet

### Structure des Dossiers

```
evora-design/
│
├── Frontend (Pages publiques)
│   ├── index.html              # Page d'accueil
│   ├── panier.html             # Panier
│   ├── devis.html              # Demande de devis
│   ├── commande.html           # Commande
│   ├── confirmation.html       # Confirmation
│   ├── style.css               # Styles globaux
│   └── script.js               # JavaScript principal
│
├── JavaScript
│   └── api-client.js           # Client API (IMPORTANT)
│
├── Admin (Back-office)
│   ├── login.html              # Connexion
│   ├── dashboard.html          # Dashboard
│   ├── devis-list.html         # Gestion devis
│   ├── admin-auth.js           # Authentification
│   ├── admin-dashboard.js      # Logique dashboard
│   └── devis-manager.js        # Gestion devis
│
├── API (Backend PHP)
│   ├── config/
│   │   ├── database.php        # Config BDD
│   │   └── cors.php            # Config CORS
│   ├── models/
│   │   └── Devis.php           # Modèle Devis
│   ├── devis/
│   │   ├── create.php          # POST
│   │   ├── read.php            # GET
│   │   └── update.php          # PUT
│   └── stats/
│       ├── dashboard.php       # GET stats
│       └── track-visit.php     # POST visite
│
└── Database
    └── evora_design.sql        # Script SQL complet
```

---

## 🔑 Concepts Clés

### 1. Client API JavaScript

**Fichier :** `js/api-client.js`

C'est le cœur de l'intégration frontend-backend. Il expose :

```javascript
// Classes disponibles
window.EvoraAPI = {
    DevisAPI,      // Gestion des devis
    StatsAPI,      // Statistiques
    ProduitsAPI    // Produits (structure prête)
};
```

**Utilisation :**
```javascript
// Créer un devis
EvoraAPI.DevisAPI.create(data)
    .then(response => console.log(response))
    .catch(error => console.error(error));

// Charger les stats
EvoraAPI.StatsAPI.getDashboard()
    .then(data => console.log(data));
```

### 2. Fallback localStorage

Toutes les fonctions ont un fallback localStorage :
- Si l'API échoue, le système utilise localStorage
- Garantit la continuité du service
- Permet de tester sans serveur

**Exemple :**
```javascript
async function saveDevis(data) {
    try {
        // Essayer l'API
        await EvoraAPI.DevisAPI.create(data);
    } catch (error) {
        // Fallback localStorage
        const devis = JSON.parse(localStorage.getItem('admin_devis') || '[]');
        devis.push(data);
        localStorage.setItem('admin_devis', JSON.stringify(devis));
    }
}
```

### 3. Structure API REST

**Pattern utilisé :**
```
/api/{resource}/{action}.php
```

**Exemples :**
- `POST /api/devis/create.php`
- `GET /api/devis/read.php`
- `PUT /api/devis/update.php`
- `DELETE /api/devis/delete.php`

**Réponse standard :**
```json
{
    "success": true,
    "message": "Message de succès",
    "data": { ... }
}
```

### 4. Base de Données

**Tables principales :**
- `admins` - Comptes admin
- `devis` - Demandes de devis
- `produits` - Catalogue
- `commandes` - Commandes clients
- `visites` - Tracking

**Vues SQL :**
- `stats_globales` - Stats en temps réel
- `visites_par_jour` - Visites quotidiennes
- `produits_populaires` - Top 10 produits

---

## 🛠️ Développement

### Configuration de l'Environnement

**Prérequis :**
- PHP 7.4+
- MySQL 5.7+
- Apache/Nginx
- Extension PDO_MySQL

**Installation :**
```bash
# 1. Cloner le projet
git clone [url]

# 2. Créer la BDD
mysql -u root -p < database/evora_design.sql

# 3. Configurer l'API
# Éditer api/config/database.php

# 4. Configurer l'URL
# Éditer js/api-client.js ligne 10

# 5. Tester
# Ouvrir test-api.html
```

### Workflow de Développement

**1. Créer un nouveau endpoint API**

```php
// api/produits/create.php
<?php
header("Content-Type: application/json");
include_once '../config/database.php';
include_once '../config/cors.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

// Validation
if (empty($data->nom)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Nom requis"]);
    exit();
}

// Insertion
$query = "INSERT INTO produits (nom, prix, categorie_id) VALUES (?, ?, ?)";
$stmt = $db->prepare($query);
$stmt->execute([$data->nom, $data->prix, $data->categorie_id]);

echo json_encode([
    "success" => true,
    "message" => "Produit créé",
    "id" => $db->lastInsertId()
]);
?>
```

**2. Ajouter la méthode au client API**

```javascript
// js/api-client.js
class ProduitsAPI {
    static async create(produitData) {
        return APIClient.post('/produits/create.php', produitData);
    }
}
```

**3. Utiliser dans le frontend**

```javascript
// admin/products.html
EvoraAPI.ProduitsAPI.create({
    nom: 'Nouveau produit',
    prix: 100000,
    categorie_id: 1
})
.then(response => {
    console.log('Produit créé:', response.id);
    alert('Produit créé avec succès !');
})
.catch(error => {
    console.error('Erreur:', error);
    alert('Erreur lors de la création');
});
```

### Conventions de Code

**PHP :**
- PSR-12 pour le style
- Requêtes préparées obligatoires
- Validation des données
- Gestion d'erreurs avec try-catch

**JavaScript :**
- ES6+ (async/await, arrow functions)
- Commentaires JSDoc
- Gestion d'erreurs avec try-catch
- Nommage camelCase

**SQL :**
- Noms de tables en minuscules
- Noms de colonnes en snake_case
- Index sur les clés étrangères
- Contraintes de clés étrangères

**HTML/CSS :**
- HTML5 sémantique
- Tailwind CSS pour les styles
- Classes utilitaires
- Responsive mobile-first

---

## 🧪 Tests

### Tests Manuels

**1. Test d'un endpoint**
```bash
curl -X POST http://localhost/evora-design/api/devis/create.php \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test","email":"test@test.com","telephone":"0700000000","type_meuble":"Test"}'
```

**2. Test dans le navigateur**
```javascript
// Console du navigateur
EvoraAPI.DevisAPI.create({
    nom: 'Test',
    email: 'test@test.com',
    telephone: '0700000000',
    type_meuble: 'Test'
}).then(console.log).catch(console.error);
```

**3. Test avec la page de test**
```
http://localhost/evora-design/test-api.html
```

### Tests Automatisés (à implémenter)

**PHPUnit pour le backend :**
```php
// tests/DevisTest.php
class DevisTest extends TestCase {
    public function testCreateDevis() {
        $devis = new Devis($this->db);
        $result = $devis->create([
            'nom' => 'Test',
            'email' => 'test@test.com'
        ]);
        $this->assertTrue($result);
    }
}
```

**Jest pour le frontend :**
```javascript
// tests/api-client.test.js
test('DevisAPI.create should return success', async () => {
    const response = await EvoraAPI.DevisAPI.create({
        nom: 'Test',
        email: 'test@test.com'
    });
    expect(response.success).toBe(true);
});
```

---

## 🐛 Débogage

### Logs PHP

**Activer les logs :**
```php
// En haut de chaque fichier PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

**Logs personnalisés :**
```php
error_log("Debug: " . print_r($data, true));
```

### Console JavaScript

**Logs utiles :**
```javascript
console.log('Data:', data);
console.error('Error:', error);
console.table(array);
console.time('API Call');
// ... code ...
console.timeEnd('API Call');
```

### Outils de Développement

**Chrome DevTools :**
- Network tab : Voir les requêtes API
- Console : Voir les logs JavaScript
- Application : Voir localStorage
- Sources : Déboguer le JavaScript

**Postman/Insomnia :**
- Tester les endpoints API
- Sauvegarder les requêtes
- Automatiser les tests

---

## 📦 Déploiement

### Checklist de Production

**Sécurité :**
- [ ] Changer les identifiants MySQL
- [ ] Changer le mot de passe admin
- [ ] Activer HTTPS
- [ ] Restreindre CORS
- [ ] Désactiver les logs d'erreur
- [ ] Configurer les sauvegardes

**Performance :**
- [ ] Minifier CSS/JS
- [ ] Optimiser les images
- [ ] Activer la compression Gzip
- [ ] Configurer le cache
- [ ] Optimiser les requêtes SQL

**Configuration :**
- [ ] Mettre à jour l'URL API
- [ ] Configurer les emails
- [ ] Configurer les paiements
- [ ] Tester tous les endpoints

### Commandes de Déploiement

**1. Préparer les fichiers**
```bash
# Minifier CSS
npx cssnano style.css style.min.css

# Minifier JS
npx terser script.js -o script.min.js
```

**2. Transférer vers le serveur**
```bash
# Via FTP/SFTP
# Ou via Git
git push production main
```

**3. Configurer sur le serveur**
```bash
# Créer la BDD
mysql -u user -p < evora_design.sql

# Configurer les permissions
chmod 755 api/
chmod 644 api/*.php
```

---

## 📚 Ressources Utiles

### Documentation Externe

**PHP :**
- [PHP Manual](https://www.php.net/manual/fr/)
- [PDO Documentation](https://www.php.net/manual/fr/book.pdo.php)

**JavaScript :**
- [MDN Web Docs](https://developer.mozilla.org/fr/)
- [JavaScript.info](https://javascript.info/)

**MySQL :**
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [SQL Tutorial](https://www.w3schools.com/sql/)

**Tailwind CSS :**
- [Tailwind Docs](https://tailwindcss.com/docs)

### Documentation Interne

**Guides :**
- `DEMARRAGE_RAPIDE.md` - Installation rapide
- `GUIDE_COMPLET.md` - Guide complet
- `INTEGRATION_API.md` - Documentation API
- `TEST_INTEGRATION.md` - Guide de tests

**Index :**
- `INDEX_DOCUMENTATION.md` - Navigation dans la doc

---

## 💡 Conseils et Bonnes Pratiques

### 1. Toujours tester localement
Avant de déployer, testez toutes les modifications localement.

### 2. Utiliser Git
Versionnez votre code avec Git pour suivre les modifications.

### 3. Commenter le code
Ajoutez des commentaires pour expliquer la logique complexe.

### 4. Valider les données
Validez toujours les données côté serveur, jamais uniquement côté client.

### 5. Gérer les erreurs
Utilisez try-catch et affichez des messages d'erreur clairs.

### 6. Optimiser les requêtes
Utilisez des index SQL et limitez les requêtes N+1.

### 7. Sécuriser l'API
Utilisez HTTPS, validez les entrées, et limitez les requêtes.

### 8. Documenter les changements
Mettez à jour la documentation quand vous ajoutez des fonctionnalités.

---

## 🎯 Prochaines Tâches Suggérées

### Court terme (1-2 semaines)
1. [ ] Créer les endpoints produits
2. [ ] Créer la page admin produits
3. [ ] Implémenter l'upload d'images
4. [ ] Ajouter la pagination

### Moyen terme (1-2 mois)
1. [ ] Intégrer un système de paiement
2. [ ] Créer le système de newsletter
3. [ ] Ajouter un blog
4. [ ] Implémenter les avis clients

### Long terme (3-6 mois)
1. [ ] Créer une application mobile
2. [ ] Ajouter un chat en direct
3. [ ] Implémenter l'IA pour les recommandations
4. [ ] Créer un système de fidélité

---

## 📞 Support

**Questions techniques :**
- Consultez `INDEX_DOCUMENTATION.md` pour trouver la bonne doc
- Consultez `TEST_INTEGRATION.md` pour le dépannage

**Contact EVORA DESIGN :**
- Email : contact@evoradesign.ci
- Téléphone : +225 07 48 65 51 20

---

## ✅ Checklist du Développeur

Avant de commencer :
- [ ] J'ai lu `README.md`
- [ ] J'ai installé le système localement
- [ ] J'ai testé tous les endpoints
- [ ] Je comprends l'architecture
- [ ] J'ai configuré mon environnement de dev

Avant de déployer :
- [ ] J'ai testé toutes mes modifications
- [ ] J'ai mis à jour la documentation
- [ ] J'ai vérifié la sécurité
- [ ] J'ai optimisé le code
- [ ] J'ai fait une sauvegarde

---

## 🎉 Bon Développement !

Vous avez maintenant toutes les clés pour travailler efficacement sur EVORA DESIGN.

**N'oubliez pas :**
- Testez souvent
- Documentez vos changements
- Suivez les conventions
- Demandez de l'aide si besoin

---

© 2026 EVORA DESIGN - Tous droits réservés

**Dernière mise à jour :** 20 février 2026
**Version :** 1.0.0
