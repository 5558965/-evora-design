# ✅ CHECKLIST AVANT PUBLICATION SUR GITHUB

## 🔒 SÉCURITÉ (CRITIQUE)

- [ ] **Changer le mot de passe admin par défaut**
  - Fichier : `admin/login.html` (ligne ~103)
  - Remplacer `'evora2026'` par un mot de passe fort
  
- [ ] **Vérifier qu'aucune information sensible n'est dans le code**
  - Pas de mots de passe en clair
  - Pas d'emails personnels
  - Pas de clés API

- [ ] **Vérifier les fichiers à exclure**
  - `.gitignore` est créé ✅
  - Fichiers temporaires exclus ✅

---

## 📝 CONTENU

- [ ] **Vérifier que tous les produits sont corrects**
  - Images présentes
  - Prix corrects
  - Descriptions complètes

- [ ] **Tester toutes les fonctionnalités**
  - [ ] Ajout au panier
  - [ ] Formulaire de contact
  - [ ] Système de devis
  - [ ] Commande
  - [ ] Admin login
  - [ ] Gestion produits

- [ ] **Vérifier les images**
  - Toutes les images sont dans le dossier `images/`
  - Pas d'images manquantes
  - Taille raisonnable (< 1MB par image)

---

## 📄 DOCUMENTATION

- [ ] **README.md est à jour**
  - Utiliser `README_GITHUB.md` comme base
  - Remplacer `VOTRE_USERNAME` par votre vrai username

- [ ] **Licence ajoutée**
  - Fichier `LICENSE` créé ✅

- [ ] **Documentation complète**
  - [ ] GUIDE_GITHUB.md ✅
  - [ ] PUBLICATION_GITHUB_RAPIDE.md ✅
  - [ ] GUIDE_DEMARRAGE_RAPIDE.md ✅
  - [ ] TACHES_COMPLETEES.md ✅

---

## 🌐 GITHUB

- [ ] **Compte GitHub créé**
  - URL : https://github.com
  - Username : _______________

- [ ] **Dépôt créé sur GitHub**
  - Nom : `evora-design`
  - Public ou Private : _______________
  - ❌ NE PAS cocher "Initialize with README"

- [ ] **Personal Access Token créé**
  - Settings → Developer settings → Tokens
  - Permissions : `repo` (Full control)
  - Token copié et sauvegardé

---

## 💻 GIT LOCAL

- [ ] **Git installé**
  - Version : 2.51.0.windows.2 ✅
  - Commande : `git --version`

- [ ] **Configuration Git (première fois)**
  ```cmd
  git config --global user.name "Votre Nom"
  git config --global user.email "votre@email.com"
  ```

---

## 🚀 PUBLICATION

### Méthode Automatique
- [ ] Double-cliquer sur `publier-github.bat`
- [ ] Entrer votre username GitHub
- [ ] Suivre les instructions
- [ ] Authentification avec Personal Access Token

### Méthode Manuelle
- [ ] `git init`
- [ ] `git add .`
- [ ] `git commit -m "Initial commit"`
- [ ] `git remote add origin https://github.com/USERNAME/evora-design.git`
- [ ] `git branch -M main`
- [ ] `git push -u origin main`

---

## 🌐 GITHUB PAGES (Optionnel)

- [ ] Aller dans Settings → Pages
- [ ] Source : `main` branch, `/ (root)`
- [ ] Save
- [ ] Attendre 2-3 minutes
- [ ] Tester : `https://USERNAME.github.io/evora-design/`

---

## ✅ VÉRIFICATION FINALE

- [ ] **Dépôt accessible sur GitHub**
  - URL : https://github.com/USERNAME/evora-design
  - Tous les fichiers présents

- [ ] **README s'affiche correctement**
  - Description claire
  - Images visibles
  - Liens fonctionnels

- [ ] **Site fonctionne sur GitHub Pages** (si activé)
  - Toutes les pages accessibles
  - Images chargées
  - Pas d'erreurs console

---

## 📊 APRÈS PUBLICATION

- [ ] **Partager le lien**
  - Avec votre équipe
  - Sur les réseaux sociaux
  - Dans votre portfolio

- [ ] **Ajouter des topics sur GitHub**
  - `e-commerce`
  - `furniture`
  - `javascript`
  - `tailwindcss`
  - `cote-ivoire`

- [ ] **Créer une belle page README**
  - Ajouter des badges
  - Ajouter des screenshots
  - Ajouter une démo live

---

## 🎯 PROCHAINES ÉTAPES

- [ ] Configurer un domaine personnalisé (optionnel)
- [ ] Ajouter Google Analytics
- [ ] Optimiser les images (WebP)
- [ ] Ajouter un Service Worker
- [ ] Créer une version PWA

---

## 📞 SUPPORT

Besoin d'aide ? Consultez :
- **GUIDE_GITHUB.md** - Guide complet
- **PUBLICATION_GITHUB_RAPIDE.md** - Guide rapide
- GitHub Docs : https://docs.github.com

---

**Date** : _______________  
**Publié par** : _______________  
**URL GitHub** : _______________  
**URL GitHub Pages** : _______________

---

✅ **TOUT EST PRÊT POUR LA PUBLICATION !**
