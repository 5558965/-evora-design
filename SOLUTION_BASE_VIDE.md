# 🔧 Solution : Base de données vide

## 🎯 Problème

Vous avez créé la base de données `evora_design` manuellement dans phpMyAdmin, puis essayé d'importer le fichier SQL. Résultat : la base existe mais est vide.

## ✅ Solution Rapide

### Option 1 : Supprimer et Réimporter (Recommandé)

#### Étape 1 : Supprimer la base vide
1. Ouvrez phpMyAdmin : `http://localhost/phpmyadmin`
2. Cliquez sur `evora_design` dans la liste de gauche
3. Cliquez sur l'onglet "Opérations"
4. Faites défiler vers le bas
5. Cliquez sur "Supprimer la base de données (DROP)"
6. Confirmez

#### Étape 2 : Importer le fichier SQL complet
1. Dans phpMyAdmin, cliquez sur l'onglet "Importer" (en haut)
2. Cliquez sur "Choisir un fichier"
3. Sélectionnez `database/evora_design.sql`
4. Faites défiler vers le bas
5. Cliquez sur "Exécuter"

✅ **Résultat :** La base `evora_design` sera créée avec toutes les tables et données

---

### Option 2 : Importer dans la base existante

Si vous ne voulez pas supprimer la base :

#### Étape 1 : Sélectionner la base
1. Dans phpMyAdmin, cliquez sur `evora_design` dans la liste de gauche

#### Étape 2 : Importer le fichier
1. Cliquez sur l'onglet "Importer"
2. Cliquez sur "Choisir un fichier"
3. Sélectionnez `database/evora_design.sql`
4. Faites défiler vers le bas
5. Cliquez sur "Exécuter"

✅ **Résultat :** Les tables seront créées dans la base existante

---

### Option 3 : Via ligne de commande

#### Étape 1 : Supprimer la base vide
```cmd
mysql -u root -p -e "DROP DATABASE IF EXISTS evora_design;"
```

#### Étape 2 : Importer le fichier SQL
```cmd
cd C:\xampp\htdocs\evora-design
mysql -u root -p < database\evora_design.sql
```

---

## 🔍 Vérification

Après l'import, vérifiez que tout est bien créé :

### Via phpMyAdmin :
1. Cliquez sur `evora_design` dans la liste de gauche
2. Vous devriez voir **12 tables** :
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
   - sessions

### Via SQL :
```sql
USE evora_design;
SHOW TABLES;
```

Vous devriez voir :
```
+-------------------------+
| Tables_in_evora_design  |
+-------------------------+
| activites               |
| admins                  |
| categories              |
| commandes               |
| commandes_items         |
| devis                   |
| galerie                 |
| parametres              |
| produits                |
| produits_images         |
| sessions                |
| visites                 |
+-------------------------+
12 rows in set
```

### Vérifier les données de test :
```sql
SELECT * FROM admins;
```

Vous devriez voir 1 ligne avec l'admin par défaut.

---

## 📊 Contenu Attendu

Après l'import réussi, voici ce que vous devriez avoir :

### Tables (12)
✅ Toutes les tables créées avec leurs colonnes

### Vues (3)
- `stats_globales`
- `visites_par_jour`
- `produits_populaires`

### Procédures stockées (2)
- `enregistrer_visite()`
- `creer_commande()`

### Triggers (2)
- `increment_product_views`
- `update_product_timestamp`

### Données de test
- 1 administrateur (username: admin, password: evora2026)
- 15 catégories de produits
- 3 produits de démonstration

---

## 🐛 Si ça ne fonctionne toujours pas

### Vérifier les erreurs dans phpMyAdmin

Lors de l'import, regardez les messages en haut de la page :
- ✅ Vert = Succès
- ❌ Rouge = Erreur

### Erreurs courantes

#### Erreur : "Table already exists"
**Solution :** Supprimez la base et réimportez (Option 1)

#### Erreur : "Access denied"
**Solution :** Vérifiez les permissions de votre utilisateur MySQL

#### Erreur : "Unknown database"
**Solution :** Le fichier SQL crée la base automatiquement, pas besoin de la créer avant

---

## 💡 Conseil Important

**NE CRÉEZ PAS la base de données manuellement !**

Le fichier `evora_design.sql` contient déjà l'instruction :
```sql
CREATE DATABASE IF NOT EXISTS evora_design;
```

Il crée automatiquement la base de données avec toutes les tables.

---

## 🎯 Procédure Correcte (Résumé)

1. **NE PAS** créer la base manuellement
2. Ouvrir phpMyAdmin
3. Cliquer sur "Importer" (sans sélectionner de base)
4. Choisir `database/evora_design.sql`
5. Cliquer sur "Exécuter"
6. ✅ La base `evora_design` est créée avec tout son contenu

---

## ✅ Checklist de Vérification

Après l'import, vérifiez :

- [ ] La base `evora_design` existe
- [ ] 12 tables sont présentes
- [ ] La table `admins` contient 1 ligne
- [ ] La table `categories` contient 15 lignes
- [ ] La table `produits` contient 3 lignes
- [ ] Les vues SQL existent (stats_globales, etc.)
- [ ] Les procédures stockées existent

### Commande de vérification rapide :
```sql
USE evora_design;
SELECT 
    (SELECT COUNT(*) FROM admins) as nb_admins,
    (SELECT COUNT(*) FROM categories) as nb_categories,
    (SELECT COUNT(*) FROM produits) as nb_produits,
    (SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'evora_design') as nb_tables;
```

**Résultat attendu :**
```
+-----------+---------------+-------------+-----------+
| nb_admins | nb_categories | nb_produits | nb_tables |
+-----------+---------------+-------------+-----------+
|         1 |            15 |           3 |        12 |
+-----------+---------------+-------------+-----------+
```

---

## 📞 Besoin d'aide ?

Si le problème persiste :

1. Faites une capture d'écran du message d'erreur
2. Vérifiez que MySQL est bien démarré
3. Vérifiez que vous avez les droits d'administration
4. Essayez avec un autre navigateur

---

© 2026 EVORA DESIGN - Tous droits réservés
