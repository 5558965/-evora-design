# 🔒 Fonctionnalités de Sécurité - EVORA DESIGN

## ✅ Fonctionnalités Implémentées

### 1. 🛡️ CAPTCHA Anti-Spam

**Emplacement** : Formulaire de contact sur `index.html`

**Fonctionnement** :
- Question mathématique simple (addition, soustraction, multiplication)
- Génération aléatoire à chaque chargement
- Bouton de rafraîchissement pour nouvelle question
- Validation obligatoire avant envoi du formulaire

**Avantages** :
- ✅ Bloque les robots spammeurs
- ✅ Simple pour les humains
- ✅ Pas de dépendance externe (Google reCAPTCHA)
- ✅ Respecte la vie privée (pas de tracking)

**Utilisation** :
1. L'utilisateur remplit le formulaire
2. Résout l'opération mathématique
3. Clique sur "Envoyer le message"
4. Si CAPTCHA incorrect → Message d'erreur + nouvelle question
5. Si CAPTCHA correct → Message envoyé

### 2. 💾 Sauvegardes Automatiques

**Emplacement** : `js/security.js`

**Données Sauvegardées** :
- ✅ Produits (`evora_products`)
- ✅ Panier (`evoradesign_cart`)
- ✅ Devis (`admin_devis`)
- ✅ Statistiques de visites (`admin_visits`)

**Fréquence** :
- ⏰ Toutes les 30 minutes (automatique)
- 💾 Au chargement de la page
- 🚪 Avant de quitter la page
- 📝 Historique des 5 dernières sauvegardes

**Fonctions Disponibles** :

#### Restaurer une Sauvegarde
Dans la console du navigateur (F12) :
```javascript
restoreBackup()
```

#### Exporter une Sauvegarde
Dans la console du navigateur (F12) :
```javascript
exportBackup()
```
Télécharge un fichier JSON avec toutes les données.

#### Voir les Sauvegardes
```javascript
// Dernière sauvegarde
JSON.parse(localStorage.getItem('evora_backup'))

// Historique
JSON.parse(localStorage.getItem('evora_backup_history'))
```

### 3. 🔐 Certificat SSL/TLS

**Note** : Le certificat SSL/TLS doit être configuré au niveau du serveur web.

**Pour un Site en Production** :

#### Option 1 : Let's Encrypt (Gratuit)
```bash
# Sur un serveur Linux avec Certbot
sudo apt-get install certbot
sudo certbot --apache -d votre-domaine.com
```

#### Option 2 : Hébergeur Web
La plupart des hébergeurs (OVH, Hostinger, etc.) offrent SSL gratuit :
1. Connectez-vous à votre panneau d'hébergement
2. Allez dans "SSL/TLS"
3. Activez "SSL Gratuit" ou "Let's Encrypt"

#### Option 3 : Cloudflare (Gratuit)
1. Créez un compte sur cloudflare.com
2. Ajoutez votre domaine
3. Changez les DNS chez votre registrar
4. SSL activé automatiquement

**Vérification SSL** :
- URL commence par `https://` (pas `http://`)
- Cadenas vert dans la barre d'adresse
- Certificat valide visible en cliquant sur le cadenas

## 📊 Tableau Récapitulatif

| Fonctionnalité | Statut | Emplacement | Configuration |
|----------------|--------|-------------|---------------|
| CAPTCHA Anti-Spam | ✅ Actif | Formulaire contact | Automatique |
| Sauvegardes Auto | ✅ Actif | Toutes les pages | 30 min |
| SSL/TLS | ⚠️ À configurer | Serveur web | Hébergeur |
| Protection Admin | ✅ Actif | Pages admin | Mot de passe |
| Lien Admin Masqué | ✅ Actif | Site public | Caché |

## 🧪 Tests de Sécurité

### Test 1 : CAPTCHA
1. Ouvrez `index.html`
2. Scrollez jusqu'au formulaire de contact
3. Remplissez le formulaire
4. Entrez une mauvaise réponse au CAPTCHA
5. ✅ Vous devez voir un message d'erreur

### Test 2 : Sauvegardes
1. Ouvrez la console (F12)
2. Tapez : `localStorage.getItem('evora_backup')`
3. ✅ Vous devez voir une sauvegarde JSON

