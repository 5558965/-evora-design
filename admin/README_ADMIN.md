# 🔐 Système d'Administration EVORA DESIGN

## 📋 Vue d'ensemble

Système de back-office complet pour gérer le site EVORA DESIGN avec toutes les fonctionnalités administrateur.

## 🚀 Accès

**URL:** `admin/login.html`

**Identifiants par défaut:**
- Nom d'utilisateur: `admin`
- Mot de passe: `evora2026`

⚠️ **IMPORTANT:** Changez ces identifiants en production !

## 📁 Structure des fichiers

```
admin/
├── login.html              # Page de connexion
├── dashboard.html          # Tableau de bord principal
├── products.html           # Gestion des produits (à créer)
├── categories.html         # Gestion des catégories (à créer)
├── devis-list.html        # Liste des demandes de devis
├── gallery.html           # Gestion de la galerie (à créer)
├── statistics.html        # Statistiques détaillées (à créer)
├── admin-auth.js          # Système d'authentification
├── admin-dashboard.js     # Logique du dashboard
├── devis-manager.js       # Gestion des devis
└── README_ADMIN.md        # Cette documentation
```

## ✨ Fonctionnalités implémentées

### 1. Authentification
- ✅ Page de connexion sécurisée
- ✅ Session avec expiration (24h)
- ✅ Protection des pages admin
- ✅ Déconnexion

### 2. Tableau de bord
- ✅ Statistiques en temps réel:
  - Nombre total de visites
  - Demandes de devis
  - Nombre de produits
  - Nombre de photos
- ✅ Activités récentes
- ✅ Demandes en attente

### 3. Gestion des demandes de devis
- ✅ Liste complète des demandes
- ✅ Filtrage par statut (En attente, Traité, Rejeté)
- ✅ Recherche par nom, email, type
- ✅ Détails complets de chaque demande
- ✅ Mise à jour du statut
- ✅ Suppression
- ✅ Liens directs (tel:, mailto:)

### 4. Tracking des visites
- ✅ Compteur de visites total
- ✅ Visites par jour
- ✅ Visites par page
- ✅ Enregistrement automatique

### 5. Journal d'activités
- ✅ Enregistrement de toutes les actions
- ✅ Horodatage
- ✅ Historique des 100 dernières activités

## 💾 Stockage des données

Toutes les données sont stockées dans le `localStorage` du navigateur:

| Clé | Description |
|-----|-------------|
| `admin_visits` | Statistiques de visites |
| `admin_devis` | Demandes de devis |
| `admin_products` | Liste des produits |
| `admin_photos` | Galerie photos |
| `admin_activities` | Journal d'activités |

## 🔧 Utilisation

### Connexion
1. Accédez à `admin/login.html`
2. Entrez les identifiants
3. Cliquez sur "Se connecter"

### Gestion des devis
1. Cliquez sur "Demandes de devis" dans le menu
2. Utilisez les filtres pour trier
3. Cliquez sur "Voir" pour les détails
4. Marquez comme "Traité" ou "Rejeté"

### Consultation des statistiques
1. Le dashboard affiche les stats principales
2. Les graphiques se mettent à jour automatiquement
3. Les activités récentes sont affichées en temps réel

## 🔒 Sécurité

### Recommandations de production

1. **Changer les identifiants par défaut**
   - Modifier dans `login.html` ligne 95-98

2. **Utiliser une vraie base de données**
   - Remplacer localStorage par une API backend
   - Utiliser MySQL, PostgreSQL ou MongoDB

3. **Ajouter le chiffrement**
   - Hasher les mots de passe (bcrypt)
   - Utiliser HTTPS
   - Tokens JWT pour les sessions

4. **Limiter les tentatives de connexion**
   - Ajouter un système de rate limiting
   - Bloquer après X tentatives échouées

5. **Logs serveur**
   - Enregistrer toutes les actions admin
   - Surveiller les accès suspects

## 📊 Fonctionnalités à développer

### Pages à créer

1. **products.html** - Gestion des produits
   - Ajouter/Modifier/Supprimer des produits
   - Upload d'images
   - Gestion des prix et catégories

2. **categories.html** - Gestion des catégories
   - Créer des catégories
   - Organiser les produits
   - Ordre d'affichage

3. **gallery.html** - Gestion de la galerie
   - Upload multiple d'images
   - Organisation par albums
   - Modification des légendes

4. **statistics.html** - Statistiques avancées
   - Graphiques de visites
   - Analyse des pages populaires
   - Taux de conversion
   - Export des données

### Améliorations suggérées

- [ ] Système de notifications push
- [ ] Export des devis en PDF
- [ ] Envoi d'emails automatiques
- [ ] Gestion multi-utilisateurs
- [ ] Rôles et permissions
- [ ] Sauvegarde automatique
- [ ] Mode sombre
- [ ] Application mobile

## 🛠️ Développement

### Ajouter une nouvelle page admin

1. Créer le fichier HTML dans `/admin`
2. Inclure `admin-auth.js` pour la protection
3. Ajouter le lien dans la sidebar
4. Créer le fichier JS associé

### Exemple de structure

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma Page - Admin</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Sidebar -->
  <!-- Contenu -->
  <script src="admin-auth.js"></script>
  <script src="ma-page.js"></script>
</body>
</html>
```

## 📞 Support

Pour toute question ou problème:
- Email: contact@evoradesign.ci
- Téléphone: +225 07 48 65 51 20

## 📝 Changelog

### Version 1.0.0 (2026-02-20)
- ✅ Système d'authentification
- ✅ Dashboard avec statistiques
- ✅ Gestion des demandes de devis
- ✅ Tracking des visites
- ✅ Journal d'activités

---

© 2026 EVORA DESIGN - Tous droits réservés
