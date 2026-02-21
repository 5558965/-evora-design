# 🚀 GUIDE DE DÉMARRAGE RAPIDE - EVORA DESIGN

## ⚡ ACCÈS RAPIDE

### 🌐 Site Public
**URL** : `index.html`
- Page d'accueil avec tous les produits
- Formulaire de contact avec CAPTCHA
- Panier d'achat fonctionnel

### 🔐 Administration
**URL** : `admin/login.html`
- **Username** : `admin`
- **Password** : `evora2026`

---

## 📦 GESTION DES PRODUITS

### Ajouter un Produit
1. Ouvrir `admin/login.html`
2. Se connecter (admin/evora2026)
3. Cliquer sur "Gestion Produits"
4. Remplir le formulaire :
   - Nom du produit
   - Prix (en FCFA)
   - Description
   - Catégorie
   - Stock
   - Image (choisir depuis `images/`)
   - Status : "actif"
5. Cliquer sur "Ajouter le produit"
6. ✅ Le produit apparaît immédiatement sur `index.html`

### Modifier un Produit
1. Dans "Gestion Produits"
2. Cliquer sur "Modifier" sur le produit
3. Modifier les informations
4. Cliquer sur "Enregistrer"

### Supprimer un Produit
1. Dans "Gestion Produits"
2. Cliquer sur "Supprimer" sur le produit
3. Confirmer la suppression

---

## 🔒 SÉCURITÉ

### Changer le Mot de Passe Admin
1. Ouvrir `admin/login.html` dans un éditeur de code
2. Chercher la ligne ~103 :
   ```javascript
   if (username === 'admin' && password === 'evora2026') {
   ```
3. Remplacer `'evora2026'` par votre nouveau mot de passe
4. Sauvegarder le fichier

### CAPTCHA
- ✅ Activé automatiquement sur le formulaire de contact
- Question mathématique aléatoire
- Empêche le spam

### Sauvegardes Automatiques
- ✅ Toutes les 30 minutes
- Sauvegarde : produits, panier, devis, statistiques
- Restaurer une sauvegarde :
  ```javascript
  // Dans la Console (F12)
  window.EvoraSecurity.restoreBackup()
  ```

---

## 📊 VÉRIFIER LES PERFORMANCES

### Console du Navigateur
1. Ouvrir `index.html`
2. Appuyer sur F12 (ouvrir la Console)
3. Recharger la page (Ctrl+R)
4. Vérifier les messages :
   ```
   🚀 Optimisation des performances...
   ✅ Optimisations appliquées
   📊 Performance Metrics:
     ⏱️ Temps de chargement total: X.XXs
   ```

### Objectif
- ⏱️ Temps de chargement : < 3 secondes

---

## 🐛 DÉPANNAGE

### Les produits ne s'affichent pas
1. Ouvrir la Console (F12)
2. Vérifier les logs :
   ```
   === DEBUG PRODUITS ===
   localStorage evora_products: EXISTE
   Total produits: X
   Produits actifs avec stock: X
   ```
3. Si "VIDE" : Ajouter des produits dans le Dashboard
4. Si produits existent mais ne s'affichent pas :
   - Vérifier que `status === 'actif'`
   - Vérifier que `stock > 0`

### Impossible de se connecter à l'Admin
1. Vérifier les identifiants :
   - Username : `admin`
   - Password : `evora2026`
2. Vider le cache du navigateur (Ctrl+Shift+Delete)
3. Réessayer

### Le CAPTCHA ne fonctionne pas
1. Ouvrir la Console (F12)
2. Vérifier que `js/security.js` est chargé
3. Vérifier les erreurs JavaScript

### Page lente à charger
1. Ouvrir la Console (F12)
2. Vérifier le temps de chargement
3. Si > 3 secondes :
   - Compresser les images dans `images/`
   - Vérifier la connexion internet

---

## 📱 TEST RESPONSIVE

### Chrome DevTools
1. Ouvrir `index.html`
2. Appuyer sur F12
3. Cliquer sur l'icône "Toggle device toolbar" (Ctrl+Shift+M)
4. Sélectionner un appareil :
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

---

## 📄 DOCUMENTATION COMPLÈTE

### Fichiers de Documentation
1. **TACHES_COMPLETEES.md** - Résumé de toutes les tâches
2. **SECURITE_ADMIN.md** - Documentation authentification
3. **FONCTIONNALITES_SECURITE.md** - Documentation sécurité
4. **OPTIMISATION_PERFORMANCE_SEO.md** - Documentation performance/SEO
5. **GUIDE_DEMARRAGE_RAPIDE.md** - Ce fichier

---

## 🎯 CHECKLIST DE LANCEMENT

Avant de mettre le site en ligne :

### Sécurité
- [ ] Changer le mot de passe admin par défaut
- [ ] Vérifier que le lien Admin n'est pas visible sur le site
- [ ] Tester le CAPTCHA sur le formulaire de contact
- [ ] Configurer SSL/TLS sur le serveur

### Contenu
- [ ] Ajouter tous les produits
- [ ] Vérifier les images (toutes chargées)
- [ ] Vérifier les prix
- [ ] Vérifier les descriptions

### SEO
- [ ] Soumettre `sitemap.xml` à Google Search Console
- [ ] Vérifier les meta tags
- [ ] Tester avec Google PageSpeed Insights
- [ ] Tester avec Mobile-Friendly Test

### Performance
- [ ] Vérifier temps de chargement < 3s
- [ ] Compresser les images si nécessaire
- [ ] Tester sur mobile/tablette/desktop

### Fonctionnalité
- [ ] Tester l'ajout au panier
- [ ] Tester le formulaire de contact
- [ ] Tester le formulaire de devis
- [ ] Tester la commande

---

## 📞 SUPPORT

Pour toute question :
- 📧 Email : contact@evoradesign.ci
- 📱 Téléphone : +225 07 48 65 51 20
- 📱 WhatsApp : +225 07 48 65 51 20

---

## 🔗 LIENS UTILES

### Outils SEO
- Google Search Console : https://search.google.com/search-console
- Google PageSpeed Insights : https://pagespeed.web.dev/
- Mobile-Friendly Test : https://search.google.com/test/mobile-friendly

### Outils Images
- TinyPNG (compression) : https://tinypng.com/
- Squoosh (compression) : https://squoosh.app/

### SSL/TLS
- Let's Encrypt : https://letsencrypt.org/
- Cloudflare : https://www.cloudflare.com/

---

**Date de création** : 21 février 2026  
**Version** : 1.0  
**Statut** : ✅ PRÊT À L'EMPLOI
