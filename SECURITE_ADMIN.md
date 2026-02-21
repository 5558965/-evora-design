# 🔒 Sécurité Administration - EVORA DESIGN

## ✅ Mesures de Sécurité Implémentées

### 1. Lien Admin Masqué
- ❌ Le lien "Admin" a été **supprimé du footer** du site public
- ✅ Accès uniquement via URL directe : `admin/login.html`
- ✅ Balise `<meta name="robots" content="noindex, nofollow">` sur toutes les pages admin

### 2. Authentification par Mot de Passe
- ✅ Page de connexion sécurisée (`admin/login.html`)
- ✅ Identifiants requis pour accéder au Dashboard
- ✅ Session stockée dans `sessionStorage`

### 3. Protection des Pages Admin
- ✅ Script `admin-auth.js` vérifie l'authentification
- ✅ Redirection automatique vers login si non connecté
- ✅ Toutes les pages admin sont protégées

### 4. Expiration de Session
- ✅ Session expire après **4 heures**
- ✅ Déconnexion automatique après **30 minutes d'inactivité**
- ✅ Vérification périodique toutes les 5 minutes

## 🔑 Identifiants par Défaut

**⚠️ IMPORTANT : À CHANGER IMMÉDIATEMENT**

```
Nom d'utilisateur : admin
Mot de passe : evora2026
```

### Comment Changer le Mot de Passe

1. Ouvrez `admin/login.html`
2. Trouvez cette section (ligne ~103) :
```javascript
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'evora2026'  // ← CHANGEZ ICI
};
```
3. Modifiez le mot de passe
4. Sauvegardez le fichier

## 🚀 Comment Accéder à l'Admin

### Méthode 1 : URL Directe
Tapez dans votre navigateur :
```
http://votre-site.com/admin/login.html
```

### Méthode 2 : Favori/Marque-page
1. Allez sur `admin/login.html`
2. Ajoutez la page aux favoris (Ctrl+D)
3. Utilisez le favori pour accéder rapidement

### Méthode 3 : Raccourci Bureau (Windows)
1. Créez un fichier `admin.url` sur votre bureau
2. Contenu :
```
[InternetShortcut]
URL=http://localhost/evora-design/admin/login.html
```

## 🔐 Fonctionnement de la Sécurité

### Flux d'Authentification

```
1. Utilisateur → admin/login.html
2. Entre identifiants
3. Si correct → sessionStorage.setItem('adminLoggedIn', 'true')
4. Redirection → dashboard.html
5. admin-auth.js vérifie la session
6. Si valide → Accès autorisé
7. Si invalide → Retour au login
```

### Protection des Pages

Chaque page admin charge `admin-auth.js` qui :
1. ✅ Vérifie si `adminLoggedIn === 'true'`
2. ✅ Vérifie l'expiration de la session
3. ✅ Vérifie l'inactivité
4. ❌ Redirige vers login si problème

## 📋 Pages Protégées

Toutes ces pages nécessitent une authentification :
- ✅ `admin/dashboard.html`
- ✅ `admin/products.html`
- ✅ `admin/categories.html`
- ✅ `admin/orders.html`
- ✅ `admin/messages.html`
- ✅ `admin/users.html`
- ✅ `admin/settings.html`
- ✅ `admin/devis-list.html`

## 🛡️ Recommandations de Sécurité

### Pour un Site en Production

1. **Changez les identifiants par défaut** ⚠️
2. **Utilisez HTTPS** (certificat SSL)
3. **Renommez le dossier admin** (ex: `gestion-evora-2026`)
4. **Ajoutez un fichier .htaccess** :
```apache
AuthType Basic
AuthName "Zone Administrateur"
AuthUserFile /chemin/.htpasswd
Require valid-user
```

5. **Limitez les tentatives de connexion**
6. **Activez la double authentification (2FA)**
7. **Utilisez une vraie base de données** avec mots de passe hashés
8. **Logs des connexions** pour détecter les tentatives suspectes

### Protection .htaccess (Optionnel)

Créez `admin/.htaccess` :
```apache
# Bloquer l'accès direct aux fichiers sensibles
<Files "admin-auth.js">
    Order Allow,Deny
    Deny from all
</Files>

# Protection par mot de passe (nécessite .htpasswd)
# AuthType Basic
# AuthName "Administration EVORA"
# AuthUserFile /chemin/vers/.htpasswd
# Require valid-user
```

## 🔄 Déconnexion

### Automatique
- Après 4 heures de connexion
- Après 30 minutes d'inactivité
- En fermant le navigateur (sessionStorage)

### Manuelle
Cliquez sur "Déconnexion" dans le menu admin

## 🧪 Test de Sécurité

### Vérifier que la protection fonctionne :

1. **Sans connexion** :
   - Essayez d'accéder à `admin/dashboard.html`
   - Vous devez être redirigé vers `login.html`

2. **Avec connexion** :
   - Connectez-vous via `login.html`
   - Accédez à `dashboard.html`
   - Vous devez voir le dashboard

3. **Expiration** :
   - Connectez-vous
   - Attendez 30 minutes sans activité
   - Rechargez la page
   - Vous devez être déconnecté

## 📊 Monitoring

### Vérifier qui est connecté

Dans la console du navigateur (F12) :
```javascript
// Vérifier la session
console.log('Connecté:', sessionStorage.getItem('adminLoggedIn'));
console.log('Utilisateur:', sessionStorage.getItem('adminUsername'));
console.log('Depuis:', new Date(parseInt(sessionStorage.getItem('loginTime'))));
```

## ⚠️ Limitations Actuelles

Le système actuel utilise `sessionStorage` qui a des limitations :

1. **Pas de synchronisation** entre onglets
2. **Pas de protection côté serveur**
3. **Identifiants en clair** dans le code JavaScript
4. **Pas de logs** des connexions
5. **Pas de limitation** des tentatives

### Pour une Vraie Production

Il faudrait :
- Backend PHP avec sessions serveur
- Base de données pour les utilisateurs
- Mots de passe hashés (bcrypt)
- Tokens JWT
- Rate limiting
- Logs de sécurité

## 📞 Support

Si vous avez des questions sur la sécurité :
1. Vérifiez que `admin-auth.js` est chargé sur chaque page
2. Testez la connexion/déconnexion
3. Vérifiez la console pour les erreurs

## ✨ Résumé

Votre administration est maintenant :
- ✅ **Cachée** du site public
- ✅ **Protégée** par mot de passe
- ✅ **Sécurisée** avec expiration de session
- ✅ **Accessible** uniquement via URL directe

**N'oubliez pas de changer le mot de passe par défaut !** 🔐
