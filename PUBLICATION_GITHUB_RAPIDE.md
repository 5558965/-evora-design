# 🚀 Publication GitHub - Guide Ultra Rapide

## ⚡ MÉTHODE AUTOMATIQUE (Recommandée)

### 1️⃣ Créer le Dépôt sur GitHub
1. Aller sur https://github.com
2. Cliquer sur **"+"** → **"New repository"**
3. Nom : `evora-design`
4. Description : `Site e-commerce de meubles sur mesure`
5. **Public** ou **Private**
6. ❌ **NE PAS** cocher "Initialize with README"
7. Cliquer sur **"Create repository"**

### 2️⃣ Exécuter le Script Automatique
1. Double-cliquer sur `publier-github.bat`
2. Entrer votre nom d'utilisateur GitHub
3. Suivre les instructions à l'écran
4. ✅ Terminé !

---

## 💻 MÉTHODE MANUELLE

### Commandes à Exécuter

Ouvrir le terminal (CMD) dans le dossier du projet :

```cmd
# 1. Initialiser Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Premier commit
git commit -m "Initial commit - Site EVORA DESIGN complet"

# 4. Lier à GitHub (remplacer VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/evora-design.git

# 5. Configurer la branche
git branch -M main

# 6. Pousser sur GitHub
git push -u origin main
```

---

## 🔑 AUTHENTIFICATION

GitHub vous demandera :
- **Username** : Votre nom d'utilisateur GitHub
- **Password** : Utilisez un **Personal Access Token**

### Créer un Personal Access Token
1. GitHub → **Settings** → **Developer settings**
2. **Personal access tokens** → **Tokens (classic)**
3. **Generate new token (classic)**
4. Nom : `evora-design-token`
5. Cocher : ✅ **repo** (Full control)
6. **Generate token**
7. **Copier le token** (vous ne le reverrez plus !)
8. Utiliser ce token comme mot de passe

---

## 🌐 ACTIVER GITHUB PAGES (Hébergement Gratuit)

1. Aller sur votre dépôt : `https://github.com/VOTRE_USERNAME/evora-design`
2. Cliquer sur **Settings**
3. Menu gauche → **Pages**
4. Source :
   - **Branch** : `main`
   - **Folder** : `/ (root)`
5. **Save**
6. Attendre 2-3 minutes
7. ✅ Site accessible à : `https://VOTRE_USERNAME.github.io/evora-design/`

---

## ⚠️ AVANT DE PUBLIER

### Changer le Mot de Passe Admin !
1. Ouvrir `admin/login.html`
2. Ligne ~103, modifier :
   ```javascript
   if (username === 'admin' && password === 'NOUVEAU_MOT_DE_PASSE') {
   ```
3. Sauvegarder

### Vérifications
- ✅ Mot de passe admin changé
- ✅ Pas d'informations sensibles dans le code
- ✅ Toutes les images sont présentes
- ✅ Le site fonctionne localement

---

## 🔄 MISES À JOUR FUTURES

Après avoir modifié le projet :

```cmd
git add .
git commit -m "Description de vos modifications"
git push
```

---

## 🆘 PROBLÈMES COURANTS

### "git: command not found"
→ Installer Git : https://git-scm.com/download/win

### "remote origin already exists"
```cmd
git remote remove origin
git remote add origin https://github.com/VOTRE_USERNAME/evora-design.git
```

### "Authentication failed"
→ Utiliser un Personal Access Token, pas votre mot de passe

### "Updates were rejected"
```cmd
git push -u origin main --force
```

---

## 📞 BESOIN D'AIDE ?

Consultez le guide complet : **GUIDE_GITHUB.md**

---

**Temps estimé** : 5-10 minutes ⏱️  
**Difficulté** : Facile 🟢
