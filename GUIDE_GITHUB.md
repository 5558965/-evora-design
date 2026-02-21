# 🚀 Guide : Publier EVORA DESIGN sur GitHub

## 📋 PRÉREQUIS

1. **Compte GitHub** : Créer un compte sur https://github.com
2. **Git installé** : Vérifier avec `git --version`
   - Si pas installé : https://git-scm.com/download/win

---

## 🔧 ÉTAPE 1 : Installer Git (si nécessaire)

### Vérifier si Git est installé
```cmd
git --version
```

### Si pas installé
1. Télécharger : https://git-scm.com/download/win
2. Installer avec les options par défaut
3. Redémarrer le terminal

---

## 🌐 ÉTAPE 2 : Créer un Dépôt sur GitHub

1. Aller sur https://github.com
2. Cliquer sur le bouton **"+"** en haut à droite
3. Sélectionner **"New repository"**
4. Remplir les informations :
   - **Repository name** : `evora-design`
   - **Description** : `Site e-commerce de meubles sur mesure - EVORA DESIGN`
   - **Public** ou **Private** (votre choix)
   - ❌ **NE PAS** cocher "Initialize with README" (on a déjà un README)
5. Cliquer sur **"Create repository"**

---

## 💻 ÉTAPE 3 : Initialiser Git Localement

Ouvrir le terminal dans le dossier du projet et exécuter :

```cmd
git init
```

---

## 📝 ÉTAPE 4 : Créer un fichier .gitignore

Créer un fichier `.gitignore` pour exclure les fichiers inutiles :

```
# Fichiers système
.DS_Store
Thumbs.db
desktop.ini

# Éditeurs
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log

# Fichiers temporaires
*.tmp
*.temp

# Node modules (si vous utilisez npm plus tard)
node_modules/

# Fichiers de sauvegarde
*.bak
*~
```

---

## 📦 ÉTAPE 5 : Ajouter les Fichiers

```cmd
git add .
```

Cette commande ajoute tous les fichiers du projet.

---

## 💬 ÉTAPE 6 : Faire le Premier Commit

```cmd
git commit -m "Initial commit - Site EVORA DESIGN complet avec toutes les fonctionnalités"
```

---

## 🔗 ÉTAPE 7 : Lier au Dépôt GitHub

Remplacer `VOTRE_USERNAME` par votre nom d'utilisateur GitHub :

```cmd
git remote add origin https://github.com/VOTRE_USERNAME/evora-design.git
```

**Exemple** : Si votre username est `abdou123` :
```cmd
git remote add origin https://github.com/abdou123/evora-design.git
```

---

## 🚀 ÉTAPE 8 : Pousser le Code sur GitHub

```cmd
git branch -M main
git push -u origin main
```

**Note** : GitHub vous demandera de vous authentifier :
- **Username** : Votre nom d'utilisateur GitHub
- **Password** : Utilisez un **Personal Access Token** (pas votre mot de passe)

### Créer un Personal Access Token
1. Aller sur GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Cocher : `repo` (Full control of private repositories)
5. Copier le token généré
6. Utiliser ce token comme mot de passe

---

## ✅ ÉTAPE 9 : Vérifier sur GitHub

1. Aller sur `https://github.com/VOTRE_USERNAME/evora-design`
2. Vérifier que tous les fichiers sont présents
3. Le README.md s'affiche automatiquement

---

## 📝 ÉTAPE 10 : Améliorer le README (Optionnel)

Créer un beau README pour présenter le projet aux visiteurs.

---

## 🔄 MISES À JOUR FUTURES

Quand vous modifiez le projet :

```cmd
# 1. Ajouter les modifications
git add .

# 2. Créer un commit avec un message descriptif
git commit -m "Description de vos modifications"

# 3. Pousser sur GitHub
git push
```

---

## 🌐 ACTIVER GITHUB PAGES (Hébergement Gratuit)

Pour héberger le site gratuitement sur GitHub :

1. Aller sur votre dépôt GitHub
2. Cliquer sur **Settings**
3. Dans le menu de gauche, cliquer sur **Pages**
4. Sous "Source", sélectionner :
   - **Branch** : `main`
   - **Folder** : `/ (root)`
5. Cliquer sur **Save**
6. Attendre 2-3 minutes
7. Votre site sera accessible à :
   ```
   https://VOTRE_USERNAME.github.io/evora-design/
   ```

**⚠️ IMPORTANT pour GitHub Pages** :
- Les chemins d'images doivent être relatifs (déjà fait ✅)
- Le site sera public même si le dépôt est privé
- Pas de backend PHP (seulement HTML/CSS/JS)

---

## 🔒 SÉCURITÉ AVANT PUBLICATION

### ⚠️ ATTENTION : Changer le Mot de Passe Admin !

Avant de publier sur GitHub, **CHANGEZ** le mot de passe admin :

1. Ouvrir `admin/login.html`
2. Ligne ~103, remplacer :
   ```javascript
   if (username === 'admin' && password === 'evora2026') {
   ```
   Par :
   ```javascript
   if (username === 'admin' && password === 'VOTRE_NOUVEAU_MOT_DE_PASSE') {
   ```

### Autres Recommandations
- ✅ Vérifier qu'aucune information sensible n'est dans le code
- ✅ Les fichiers test peuvent être supprimés ou gardés pour démo
- ✅ Ajouter une licence (MIT, GPL, etc.)

---

## 📄 AJOUTER UNE LICENCE

Créer un fichier `LICENSE` :

### Licence MIT (Recommandée)
```
MIT License

Copyright (c) 2026 EVORA DESIGN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🎯 COMMANDES RAPIDES (Résumé)

```cmd
# 1. Initialiser Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Premier commit
git commit -m "Initial commit - Site EVORA DESIGN"

# 4. Lier à GitHub (remplacer VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/evora-design.git

# 5. Pousser sur GitHub
git branch -M main
git push -u origin main
```

---

## 🆘 DÉPANNAGE

### Erreur : "git: command not found"
→ Git n'est pas installé. Installer depuis https://git-scm.com/download/win

### Erreur : "remote origin already exists"
→ Supprimer et recréer :
```cmd
git remote remove origin
git remote add origin https://github.com/VOTRE_USERNAME/evora-design.git
```

### Erreur : "Authentication failed"
→ Utiliser un Personal Access Token au lieu du mot de passe

### Erreur : "Updates were rejected"
→ Forcer le push (première fois seulement) :
```cmd
git push -u origin main --force
```

---

## 📞 SUPPORT

Pour toute question :
- 📧 Email : contact@evoradesign.ci
- 📱 Téléphone : +225 07 48 65 51 20

---

## 🔗 LIENS UTILES

- **GitHub** : https://github.com
- **Git Documentation** : https://git-scm.com/doc
- **GitHub Pages** : https://pages.github.com/
- **Markdown Guide** : https://guides.github.com/features/mastering-markdown/

---

**Date de création** : 21 février 2026  
**Version** : 1.0  
**Statut** : ✅ PRÊT À PUBLIER