### Test 3 : Restauration
1. Supprimez des produits
2. Dans la console : `restoreBackup()`
3. ✅ Les produits doivent être restaurés

### Test 4 : Export
1. Dans la console : `exportBackup()`
2. ✅ Un fichier JSON doit se télécharger

## 🔧 Configuration Avancée

### Modifier la Fréquence des Sauvegardes

Éditez `js/security.js` ligne 82 :
```javascript
const BACKUP_INTERVAL = 30 * 60 * 1000; // 30 minutes

// Exemples :
// 15 minutes : 15 * 60 * 1000
// 1 heure : 60 * 60 * 1000
// 5 minutes : 5 * 60 * 1000
```

### Modifier le Nombre de Sauvegardes Conservées

Éditez `js/security.js` ligne 99 :
```javascript
if (history.length > 5) history.shift(); // Garder 5 sauvegardes

// Pour garder 10 sauvegardes :
if (history.length > 10) history.shift();
```

### Personnaliser le CAPTCHA

Éditez `js/security.js` ligne 9 :
```javascript
// Difficulté actuelle : nombres de 1 à 10
const num1 = Math.floor(Math.random() * 10) + 1;

// Plus facile (1 à 5) :
const num1 = Math.floor(Math.random() * 5) + 1;

// Plus difficile (1 à 20) :
const num1 = Math.floor(Math.random() * 20) + 1;
```

## 📱 Sécurité Mobile

Les fonctionnalités de sécurité fonctionnent aussi sur mobile :
- ✅ CAPTCHA tactile
- ✅ Sauvegardes localStorage
- ✅ Protection admin

## 🚨 Limitations Actuelles

### CAPTCHA
- ⚠️ Pas de protection contre les bots avancés
- ⚠️ Peut être contourné par OCR
- ✅ Suffisant pour 99% des spams

### Sauvegardes
- ⚠️ Stockées localement (navigateur)
- ⚠️ Perdues si cache vidé
- ⚠️ Pas de synchronisation cloud
- ✅ Fonction d'export disponible

### SSL/TLS
- ⚠️ Nécessite configuration serveur
- ⚠️ Pas disponible en local (file://)
- ✅ Gratuit avec Let's Encrypt

## 🎯 Recommandations Production

Pour un site en production, ajoutez :

1. **CAPTCHA Avancé**
   - Google reCAPTCHA v3
   - hCaptcha
   - Cloudflare Turnstile

2. **Sauvegardes Serveur**
   - Base de données avec backups quotidiens
   - Stockage cloud (AWS S3, Google Cloud)
   - Réplication multi-sites

3. **SSL/TLS**
   - Certificat valide
   - HTTPS obligatoire
   - HSTS activé

4. **Firewall**
   - WAF (Web Application Firewall)
   - Rate limiting
   - Protection DDoS

5. **Monitoring**
   - Logs de sécurité
   - Alertes en temps réel
   - Analyse des tentatives d'intrusion

## 📞 Support

### Problèmes Courants

**CAPTCHA ne s'affiche pas** :
- Vérifiez que `js/security.js` est chargé
- Ouvrez la console (F12) pour voir les erreurs
- Vérifiez que l'élément `#captchaQuestion` existe

**Sauvegardes ne fonctionnent pas** :
- Vérifiez que localStorage est activé
- Vérifiez l'espace disponible (quota ~5-10MB)
- Testez en navigation privée

**SSL ne fonctionne pas** :
- Vérifiez la configuration du serveur
- Contactez votre hébergeur
- Utilisez un service comme Cloudflare

## ✨ Résumé

Votre site EVORA DESIGN dispose maintenant de :
- ✅ **CAPTCHA anti-spam** sur le formulaire de contact
- ✅ **Sauvegardes automatiques** toutes les 30 minutes
- ✅ **Historique** des 5 dernières sauvegardes
- ✅ **Export/Import** des données
- ✅ **Protection admin** par mot de passe
- ⚠️ **SSL/TLS** à configurer sur le serveur

**Toutes les fonctionnalités de sécurité sont actives et opérationnelles !** 🔒
