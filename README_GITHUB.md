# 🪑 EVORA DESIGN - Site E-commerce de Meubles sur Mesure

![EVORA DESIGN](images/EVORA%20DESIGN%20.jpg)

## 📖 Description

Site e-commerce complet pour **EVORA DESIGN**, spécialisé dans la fabrication de meubles sur mesure en Côte d'Ivoire. Le site offre une expérience utilisateur moderne avec gestion de produits, panier d'achat, système de devis et administration sécurisée.

## ✨ Fonctionnalités

### 🛍️ Côté Client
- ✅ Catalogue de produits dynamique
- ✅ Panier d'achat avec localStorage
- ✅ Système de devis en ligne
- ✅ Formulaire de contact avec CAPTCHA anti-spam
- ✅ Design responsive (Mobile, Tablet, Desktop)
- ✅ Optimisation SEO (sitemap, meta tags, Schema.org)
- ✅ Performance optimisée (< 3 secondes)

### 🔐 Côté Administration
- ✅ Authentification sécurisée
- ✅ Gestion des produits (CRUD)
- ✅ Gestion des commandes
- ✅ Gestion des devis
- ✅ Statistiques et dashboard
- ✅ Sauvegardes automatiques

### 🛡️ Sécurité
- ✅ Protection des pages admin
- ✅ CAPTCHA mathématique sur formulaires
- ✅ Sauvegardes automatiques (toutes les 30 min)
- ✅ Session management avec auto-déconnexion
- ✅ Documentation SSL/TLS

### ⚡ Performance
- ✅ Lazy loading des images
- ✅ Preload des ressources critiques
- ✅ Compression localStorage
- ✅ Monitoring des performances
- ✅ Service Worker ready

## 🚀 Installation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Edge)
- Serveur web local (optionnel) : XAMPP, WAMP, ou Live Server

### Installation Simple
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/VOTRE_USERNAME/evora-design.git
   ```

2. Ouvrir `index.html` dans un navigateur

3. Pour l'administration :
   - Ouvrir `admin/login.html`
   - **Username** : `admin`
   - **Password** : `evora2026`

### Installation avec Serveur Local
1. Installer XAMPP ou WAMP
2. Copier le dossier dans `htdocs/` (XAMPP) ou `www/` (WAMP)
3. Accéder via `http://localhost/evora-design/`

## 📁 Structure du Projet

```
evora-design/
├── index.html              # Page d'accueil
├── style.css               # Styles CSS
├── script.js               # JavaScript principal
├── panier.html             # Page panier
├── devis.html              # Page devis
├── commande.html           # Page commande
├── confirmation.html       # Page confirmation
│
├── admin/                  # Administration
│   ├── login.html          # Connexion admin
│   ├── dashboard.html      # Tableau de bord
│   ├── products.html       # Gestion produits
│   ├── orders.html         # Gestion commandes
│   ├── devis-list.html     # Gestion devis
│   ├── admin-auth.js       # Authentification
│   └── ...
│
├── js/                     # Scripts JavaScript
│   ├── security.js         # Sécurité (CAPTCHA + Sauvegardes)
│   ├── performance.js      # Optimisations performance
│   └── api-client.js       # Client API
│
├── images/                 # Images du site
│   └── ...
│
├── api/                    # API Backend (PHP)
│   ├── config/
│   ├── devis/
│   ├── models/
│   └── stats/
│
├── database/               # Base de données
│   ├── evora_design.sql    # Structure SQL
│   └── INSTALLATION.md     # Guide installation DB
│
└── docs/                   # Documentation
    ├── GUIDE_DEMARRAGE_RAPIDE.md
    ├── TACHES_COMPLETEES.md
    ├── SECURITE_ADMIN.md
    ├── FONCTIONNALITES_SECURITE.md
    ├── OPTIMISATION_PERFORMANCE_SEO.md
    └── GUIDE_GITHUB.md
```

## 🎯 Utilisation

