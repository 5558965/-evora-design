# EVORA DESIGN - Site Web E-commerce

Site web professionnel pour EVORA DESIGN, spécialiste de meubles sur mesure en Côte d'Ivoire.

## 📁 Structure du projet

```
├── index.html          # Page d'accueil avec catalogue
├── panier.html         # Page du panier d'achat
├── commande.html       # Page de finalisation de commande
├── confirmation.html   # Page de confirmation de commande
├── devis.html          # Formulaire de demande de devis
├── style.css           # Styles CSS personnalisés
├── script.js           # JavaScript principal
└── images/             # Dossier des images
```

## 🎨 Fonctionnalités

### Page d'accueil (index.html)
- Hero section avec image de fond
- Présentation de l'entreprise
- Catalogue de produits vedettes (15 catégories)
- Section valeurs de l'entreprise
- Galerie d'inspirations
- Boutique avec 3 produits phares
- Blog/Articles
- Formulaire de contact
- Footer avec coordonnées

### Système de panier
- Ajout multiple d'articles sans redirection
- Compteur en temps réel dans le header
- Aperçu du panier au survol
- Animations de confirmation
- Stockage local (localStorage)
- Calcul automatique du total

### Page de commande (commande.html)
- Formulaire d'informations de livraison
- 4 moyens de paiement :
  - Mobile Money (Orange/MTN/Moov)
  - Wave
  - Virement bancaire
  - Paiement à la livraison
- Résumé de commande en temps réel
- Indicateur d'étapes (4 étapes)
- Validation complète du formulaire
- Intégration WhatsApp pour confirmation

### Page de confirmation
- Animation de succès
- Numéro de commande unique
- Récapitulatif de la commande
- Prochaines étapes
- Informations de contact

### Demande de devis
- Formulaire en 2 étapes
- Barre de progression interactive
- Validation en temps réel
- Animation de succès
- Envoi automatique via WhatsApp

## 🎯 Technologies utilisées

- HTML5 sémantique
- CSS3 avec variables CSS
- JavaScript ES6+ (vanilla)
- Tailwind CSS (via CDN)
- Google Fonts (Poppins, Montserrat)
- LocalStorage pour la persistance
- SessionStorage pour les données temporaires

## 🚀 Améliorations professionnelles

### Accessibilité
- Attributs ARIA (aria-label, aria-live, aria-required)
- Navigation au clavier
- Focus visible
- Labels sémantiques
- Support prefers-reduced-motion

### Performance
- Lazy loading des images
- Preconnect pour les ressources externes
- Code JavaScript optimisé
- Animations CSS performantes

### SEO
- Métadonnées complètes
- Open Graph tags
- Structure sémantique
- Alt text sur toutes les images

### UX/UI
- Design moderne et épuré
- Animations fluides
- Feedback visuel immédiat
- Messages de confirmation
- États de chargement
- Responsive design

## 📱 Responsive

Le site est entièrement responsive et s'adapte à :
- Mobile (< 768px)
- Tablette (768px - 1024px)
- Desktop (> 1024px)

## 🔧 Configuration

### Coordonnées à personnaliser

Dans les fichiers, remplacez :
- Numéro WhatsApp : `2250748655120`
- Email : `contact@evoradesign.ci`
- Adresse : `KOUMASSI, ZOE BRUNO, RUE SORO SORI 127`

### Moyens de paiement

Pour activer les paiements réels :
1. Intégrer l'API de paiement mobile (CinetPay, FedaPay, etc.)
2. Configurer les coordonnées bancaires
3. Mettre en place un système de gestion de commandes

## 📞 Contact

EVORA DESIGN
- Téléphone : +225 07 48 65 51 20 / +225 05 54 17 57 94
- Email : contact@evoradesign.ci
- Adresse : KOUMASSI, ZOE BRUNO, RUE SORO SORI 127

## 📄 Licence

© 2026 EVORA DESIGN - Tous droits réservés


## 🗄️ Base de Données MySQL

### Structure de la base de données

La base de données `evora_design` contient 12 tables principales :

