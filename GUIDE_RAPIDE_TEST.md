# 🚀 Guide Rapide de Test - Correction Images

## Problème Résolu ✅

Les images des produits ne s'affichaient pas dans la section "Catégories" du site.

## Cause du Problème

Les chemins d'images étaient stockés avec `../images/` (relatif au dossier admin), mais le site principal a besoin de `images/` (sans le `../`).

## Solution Appliquée

1. **Stockage unifié** : Les produits sont maintenant stockés avec le chemin `images/` (sans `../`)
2. **Conversion automatique** : 
   - Dans le Dashboard admin : ajoute automatiquement `../` pour l'affichage
   - Sur le site principal : enlève automatiquement `../` si présent
3. **Fallback** : Si une image ne charge pas, affiche une image placeholder

## 🧪 Test Rapide (3 étapes)

### Étape 1 : Réinitialiser le localStorage
Ouvrez la console du navigateur (F12) et tapez :
```javascript
localStorage.clear()
```

### Étape 2 : Ajouter un produit
1. Ouvrez `admin/products.html`
2. Cliquez sur "Ajouter un produit"
3. Remplissez :
   - Nom : Test Fenêtre
   - Catégorie : Autre
   - Prix : 500000
   - Stock : 5
   - Statut : Actif
4. Cliquez sur "Enregistrer"

### Étape 3 : Vérifier sur le site
1. Ouvrez `index.html`
2. Scrollez jusqu'à "Catégories"
3. ✅ Vous devriez voir votre produit avec l'image !

## 🔍 Vérification Console

Ouvrez la console (F12) sur `index.html` et vous verrez :
```
Produits chargés: X
Produits actifs avec stock: X
Affichage de X produits
Produits affichés avec succès
```

## 📝 Vérification localStorage

Dans la console, tapez :
```javascript
JSON.parse(localStorage.getItem('evora_products'))
```

Vous devriez voir vos produits avec des chemins comme :
```json
{
  "id": 1,
  "name": "Canapé Bois Noble",
  "image": "images/Canapé Bois Noble.jpg",
  ...
}
```

## ⚠️ Points Importants

1. **Chemins d'images** : Toujours utiliser `images/nom-fichier.jpg` (sans `../`)
2. **Images manquantes** : Si une image n'existe pas, un placeholder s'affiche
3. **Produits actifs** : Seuls les produits avec statut "actif" et stock > 0 s'affichent
4. **Limite d'affichage** : Maximum 6 produits sur la page d'accueil

## 🐛 Dépannage

### Les images ne s'affichent toujours pas ?

1. **Vérifiez le chemin** :
   ```javascript
   // Dans la console
   const products = JSON.parse(localStorage.getItem('evora_products'));
   console.log(products[0].image); // Doit être "images/..."
   ```

2. **Vérifiez que l'image existe** :
   - Ouvrez le dossier `images/`
   - Vérifiez que le fichier existe avec le bon nom

3. **Videz le cache** :
   - Ctrl + Shift + R (Windows)
   - Cmd + Shift + R (Mac)

4. **Réinitialisez tout** :
   ```javascript
   localStorage.clear()
   location.reload()
   ```

## 📊 Structure des Chemins

```
Projet/
├── index.html              → Utilise "images/"
├── images/
│   └── produit.jpg
├── admin/
│   └── products.html       → Stocke "images/" mais affiche "../images/"
└── script.js               → Convertit automatiquement les chemins
```

## ✨ Fonctionnalités

- ✅ Ajout de produits avec images
- ✅ Modification de produits
- ✅ Suppression de produits
- ✅ Affichage automatique sur le site
- ✅ Gestion des images manquantes
- ✅ Conversion automatique des chemins
- ✅ Logs de debug dans la console

## 🎯 Prochaines Étapes

Pour une solution complète :
1. Système d'upload d'images réel
2. Stockage en base de données
3. API backend pour la synchronisation
4. Optimisation des images (compression, formats WebP)

---

**Besoin d'aide ?** Ouvrez la console (F12) et vérifiez les messages d'erreur.
