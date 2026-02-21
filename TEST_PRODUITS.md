# Test de Synchronisation des Produits

## Problème Résolu ✅

Les produits ajoutés dans le Dashboard admin ne s'affichaient pas sur le site principal.

## Solution Implémentée

### 1. Sauvegarde dans localStorage (Dashboard Admin)
- Les produits sont maintenant sauvegardés dans `localStorage` avec la clé `evora_products`
- Chaque ajout, modification ou suppression met à jour le localStorage
- Les produits par défaut sont chargés au premier lancement

### 2. Chargement Dynamique (Site Principal)
- Le site charge automatiquement les produits depuis localStorage
- Seuls les produits actifs avec stock > 0 sont affichés
- Limite de 6 produits sur la page d'accueil
- Les boutons "Ajouter au panier" fonctionnent avec les nouveaux produits

## Comment Tester

### Étape 1 : Ajouter un produit dans le Dashboard
1. Ouvrez `admin/products.html` dans votre navigateur
2. Cliquez sur "Ajouter un produit"
3. Remplissez le formulaire :
   - Nom : Test Produit
   - Catégorie : Canapé
   - Prix : 500000
   - Stock : 5
   - Statut : Actif
4. Cliquez sur "Enregistrer"

### Étape 2 : Vérifier sur le site
1. Ouvrez `index.html` dans votre navigateur
2. Scrollez jusqu'à la section "Catégories" (Boutique)
3. Vous devriez voir votre nouveau produit affiché
4. Le bouton "Ajouter au panier" doit fonctionner

### Étape 3 : Modifier un produit
1. Retournez dans `admin/products.html`
2. Cliquez sur l'icône d'édition (crayon) d'un produit
3. Modifiez le prix ou le nom
4. Sauvegardez
5. Rafraîchissez `index.html` - les changements doivent apparaître

### Étape 4 : Supprimer un produit
1. Dans `admin/products.html`, cliquez sur l'icône de suppression (poubelle)
2. Confirmez la suppression
3. Rafraîchissez `index.html` - le produit ne doit plus apparaître

## Fonctionnalités

### Dashboard Admin (`admin/products.html`)
- ✅ Ajout de produits avec sauvegarde automatique
- ✅ Modification de produits existants
- ✅ Suppression de produits
- ✅ Filtrage par catégorie
- ✅ Recherche de produits
- ✅ Statistiques en temps réel
- ✅ Gestion du stock et statut

### Site Principal (`index.html`)
- ✅ Chargement automatique des produits depuis localStorage
- ✅ Affichage uniquement des produits actifs
- ✅ Vérification du stock disponible
- ✅ Intégration avec le système de panier
- ✅ Fallback sur produits par défaut si localStorage vide

## Structure des Données

```javascript
{
  id: 1,
  name: "Nom du produit",
  category: "canape",
  price: 450000,
  stock: 3,
  status: "actif",
  image: "../images/produit.jpg",
  description: "Description du produit"
}
```

## Notes Importantes

1. **localStorage** : Les données sont stockées localement dans le navigateur
   - Persistantes entre les sessions
   - Limitées à ~5-10MB selon le navigateur
   - Spécifiques au domaine/origine

2. **Images** : Pour l'instant, les images utilisent des chemins locaux
   - Pour une vraie production, utilisez un système d'upload d'images
   - Les images doivent être dans le dossier `images/`

3. **Synchronisation** : 
   - Les changements sont instantanés dans le même navigateur
   - Pour synchroniser entre utilisateurs, il faudra une vraie base de données

4. **Produits par défaut** :
   - Si localStorage est vide, les produits par défaut sont chargés
   - Les produits HTML statiques restent visibles si aucun produit admin n'existe

## Prochaines Étapes (Optionnel)

Pour une solution complète en production :

1. **Base de données** : Migrer vers MySQL/PostgreSQL
2. **API Backend** : Utiliser les fichiers PHP dans `/api`
3. **Upload d'images** : Système de gestion des fichiers
4. **Authentification** : Sécuriser l'accès admin
5. **Pagination** : Pour gérer de nombreux produits
6. **Cache** : Optimiser les performances

## Dépannage

### Les produits n'apparaissent pas sur le site
- Vérifiez que le produit a le statut "actif"
- Vérifiez que le stock > 0
- Ouvrez la console du navigateur (F12) pour voir les erreurs
- Vérifiez que localStorage contient des données : `localStorage.getItem('evora_products')`

### Les images ne s'affichent pas
- Vérifiez que le chemin de l'image est correct
- Les images doivent être dans le dossier `images/`
- Utilisez des chemins relatifs corrects

### Le panier ne fonctionne pas
- Vérifiez que `script.js` est bien chargé
- Ouvrez la console pour voir les erreurs JavaScript
- Vérifiez que les attributs `data-name` et `data-price` sont présents

## Support

Si vous rencontrez des problèmes, vérifiez :
1. La console du navigateur (F12 → Console)
2. Le localStorage (F12 → Application → Local Storage)
3. Les chemins des fichiers et images