1. **admins** - Comptes administrateurs
2. **categories** - Catégories de produits
3. **produits** - Catalogue de produits
4. **produits_images** - Images des produits
5. **devis** - Demandes de devis clients
6. **commandes** - Commandes clients
7. **commandes_items** - Articles des commandes
8. **galerie** - Photos de la galerie
9. **visites** - Tracking des visites
10. **activites** - Journal d'activités admin
11. **parametres** - Configuration du site

### Installation

Voir le guide complet : `database/INSTALLATION.md`

**Installation rapide :**

```bash
# Via MySQL CLI
mysql -u root -p < database/evora_design.sql

# Ou via phpMyAdmin
# Importer le fichier database/evora_design.sql
```

### Configuration API

1. Éditez `api/config/database.php`
2. Configurez vos identifiants MySQL
3. Testez : `http://localhost/evora-design/api/stats/dashboard.php`

## 🔌 API Backend PHP

### Endpoints disponibles

**Devis**
- `POST /api/devis/create.php` - Créer un devis
- `GET /api/devis/read.php` - Lire les devis
- `PUT /api/devis/update.php` - Mettre à jour
- `DELETE /api/devis/delete.php` - Supprimer

**Statistiques**
- `GET /api/stats/dashboard.php` - Stats complètes
- `POST /api/stats/track-visit.php` - Enregistrer visite

### Utilisation dans le frontend

```javascript
// Inclure le client API
<script src="js/api-client.js"></script>

// Créer un devis
EvoraAPI.DevisAPI.create(devisData)
    .then(response => console.log(response))
    .catch(error => console.error(error));

// Charger les stats
EvoraAPI.StatsAPI.getDashboard()
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### Sécurité Production

⚠️ **IMPORTANT pour la production :**

1. **Changer les identifiants MySQL**
2. **Activer HTTPS**
3. **Restreindre CORS** (remplacer `*` par votre domaine)
4. **Changer le mot de passe admin**
5. **Configurer les sauvegardes automatiques**

## 🔄 Intégration Frontend-Backend

### ✅ État actuel : INTÉGRATION COMPLÈTE

Le système est maintenant **entièrement intégré** avec MySQL via l'API PHP !

**Pages intégrées :**
- ✅ `devis.html` - Enregistrement des devis dans MySQL
- ✅ `admin/dashboard.html` - Statistiques depuis MySQL
- ✅ `admin/devis-list.html` - Gestion des devis depuis MySQL
- ✅ Toutes les pages - Tracking automatique des visites

**Fonctionnalités actives :**
- ✅ Création de devis via API
- ✅ Lecture des devis avec filtres et recherche
- ✅ Mise à jour du statut des devis
- ✅ Statistiques en temps réel
- ✅ Tracking automatique des visites
- ✅ Fallback localStorage en cas d'erreur API

### Utilisation dans le frontend

```javascript
// Le script API est déjà inclus dans toutes les pages
// <script src="js/api-client.js"></script>

// Créer un devis (automatique dans devis.html)
EvoraAPI.DevisAPI.create(devisData)
    .then(response => console.log('Devis créé:', response.id))
    .catch(error => console.error(error));

// Charger les stats (automatique dans admin/dashboard.html)
EvoraAPI.StatsAPI.getDashboard()
    .then(data => {
        const stats = data.data.stats_globales;
        console.log('Visites:', stats.total_visites);
    });

// Tracking automatique (actif sur toutes les pages)
// Aucune action requise, le tracking se fait automatiquement
```

### Configuration requise

1. **Installer MySQL** (voir `database/INSTALLATION.md`)
2. **Configurer l'API** dans `api/config/database.php`
3. **Configurer l'URL** dans `js/api-client.js` ligne 10
4. **Tester** avec `test-api.html`

Voir la documentation complète : `INTEGRATION_API.md`

## 📊 Fonctionnalités Base de Données

### Vues SQL
- `stats_globales` - Statistiques en temps réel
- `visites_par_jour` - Visites quotidiennes
- `produits_populaires` - Top 10 produits

### Procédures stockées
- `enregistrer_visite()` - Enregistrer une visite
- `creer_commande()` - Créer une commande

### Triggers
- Incrémentation automatique des vues produits
- Mise à jour automatique des timestamps

### Index optimisés
- Index sur les colonnes fréquemment recherchées
- Index composites pour les requêtes complexes
- Performance optimale même avec des milliers d'enregistrements