### Ajouter un Produit
1. Se connecter à l'admin (`admin/login.html`)
2. Aller dans "Gestion Produits"
3. Remplir le formulaire et cliquer sur "Ajouter"
4. Le produit apparaît immédiatement sur le site

### Gérer les Commandes
1. Aller dans "Gestion Commandes"
2. Voir toutes les commandes clients
3. Changer le statut (En attente, En cours, Livrée)

### Gérer les Devis
1. Aller dans "Gestion Devis"
2. Voir tous les devis demandés
3. Répondre aux clients

## 🔒 Sécurité

### ⚠️ IMPORTANT : Changer le Mot de Passe Admin

Avant de déployer en production, changez le mot de passe :

1. Ouvrir `admin/login.html`
2. Ligne ~103, modifier :
   ```javascript
   if (username === 'admin' && password === 'VOTRE_NOUVEAU_MOT_DE_PASSE') {
   ```

### Activer SSL/TLS
Consultez `FONCTIONNALITES_SECURITE.md` pour les instructions SSL.

## 📊 Performance

Le site est optimisé pour :
- ⏱️ Temps de chargement : < 3 secondes
- 📱 Mobile-friendly : 100%
- 🔍 SEO : Optimisé (sitemap, meta tags, Schema.org)
- ♿ Accessibilité : Conforme aux bonnes pratiques

## 🌐 Déploiement

### GitHub Pages (Gratuit)
1. Aller dans Settings → Pages
2. Source : `main` branch, `/ (root)` folder
3. Site accessible à : `https://VOTRE_USERNAME.github.io/evora-design/`

### Hébergement Web
1. Uploader tous les fichiers via FTP
2. Configurer la base de données (voir `database/INSTALLATION.md`)
3. Configurer SSL/TLS
4. Tester toutes les fonctionnalités

## 📚 Documentation

- **[GUIDE_DEMARRAGE_RAPIDE.md](GUIDE_DEMARRAGE_RAPIDE.md)** - Guide de démarrage
- **[TACHES_COMPLETEES.md](TACHES_COMPLETEES.md)** - Résumé des tâches
- **[SECURITE_ADMIN.md](SECURITE_ADMIN.md)** - Documentation sécurité
- **[OPTIMISATION_PERFORMANCE_SEO.md](OPTIMISATION_PERFORMANCE_SEO.md)** - Performance & SEO
- **[GUIDE_GITHUB.md](GUIDE_GITHUB.md)** - Guide GitHub

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript (Vanilla)
- **Framework CSS** : Tailwind CSS (CDN)
- **Backend** : PHP 7.4+ (optionnel)
- **Base de données** : MySQL (optionnel)
- **Stockage** : localStorage (navigateur)

## 🧪 Tests

### Test Fonctionnel
```bash
# Ouvrir index.html
# Tester l'ajout au panier
# Tester le formulaire de contact
# Tester le système de devis
```

### Test Admin
```bash
# Ouvrir admin/login.html
# Se connecter (admin/evora2026)
# Ajouter un produit
# Vérifier l'affichage sur index.html
```

### Test Performance
```bash
# Ouvrir Console (F12)
# Vérifier les logs de performance
# Temps de chargement doit être < 3s
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

**EVORA DESIGN**
- 📍 Adresse : KOUMASSI, ZOE BRUNO, RUE SORO SORI 127, Abidjan, Côte d'Ivoire
- 📱 Téléphone : +225 07 48 65 51 20 / +225 05 54 17 57 94
- 📧 Email : contact@evoradesign.ci
- 🌐 Site web : [www.evoradesign.ci](https://www.evoradesign.ci)
- 💬 WhatsApp : [+225 07 48 65 51 20](https://wa.me/2250748655120)

## 🙏 Remerciements

- Tailwind CSS pour le framework CSS
- Font Awesome pour les icônes
- Google Fonts pour les polices

---

**Développé avec ❤️ pour EVORA DESIGN**

⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !
